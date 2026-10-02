/**
 * @fileoverview Tipos e definições de informações institucionais da empresa.
 * @module types/company
 */

export interface CompanyConfig {
  /** Nome fantasia da dental */
  name: string;
  /** Razão social completa */
  legalName: string;
  /** CNPJ institucional */
  cnpj: string;
  /** Número oficial de atendimento WhatsApp (apenas dígitos, ex: 5575991156648) */
  whatsappNumber: string;
  /** Número de WhatsApp formatado para exibição ao usuário */
  whatsappFormatted: string;
  /** Telefone fixo ou de suporte */
  phoneFormatted: string;
  /** E-mail oficial de contato comercial */
  email: string;
  /** Endereço físico completo */
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  /** Horários de atendimento */
  businessHours: {
    weekdays: string;
    saturday: string;
    sundayAndHolidays: string;
  };
  /** Links oficiais das redes sociais */
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  /** Textos institucionais e de compliance regulatória Anvisa */
  compliance: {
    anvisaNotice: string;
    anvisaWarningQuote: string;
  };
}
