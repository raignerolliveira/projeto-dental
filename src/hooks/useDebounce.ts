/**
 * @fileoverview Hook customizado para postergar atualizações de valor (debounce).
 * @module hooks/useDebounce
 */

import { useState, useEffect } from 'react';

/**
 * Retorna o valor com debounce aplicado após o intervalo especificado.
 *
 * @template T - Tipo do valor a ser postergado.
 * @param value - Valor de entrada monitorado.
 * @param delayMs - Atraso em milissegundos (padrão: 300ms).
 * @returns O valor com debounce aplicado.
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
