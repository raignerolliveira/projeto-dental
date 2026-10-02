/**
 * @fileoverview Componente de imagem com tratamento automático de falha de carregamento.
 * @module components/ui/ImageWithFallback
 */

import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

/**
 * Renderiza uma imagem HTML que, ao falhar (erro 404, rede indisponível),
 * exibe um placeholder elegante da Dental Santo Antônio com ícone e texto.
 */
export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackText,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-4 select-none ${className}`}
        role="img"
        aria-label={alt || 'Imagem indisponível'}
      >
        <Package className="w-8 h-8 text-brand-secondary/40 mb-1" />
        <span className="text-xs text-center text-gray-500 font-medium">
          {fallbackText || alt || 'Dental Santo Antônio'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
