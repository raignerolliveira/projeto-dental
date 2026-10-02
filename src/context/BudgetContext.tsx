/**
 * @fileoverview Provedor de contexto global para gerenciamento de itens de orçamento.
 * Implementa persistência resiliente em localStorage e feedback com toasts.
 * @module context/BudgetContext
 */

import { createContext, useContext, useMemo, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { BudgetItem, BudgetContextType } from '@/types/budget';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/** Chave de versionamento para o localStorage do carrinho de orçamento */
const BUDGET_STORAGE_KEY = 'dental_santo_antonio_budget_v1';

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

/**
 * Provedor do Contexto de Orçamento.
 * Envolve a aplicação para prover estado do orçamento com persistência e feedback reativo.
 */
export function BudgetProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<BudgetItem[]>(BUDGET_STORAGE_KEY, []);

  /**
   * Adiciona um produto ao orçamento ou incrementa sua quantidade.
   */
  const addItem = useCallback(
    (product: Product) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          toast.success(`Quantidade atualizada: ${product.name} (${existingItem.quantity + 1} un)`);
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }

        if (product.isRestricted) {
          toast.warning(`Item adicionado: ${product.name}`, {
            description: 'Atenção: Este produto controlado exige CRO, CNPJ ou comprovante de matrícula.',
          });
        } else {
          toast.success(`Adicionado ao orçamento: ${product.name}`);
        }

        return [...prevItems, { ...product, quantity: 1 }];
      });
    },
    [setItems]
  );

  /**
   * Remove completamente um item do orçamento.
   */
  const removeItem = useCallback(
    (productId: string) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.id === productId);
        if (itemToRemove) {
          toast.info(`Item removido: ${itemToRemove.name}`);
        }
        return prevItems.filter((item) => item.id !== productId);
      });
    },
    [setItems]
  );

  /**
   * Atualiza a quantidade de um produto específico.
   */
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
      );
    },
    [removeItem, setItems]
  );

  /**
   * Esvazia todo o orçamento.
   */
  const clearBudget = useCallback(() => {
    setItems([]);
    toast.info('Orçamento esvaziado com sucesso.');
  }, [setItems]);

  /**
   * Calcula o valor financeiro total acumulado.
   */
  const getTotalValue = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  /**
   * Retorna o total de unidades de itens somados.
   */
  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  /**
   * Verifica se há ao menos um produto regulamentado/controlado no carrinho.
   */
  const hasRestrictedItems = useMemo(() => {
    return items.some((item) => item.isRestricted);
  }, [items]);

  const contextValue = useMemo<BudgetContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      getTotalValue,
      getTotalItems,
      clearBudget,
      hasRestrictedItems,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      getTotalValue,
      getTotalItems,
      clearBudget,
      hasRestrictedItems,
    ]
  );

  return <BudgetContext.Provider value={contextValue}>{children}</BudgetContext.Provider>;
}

/**
 * Hook de acesso ao contexto do orçamento.
 * Dispara erro caso invocado fora de um BudgetProvider.
 */
export function useBudget(): BudgetContextType {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget deve ser utilizado dentro de um BudgetProvider');
  }
  return context;
}
