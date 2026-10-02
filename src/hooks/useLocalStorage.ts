/**
 * @fileoverview Hook customizado para persistência segura e reativa em localStorage.
 * @module hooks/useLocalStorage
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar estado sincronizado com o localStorage com tratamento de exceções.
 *
 * @template T - Tipo do dado armazenado.
 * @param key - Chave utilizada no localStorage.
 * @param initialValue - Valor inicial caso a chave não exista no storage.
 * @returns Tupla contendo o valor atualizado e a função de atualização.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado local com inicializador seguro
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Erro ao recuperar chave "${key}":`, error);
      return initialValue;
    }
  });

  // Função para salvar no storage com suporte a função atualizadora
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((current) => {
          const valueToStore = value instanceof Function ? value(current) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.error(`[useLocalStorage] Erro ao persistir chave "${key}":`, error);
      }
    },
    [key]
  );

  // Sincroniza com alterações de outras abas através do evento 'storage'
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch (error) {
          console.warn(`[useLocalStorage] Erro ao sincronizar evento de storage para "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
