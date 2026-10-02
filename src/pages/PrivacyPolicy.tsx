/**
 * @fileoverview Política de Privacidade e Proteção de Dados (LGPD) da Dental Santo Antônio.
 * @module pages/PrivacyPolicy
 */

import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

export function PrivacyPolicy() {
  const lastUpdate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-soft/60 text-brand-primary flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Política de Privacidade</h1>
          <p className="text-xs text-gray-500">Última revisão: {lastUpdate} • Em conformidade com a LGPD (Lei nº 13.709/2018)</p>
        </div>

        {/* Conteúdo Institucional */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section>
            <div className="flex items-center gap-2 text-brand-primary font-bold text-base mb-2">
              <Eye className="w-4 h-4 text-brand-secondary" />
              <h2>1. Informações que Coletamos</h2>
            </div>
            <p className="mb-2">
              A {COMPANY_CONFIG.name} coleta estritamente as informações necessárias para formalizar o orçamento
              de suprimentos odontológicos e cumprir determinações legais e regulatórias da Anvisa:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
              <li>Nome completo ou Razão Social do comprador</li>
              <li>Número de registro profissional (CRO e UF) ou CNPJ da clínica</li>
              <li>Comprovante de vínculo acadêmico para estudantes de odontologia</li>
              <li>Número de telefone celular / WhatsApp e e-mail de contato</li>
              <li>Cidade e estado para estimativa de logística e frete</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 text-brand-primary font-bold text-base mb-2">
              <FileText className="w-4 h-4 text-brand-secondary" />
              <h2>2. Finalidade do Tratamento de Dados</h2>
            </div>
            <p>
              Os dados coletados destinam-se exclusivamente a:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700 mt-2">
              <li>Elaborar propostas comerciais customizadas com prazos e condições de faturamento</li>
              <li>Validar a habilitação profissional para compra de anestésicos e itens controlados</li>
              <li>Emitir Nota Fiscal Eletrônica e documentação sanitária obrigatória</li>
              <li>Prestar atendimento de pós-venda e rastreio de entregas</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 text-brand-primary font-bold text-base mb-2">
              <Lock className="w-4 h-4 text-brand-secondary" />
              <h2>3. Segurança e Sigilo</h2>
            </div>
            <p>
              Empregamos rígidas diretrizes de segurança da informação. Não comercializamos, compartilhamos
              ou cedemos dados cadastrais a terceiros, exceto operadoras logísticas homologadas para transporte
              e órgãos governamentais quando formalmente requisitado por lei.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-brand-primary mb-2">4. Armazenamento Local no Navegador</h2>
            <p>
              Esta aplicação armazena a lista de itens do orçamento localmente no seu dispositivo através de{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">localStorage</code>.
              Isso garante que sua cotação não seja perdida caso você recarregue ou feche a página.
              Você pode esvaziar esses dados a qualquer momento clicando no botão &quot;Limpar Orçamento&quot;.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-brand-primary mb-2">5. Contato do Encarregado de Dados (DPO)</h2>
            <p>
              Para exercer seus direitos de confirmação, acesso ou exclusão de dados pessoais, entre em contato
              com nossa equipe de privacidade através do e-mail:{' '}
              <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-brand-secondary font-semibold hover:underline">
                {COMPANY_CONFIG.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
