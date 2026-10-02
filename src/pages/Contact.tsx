/**
 * @fileoverview Página de Contato e Localização integrada à configuração centralizada.
 * @module pages/Contact
 */

import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

export function Contact() {
  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com um consultor da Dental Santo Antônio sobre produtos e cotações.'
  )}`;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
            Canais de Atendimento
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1 mb-3">
            Fale com a {COMPANY_CONFIG.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Nossa equipe técnica e comercial está à disposição para esclarecer dúvidas sobre produtos,
            negociar prazos para clínicas ou auxiliar estudantes na montagem de listas.
          </p>
        </div>

        {/* Grade de Contatos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Card WhatsApp */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">WhatsApp Comercial</h2>
            <p className="text-xs text-gray-500 mb-4">
              Atendimento ágil para cotações, fotos de produtos e prazos de entrega.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <span>{COMPANY_CONFIG.whatsappFormatted}</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Card Telefone Central */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand-soft/60 text-brand-primary flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Telefone Fixo / Suporte</h2>
            <p className="text-xs text-gray-500 mb-4">
              Ligação direta para nosso departamento administrativo e financeiro.
            </p>
            <a
              href={`tel:${COMPANY_CONFIG.phoneFormatted.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary bg-brand-soft/40 px-4 py-2 rounded-xl hover:bg-brand-soft transition-colors"
            >
              <span>{COMPANY_CONFIG.phoneFormatted}</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Card E-mail */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">E-mail Comercial</h2>
            <p className="text-xs text-gray-500 mb-4">
              Envio de editais, orçamentos corporativos e pedidos formais de compra.
            </p>
            <a
              href={`mailto:${COMPANY_CONFIG.email}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors truncate max-w-full"
            >
              <span>{COMPANY_CONFIG.email}</span>
            </a>
          </div>

          {/* Card Endereço */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Centro de Distribuição</h2>
            <p className="text-xs text-gray-500 mb-4">
              {COMPANY_CONFIG.address.street}, {COMPANY_CONFIG.address.neighborhood}
            </p>
            <span className="text-xs font-semibold text-gray-700 block">
              {COMPANY_CONFIG.address.city} - {COMPANY_CONFIG.address.state} | CEP: {COMPANY_CONFIG.address.zipCode}
            </span>
          </div>
        </div>

        {/* Horários e Conformidade Sanitária */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-brand-soft/50 text-brand-secondary flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Horário de Atendimento e Expedição</h2>
              <p className="text-xs text-gray-500">Horário de Brasília</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50">
              <span className="text-gray-500 block mb-1">Segunda a Sexta-feira</span>
              <strong className="text-gray-900 text-sm">{COMPANY_CONFIG.businessHours.weekdays}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <span className="text-gray-500 block mb-1">Sábados</span>
              <strong className="text-gray-900 text-sm">{COMPANY_CONFIG.businessHours.saturday}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <span className="text-gray-500 block mb-1">Domingos e Feriados</span>
              <span className="text-gray-400 font-medium text-sm">Fechado</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-start gap-3 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
            <p>
              <strong>Aviso de Retirada e Vendas Controladas:</strong> A retirada física de produtos anestésicos ou controlados
              requer apresentação de documento original com foto e registro de classe competente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
