import { useState, useEffect } from 'react';

/**
 * Custom hook to detect when navbar should be visible
 * @returns 'visible' when navbar should be shown, 'hidden' when it should be hidden
 */
const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMouseAtTop, setIsMouseAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Se estiver scrollando para baixo e passou de 100px, esconde o navbar
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        // Se estiver scrollando para cima OU o mouse estiver no topo, mostra o navbar
        setIsVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Detecta se o mouse está na parte superior da tela (primeiros 100px)
      const isAtTop = e.clientY <= 100;
      setIsMouseAtTop(isAtTop);
      
      // Se o mouse estiver no topo, força a visibilidade do navbar
      if (isAtTop) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      // Quando o mouse sai da janela, remove o estado de "mouse no topo"
      setIsMouseAtTop(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prevScrollY]);

  return isVisible ? 'visible' : 'hidden';
};

export default useNavbarVisibility;
