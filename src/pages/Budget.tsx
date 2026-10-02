/**
 * @fileoverview Tela de fechamento de orçamento, gestão de itens e checkout para WhatsApp.
 * Integra identificação inclusiva e compliance regulatória Anvisa.
 * @module pages/Budget
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Send,
  Package,
  AlertTriangle,
  Copy,
  CheckCheck,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { useBudget } from '@/context/BudgetContext';
import { BuyerProfile } from '@/types/budget';
import { COMPANY_CONFIG } from '@/config/company';
import { BuyerProfileForm } from '@/components/budget/BuyerProfileForm';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

/**
 * Gera um protocolo de cotação temporal único (ex: COT-20261001-4A8F).
 */
function generateQuoteProtocol(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0');
  return `COT-${dateStr}-${randomHex}`;
}

export function Budget() {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalValue,
    getTotalItems,
    clearBudget,
    hasRestrictedItems,
  } = useBudget();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const totalValue = getTotalValue();
  const totalItems = getTotalItems();

  /**
   * Constrói a mensagem formatada para envio comercial.
   */
  const buildQuoteMessage = (profile: BuyerProfile): string => {
    const protocol = generateQuoteProtocol();
    const currentDate = new Date().toLocaleString('pt-BR');

    let profileDetails = '';
    if (profile.profileType === 'dentist') {
      profileDetails = `• Perfil: Cirurgião-Dentista\n• CRO: ${profile.cro} (${profile.croUf})`;
    } else if (profile.profileType === 'clinic') {
      profileDetails = `• Perfil: Clínica / PJ\n• Razão Social: ${profile.companyName}\n• CNPJ: ${profile.cnpj}`;
    } else if (profile.profileType === 'student') {
      profileDetails = `• Perfil: Estudante de Odontologia\n• Instituição: ${profile.institution}\n• Matrícula/Semestre: ${profile.academicId}`;
    } else {
      profileDetails = `• Perfil: Pessoa Física\n• CPF: ${profile.cpf}`;
    }

    const itemsText = items
      .map((item, index) => {
        const itemSubtotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
        const unitPrice = item.price.toFixed(2).replace('.', ',');
        const restrictedNotice = item.isRestricted ? ' [Item Controlado Anvisa]' : '';
        return (
          `${index + 1}. *${item.name}*${restrictedNotice}\n` +
          `   Qtd: ${item.quantity} un | Unit: R$ ${unitPrice} | Subtotal: R$ ${itemSubtotal}`
        );
      })
      .join('\n\n');

    let complianceClause = '';
    if (hasRestrictedItems) {
      complianceClause =
        `\n\n*⚠️ TERMO DE REGULARIDADE SANITÁRIA (ANVISA):*\n` +
        `Este pedido contém itens de venda controlada (anestésicos/injetáveis). ` +
        `Estou ciente da obrigatoriedade de apresentação do registro profissional ou comprovação acadêmica para faturamento.`;
    }

    let notesText = '';
    if (profile.notes?.trim()) {
      notesText = `\n\n*OBSERVAÇÕES / FORMA DE PAGAMENTO:* \n${profile.notes}`;
    }

    return (
      `*SOLICITAÇÃO DE ORÇAMENTO - DENTAL SANTO ANTÔNIO*\n` +
      `*Protocolo:* #${protocol}\n` +
      `*Data de Emissão:* ${currentDate}\n\n` +
      `*DADOS DO SOLICITANTE:*\n` +
      `• Nome: ${profile.name}\n` +
      `${profileDetails}\n` +
      `• WhatsApp: ${profile.phone}\n` +
      `• Localidade: ${profile.city}/${profile.state}\n\n` +
      `*ITENS SELECIONADOS:*\n` +
      `${itemsText}\n\n` +
      `*RESUMO FINANCEIRO:*\n` +
      `• Total de Itens: ${totalItems} unidade(s)\n` +
      `• *Valor Total Previsto: R$ ${totalValue.toFixed(2).replace('.', ',')}*` +
      `${complianceClause}` +
      `${notesText}\n\n` +
      `Aguardo confirmação de disponibilidade em estoque e opções de frete para meu endereço.`
    );
  };

  /**
   * Finaliza o perfil e direciona para o WhatsApp.
   */
  const handleProfileSubmit = (profile: BuyerProfile) => {
    setIsProfileModalOpen(false);
    const message = buildQuoteMessage(profile);
    setPreparedMessage(message);

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`;

    // Dispara a abertura
    window.open(whatsappUrl, '_blank');
    toast.success('Redirecionando para o WhatsApp da Dental Santo Antônio...');
  };

  /**
   * Copia o texto para a área de transferência caso haja bloqueio de pop-up.
   */
  const handleCopyMessage = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      toast.success('Texto do orçamento copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Não foi possível copiar automaticamente.');
    }
  };

  // Estado Vazio
  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-brand-soft/70 flex items-center justify-center text-brand-secondary mx-auto mb-6">
              <Package className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Seu orçamento está vazio</h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
              Você ainda não incluiu nenhum material odontológico na lista. Navegue em nosso catálogo e adicione os itens desejados.
            </p>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary text-white font-bold text-xs shadow-md hover:bg-brand-primary-hover hover:scale-105 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Explorar Produtos</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                Revisão de Materiais
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
                Seu Orçamento ({totalItems} un)
              </h1>
            </div>

            <button
              onClick={clearBudget}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpar todos os itens</span>
            </button>
          </div>

          {/* Alerta de Anvisa se houver itens controlados */}
          {hasRestrictedItems && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-0.5">Itens com Controle Sanitário Identificados</p>
                <p>
                  {COMPANY_CONFIG.compliance.anvisaWarningQuote}
                </p>
              </div>
            </div>
          )}

          {/* Lista de Itens do Orçamento */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-8">
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const subtotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Imagem */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Dados do Produto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        {item.isRestricted && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                            <ShieldCheck className="w-3 h-3 text-amber-700" />
                            Controlado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                        {item.description}
                      </p>
                      <span className="text-xs font-semibold text-brand-secondary">
                        R$ {item.price.toFixed(2).replace('.', ',')} / un
                      </span>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-brand-primary shadow-xs transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-brand-primary shadow-xs transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-[10px] text-gray-400 block">Subtotal</span>
                        <span className="text-sm font-extrabold text-gray-900">
                          R$ {subtotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Botão Remover */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        aria-label={`Remover ${item.name} do orçamento`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Painel de Fechamento / Resumo */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Resumo da Cotação
            </h2>

            <div className="space-y-3 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total de itens selecionados:</span>
                <span className="font-semibold text-gray-900">{totalItems} unidade(s)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Cálculo de frete e prazo:</span>
                <span className="text-brand-secondary font-medium">Informado via WhatsApp</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">Valor Total Estimado:</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-secondary">
                  R$ {totalValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Ação Primária: Iniciar Identificação */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5 text-brand-soft" />
              <span>Concluir e Enviar Cotação pelo WhatsApp</span>
            </button>

            {/* Informações Auxiliares */}
            <p className="text-[11px] text-center text-gray-400 mt-4 leading-relaxed">
              Ao clicar, você informará seus dados de comprador (Dentista, Clínica ou Estudante)
              e uma mensagem completa com protocolo será gerada para nossa equipe de atendimento.
            </p>

            {/* Se já gerou mensagem anterior, exibe botão de cópia de contingência */}
            {preparedMessage && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-brand-soft/30 border border-brand-accent/20">
                  <div className="text-xs text-brand-primary text-center sm:text-left">
                    <p className="font-bold">O WhatsApp não abriu automaticamente?</p>
                    <p className="text-gray-600">Copie o texto gerado e cole manualmente na conversa.</p>
                  </div>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-brand-secondary/30 text-brand-primary text-xs font-bold hover:bg-brand-soft/40 transition-colors shadow-xs"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-brand-secondary" />
                        <span>Copiar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Identificação do Comprador */}
      <BuyerProfileForm
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileSubmit}
        hasRestrictedItems={hasRestrictedItems}
      />
    </div>
  );
}
