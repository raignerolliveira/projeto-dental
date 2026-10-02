/**
 * @fileoverview Tipos e interfaces relacionados ao Orçamento e Identificação do Comprador.
 * @module types/budget
 */

import { Product } from './product';

/**
 * Item individual pertencente a um orçamento, estendendo o produto com sua quantidade solicitada.
 */
export interface BudgetItem extends Product {
  /** Quantidade solicitada do produto (deve ser >= 1) */
  quantity: number;
}

/**
 * Perfis de comprador suportados no checkout inclusivo.
 */
export type BuyerProfileType = 'dentist' | 'clinic' | 'student' | 'individual';

/**
 * Modelo de dados de identificação do comprador para formalização do orçamento.
 */
export interface BuyerProfile {
  /** Tipo de perfil selecionado */
  profileType: BuyerProfileType;
  /** Nome completo do comprador ou responsável */
  name: string;
  /** Telefone com DDD para contato via WhatsApp */
  phone: string;
  /** E-mail opcional para envio formal da proposta */
  email?: string;
  /** Cidade do consultório, clínica ou residência */
  city: string;
  /** Estado (UF) */
  state: string;

  // Campos específicos para Cirurgião-Dentista
  /** Número de inscrição no Conselho Regional de Odontologia */
  cro?: string;
  /** Unidade Federativa emissora do CRO */
  croUf?: string;

  // Campos específicos para Clínica Odontológica / PJ
  /** Razão Social ou Nome Fantasia da Clínica */
  companyName?: string;
  /** Cadastro Nacional da Pessoa Jurídica (CNPJ) */
  cnpj?: string;

  // Campos específicos para Estudante de Odontologia
  /** Nome da Faculdade, Centro Universitário ou Universidade */
  institution?: string;
  /** Número de Matrícula Acadêmica ou Semestre em curso */
  academicId?: string;

  // Campos específicos para Pessoa Física / Outro
  /** Cadastro de Pessoa Física (CPF) */
  cpf?: string;

  // Observações gerais ou solicitações de condições de pagamento
  /** Observações adicionais, prazo desejado ou forma de pagamento */
  notes?: string;
}

/**
 * Interface do contexto global de orçamento.
 */
export interface BudgetContextType {
  /** Lista de itens atualmente presentes no orçamento */
  items: BudgetItem[];
  /** Adiciona um produto ao orçamento ou incrementa sua quantidade */
  addItem: (product: Product) => void;
  /** Remove completamente um item do orçamento pelo ID */
  removeItem: (productId: string) => void;
  /** Atualiza a quantidade de um item específico */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Calcula o valor financeiro total somando todos os itens */
  getTotalValue: () => number;
  /** Retorna a contagem total de unidades de produtos */
  getTotalItems: () => number;
  /** Remove todos os itens do orçamento */
  clearBudget: () => void;
  /** Indica se há pelo menos um item regulamentado/controlado pela Anvisa no carrinho */
  hasRestrictedItems: boolean;
}
