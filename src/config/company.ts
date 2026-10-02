/**
 * @fileoverview Configuração centralizada dos dados institucionais e regulatórios da Dental Santo Antônio.
 * @module config/company
 */

import { CompanyConfig } from '@/types/company';

/**
 * Constantes globais da Dental Santo Antônio.
 * Centraliza canais de contato, horários de funcionamento e avisos legais.
 */
export const COMPANY_CONFIG: CompanyConfig = {
  name: 'Dental Santo Antônio',
  legalName: 'Dental Santo Antônio Suprimentos Odontológicos Ltda.',
  cnpj: '12.345.678/0001-90',
  whatsappNumber: '5575991156648',
  whatsappFormatted: '(75) 99115-6648',
  phoneFormatted: '(75) 3221-4500',
  email: 'contato@dentalsantoantonio.com.br',
  address: {
    street: 'Av. Getúlio Vargas, 1420',
    neighborhood: 'Centro',
    city: 'Feira de Santana',
    state: 'BA',
    zipCode: '44001-525',
  },
  businessHours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:00 às 12:00',
    sundayAndHolidays: 'Fechado',
  },
  social: {
    instagram: 'https://instagram.com/dentalsantoantonio',
    facebook: 'https://facebook.com/dentalsantoantonio',
    linkedin: 'https://linkedin.com/company/dentalsantoantonio',
  },
  compliance: {
    anvisaNotice:
      'A venda de medicamentos, anestésicos e determinados materiais odontológicos é restrita a profissionais habilitados com inscrição ativa no CRO, clínicas com CNPJ cadastrado ou estudantes com comprovante de matrícula ativo.',
    anvisaWarningQuote:
      '⚠️ ATENÇÃO REGULATÓRIA (ANVISA): Este orçamento inclui itens controlados ou anestésicos. O faturamento e entrega estão condicionados à apresentação de registro profissional válido (CRO), CNPJ da clínica ou comprovante de matrícula acadêmica.',
  },
};
