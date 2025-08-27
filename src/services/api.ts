// Configuração da API
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Classe para gerenciar requisições HTTP
class ApiService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  // Atualizar token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Remover token
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Headers padrão
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Se não for resposta de sucesso
      if (!response.ok) {
        // Se for erro de autenticação, limpar token
        if (response.status === 401) {
          this.clearToken();
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
      }

      // Se a resposta for vazia, retornar null
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro de conexão com o servidor');
    }
  }

  // GET
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get<{ status: string; timestamp: string }>('/health');
  }
}

// Instância única do serviço
export const apiService = new ApiService();

// Funções específicas para cada domínio
export const vistosApi = {
  // Listar vistos com paginação
  list: (page = 1, limit = 10) => 
    apiService.get<any>(`/api/vistos?page=${page}&limit=${limit}`),
  
  // Buscar visto por ID
  getById: (id: string) => 
    apiService.get<any>(`/api/vistos/${id}`),
  
  // Criar novo visto
  create: (data: any) => 
    apiService.post<any>('/api/vistos', data),
  
  // Atualizar visto
  update: (id: string, data: any) => 
    apiService.put<any>(`/api/vistos/${id}`, data),
  
  // Deletar visto
  delete: (id: string) => 
    apiService.delete<any>(`/api/vistos/${id}`),
};

export const paymentsApi = {
  // Criar checkout
  createCheckout: (data: any) => 
    apiService.post<any>('/api/payments/create-checkout', data),
  
  // Verificar status do pagamento
  checkStatus: (data: any) => 
    apiService.post<any>('/api/payments/check-status', data),
};

export const authApi = {
  // Registrar novo usuário
  register: (data: any) => 
    apiService.post<any>('/api/auth/register', data),
  
  // Verificar se email já existe
  checkEmail: (data: any) => 
    apiService.post<any>('/api/auth/check-email', data),
};

export default apiService;
