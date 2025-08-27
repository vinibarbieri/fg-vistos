// src/components/InfinitePayDebug.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, TestTube, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { infinitePayService } from '@/services/infinitePay';
import { INFINITEPAY_CONFIG, validateInfinitePayConfig } from '@/services/infinitePay_config';

export const InfinitePayDebug = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const config = infinitePayService.getConfig();

  const runTest = async () => {
    setIsTesting(true);
    setTestResults(null);

    try {
      // Teste básico de configuração
      const configValid = validateInfinitePayConfig();
      
      // Teste de conectividade com a API
      let apiTest = null;
      try {
        const response = await fetch(`${INFINITEPAY_CONFIG.API_BASE_URL}/health`, {
          method: 'GET',
        });
        apiTest = {
          success: response.ok,
          status: response.status,
          statusText: response.statusText,
        };
      } catch (error) {
        apiTest = {
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        };
      }

      setTestResults({
        timestamp: new Date().toISOString(),
        config: {
          valid: configValid,
          handle: config.handle,
          baseUrl: config.baseUrl,
        },
        api: apiTest,
        environment: {
          nodeEnv: import.meta.env.MODE,
          isDev: import.meta.env.DEV,
          isProd: import.meta.env.PROD,
        },
      });
    } catch (error) {
      setTestResults({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuração do InfinitePay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status da Configuração */}
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(config.isConfigured)}>
              {getStatusIcon(config.isConfigured)}
              {config.isConfigured ? 'Configurado' : 'Não Configurado'}
            </Badge>
          </div>

          {/* Detalhes da Configuração */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Handle:</span>
              <span className="ml-2 font-mono">{config.handle}</span>
            </div>
            <div>
              <span className="font-medium">Base URL:</span>
              <span className="ml-2 font-mono">{config.baseUrl}</span>
            </div>
          </div>

          {/* Variáveis de Ambiente */}
          <div>
            <h4 className="font-medium mb-2">Variáveis de Ambiente:</h4>
            <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
              VITE_INFINITEPAY_HANDLE={config.handle}
            </div>
          </div>

          {/* Botão de Teste */}
          <Button 
            onClick={runTest} 
            disabled={isTesting}
            className="w-full"
          >
            <TestTube className="mr-2 h-4 w-4" />
            {isTesting ? 'Testando...' : 'Executar Testes'}
          </Button>
        </CardContent>
      </Card>

      {/* Resultados dos Testes */}
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Resultados dos Testes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Timestamp */}
              <div className="text-sm text-gray-500">
                Executado em: {new Date(testResults.timestamp).toLocaleString('pt-BR')}
              </div>

              {/* Configuração */}
              {testResults.config && (
                <div>
                  <h4 className="font-medium mb-2">Configuração:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(testResults.config.valid)}
                      <span>Configuração válida: {testResults.config.valid ? 'Sim' : 'Não'}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Handle: {testResults.config.handle}
                    </div>
                  </div>
                </div>
              )}

              {/* Teste da API */}
              {testResults.api && (
                <div>
                  <h4 className="font-medium mb-2">Teste da API:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(testResults.api.success)}
                      <span>Conectividade: {testResults.api.success ? 'OK' : 'Falhou'}</span>
                    </div>
                    {testResults.api.status && (
                      <div className="text-sm text-gray-600">
                        Status: {testResults.api.status} {testResults.api.statusText}
                      </div>
                    )}
                    {testResults.api.error && (
                      <div className="text-sm text-red-600">
                        Erro: {testResults.api.error}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ambiente */}
              {testResults.environment && (
                <div>
                  <h4 className="font-medium mb-2">Ambiente:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Modo: {testResults.environment.nodeEnv}</div>
                    <div>Desenvolvimento: {testResults.environment.isDev ? 'Sim' : 'Não'}</div>
                    <div>Produção: {testResults.environment.isProd ? 'Sim' : 'Não'}</div>
                  </div>
                </div>
              )}

              {/* Erro */}
              {testResults.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{testResults.error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Informações da Integração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Endpoints:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Criar Checkout:</span>
                  <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.ENDPOINTS.CREATE_CHECKOUT}</span>
                </div>
                <div>
                  <span className="font-medium">Verificar Pagamento:</span>
                  <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.ENDPOINTS.CHECK_PAYMENT}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">URLs de Redirecionamento:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Sucesso:</span>
                  <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.REDIRECT_URLS.SUCCESS}</span>
                </div>
                <div>
                  <span className="font-medium">Falha:</span>
                  <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.REDIRECT_URLS.FAILED}</span>
                </div>
                <div>
                  <span className="font-medium">Erro:</span>
                  <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.REDIRECT_URLS.ERROR}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Webhook:</h4>
              <div className="text-sm">
                <span className="font-medium">URL:</span>
                <span className="ml-2 font-mono">{INFINITEPAY_CONFIG.WEBHOOK.URL}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Timeout: {INFINITEPAY_CONFIG.WEBHOOK.TIMEOUT}ms
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
