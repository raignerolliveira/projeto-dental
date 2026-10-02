/**
 * @fileoverview Tipos e interfaces de domínio para Produtos e Categorias.
 * @module types/product
 */

/**
 * Representa uma categoria de produtos odontológicos.
 */
export interface Category {
  /** Identificador único da categoria em formato slug (ex: 'instrumentos') */
  id: string;
  /** Nome amigável de exibição da categoria */
  name: string;
  /** Descrição detalhada do escopo da categoria */
  description: string;
  /** URL da imagem representativa da categoria */
  image: string;
}

/**
 * Representa um produto do catálogo de suprimentos odontológicos.
 */
export interface Product {
  /** Identificador único do produto (ex: 'anest-001') */
  id: string;
  /** Nome comercial do produto */
  name: string;
  /** Preço sugerido unitário em Reais (BRL) */
  price: number;
  /** Descrição técnica ou características principais */
  description: string;
  /** ID da categoria a qual o produto pertence */
  category: string;
  /** URL da imagem do produto */
  image: string;
  /**
   * Flag de conformidade regulatória (Anvisa).
   * Indica se a comercialização exige registro profissional (CRO/CNPJ) ou receita.
   */
  isRestricted?: boolean;
  /**
   * Mensagem descritiva da restrição regulatória para exibição ao usuário.
   */
  restrictionNotice?: string;
}
