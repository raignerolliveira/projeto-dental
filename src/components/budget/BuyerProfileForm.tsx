/**
 * @fileoverview Formulário de identificação inclusivo com validação dinâmica por perfil.
 * Suporta Cirurgião-Dentista, Clínica PJ, Estudante de Odontologia e Pessoa Física.
 * @module components/budget/BuyerProfileForm
 */

import { useState, useRef, useEffect } from 'react';
import { User, Building2, GraduationCap, UserCheck, AlertCircle, X, ChevronDown, Check } from 'lucide-react';
import { BuyerProfile, BuyerProfileType } from '@/types/budget';

interface BuyerProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: BuyerProfile) => void;
  hasRestrictedItems: boolean;
}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

interface ProfileOption {
  type: BuyerProfileType;
  title: string;
  subtitle: string;
  icon: typeof UserCheck;
  badge: string;
}

const PROFILE_OPTIONS: ProfileOption[] = [
  {
    type: 'dentist',
    title: 'Cirurgião-Dentista',
    subtitle: 'Requer registro de CRO e UF de inscrição profissional',
    icon: UserCheck,
    badge: 'CRO',
  },
  {
    type: 'clinic',
    title: 'Clínica Odontológica / PJ',
    subtitle: 'Faturamento corporativo com Razão Social e CNPJ',
    icon: Building2,
    badge: 'CNPJ',
  },
  {
    type: 'student',
    title: 'Estudante de Odontologia',
    subtitle: 'Cotação de lista acadêmica via Faculdade e Matrícula',
    icon: GraduationCap,
    badge: 'Acadêmico',
  },
  {
    type: 'individual',
    title: 'Pessoa Física / Outro',
    subtitle: 'Atendimento direto ao consumidor via CPF',
    icon: User,
    badge: 'CPF',
  },
];

export function BuyerProfileForm({
  isOpen,
  onClose,
  onSubmit,
  hasRestrictedItems,
}: BuyerProfileFormProps) {
  const [profileType, setProfileType] = useState<BuyerProfileType>('dentist');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Feira de Santana');
  const [state, setState] = useState('BA');

  // Campos específicos
  const [cro, setCro] = useState('');
  const [croUf, setCroUf] = useState('BA');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [institution, setInstitution] = useState('');
  const [academicId, setAcademicId] = useState('');
  const [cpf, setCpf] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome ou Responsável é obrigatório';
    if (!phone.trim()) newErrors.phone = 'Telefone/WhatsApp é obrigatório';
    if (!city.trim()) newErrors.city = 'Cidade é obrigatória';

    if (profileType === 'dentist') {
      if (!cro.trim()) newErrors.cro = 'Número do CRO é obrigatório para Cirurgião-Dentista';
    } else if (profileType === 'clinic') {
      if (!companyName.trim()) newErrors.companyName = 'Razão Social ou Nome Fantasia é obrigatório';
      if (!cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório para Pessoa Jurídica';
    } else if (profileType === 'student') {
      if (!institution.trim()) newErrors.institution = 'Faculdade ou Universidade é obrigatória';
      if (!academicId.trim()) newErrors.academicId = 'Matrícula ou Semestre é obrigatório para estudantes';
    } else if (profileType === 'individual') {
      if (!cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const profileData: BuyerProfile = {
      profileType,
      name,
      phone,
      email: email || undefined,
      city,
      state,
      cro: profileType === 'dentist' ? cro : undefined,
      croUf: profileType === 'dentist' ? croUf : undefined,
      companyName: profileType === 'clinic' ? companyName : undefined,
      cnpj: profileType === 'clinic' ? cnpj : undefined,
      institution: profileType === 'student' ? institution : undefined,
      academicId: profileType === 'student' ? academicId : undefined,
      cpf: profileType === 'individual' ? cpf : undefined,
      notes: notes || undefined,
    };

    onSubmit(profileData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] sm:max-h-[90vh] flex flex-col animate-fadeIn">
        {/* Cabeçalho do Modal (Fixo no topo) */}
        <div className="shrink-0 bg-brand-primary p-4 sm:p-6 text-white flex items-center justify-between shadow-xs">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Identificação para Orçamento</h2>
            <p className="text-xs text-brand-soft mt-0.5">
              Personalize a cotação com dados profissionais ou lista acadêmica
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors shrink-0"
            aria-label="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerta de Anvisa dentro do Modal se houver itens restritos (Fixo abaixo do cabeçalho) */}
        {hasRestrictedItems && (
          <div className="shrink-0 bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Itens Controlados no Orçamento:</strong> Para faturamento de anestésicos e materiais restritos,
              é necessária a comprovação do registro (CRO, CNPJ ou declaração da faculdade).
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain flex flex-col">
          <div className="p-4 sm:p-6 space-y-5 flex-1">
            {/* Seletor de Perfil do Comprador em Campo Unificado */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              1. Tipo de Comprador / Perfil *
            </label>

            {/* Campo Selecionador Estilizado */}
            {(() => {
              const selectedOption = PROFILE_OPTIONS.find((opt) => opt.type === profileType) || PROFILE_OPTIONS[0];
              const SelectedIcon = selectedOption.icon;
              return (
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`w-full p-3.5 bg-gray-50 hover:bg-gray-100/80 border rounded-2xl flex items-center justify-between transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 text-left shadow-2xs cursor-pointer ${
                    isDropdownOpen ? 'border-brand-secondary bg-white ring-2 ring-brand-secondary/20' : 'border-gray-200'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 shadow-2xs">
                      <SelectedIcon className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {selectedOption.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-soft text-brand-primary shrink-0">
                          {selectedOption.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {selectedOption.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3 text-gray-400 shrink-0">
                    <span className="text-xs font-semibold text-brand-secondary hidden sm:inline">
                      Trocar
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-brand-secondary' : 'text-gray-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })()}

            {/* Menu Popover com as 4 opções */}
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 p-2 space-y-1.5 animate-fadeIn"
                role="listbox"
              >
                {PROFILE_OPTIONS.map((opt) => {
                  const isSelected = opt.type === profileType;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => {
                        setProfileType(opt.type);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-soft/60 text-brand-primary font-bold border border-brand-accent/30'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-brand-secondary text-white shadow-xs'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-900 truncate">
                              {opt.title}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-gray-100 text-gray-600">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">
                            {opt.subtitle}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-secondary flex items-center justify-center shrink-0 ml-2 shadow-2xs">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dados Pessoais / Básicos */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              2. Dados do Comprador & Contato
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nome Completo / Responsável *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Dra. Mariana Albuquerque"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                    errors.name ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (75) 99888-7766"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                    errors.phone ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  E-mail Comercial (Opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: consultorio@exemplo.com.br"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Feira de Santana"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                    errors.city ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Estado (UF) *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 cursor-pointer"
                >
                  {BRAZILIAN_STATES.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Campos Dinâmicos por Perfil */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3">
              3. Dados Específicos: {profileType === 'dentist' && 'Registro Profissional (CRO)'}
              {profileType === 'clinic' && 'Dados da Pessoa Jurídica'}
              {profileType === 'student' && 'Comprovação Acadêmica (Matrícula/Faculdade)'}
              {profileType === 'individual' && 'Documentação Pessoal'}
            </h3>

            {/* Cirurgião-Dentista */}
            {profileType === 'dentist' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Número do CRO *
                  </label>
                  <input
                    type="text"
                    value={cro}
                    onChange={(e) => setCro(e.target.value)}
                    placeholder="Ex: 12345"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                      errors.cro ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                  />
                  {errors.cro && <p className="text-[11px] text-red-500 mt-1">{errors.cro}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    UF do CRO *
                  </label>
                  <select
                    value={croUf}
                    onChange={(e) => setCroUf(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40"
                  >
                    {BRAZILIAN_STATES.map((uf) => (
                      <option key={uf} value={uf}>
                        CRO-{uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Clínica Odontológica / PJ */}
            {profileType === 'clinic' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Razão Social / Nome Fantasia *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: OdontoClínica Santana Ltda."
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                      errors.companyName ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    CNPJ *
                  </label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                      errors.cnpj ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                  />
                  {errors.cnpj && <p className="text-[11px] text-red-500 mt-1">{errors.cnpj}</p>}
                </div>
              </div>
            )}

            {/* Estudante de Odontologia */}
            {profileType === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Faculdade / Universidade *
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ex: UEFS, Unifacs, FTC, etc."
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                      errors.institution ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                  />
                  {errors.institution && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.institution}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Matrícula ou Semestre *
                  </label>
                  <input
                    type="text"
                    value={academicId}
                    onChange={(e) => setAcademicId(e.target.value)}
                    placeholder="Ex: Matrícula 20241029 ou 6º Semestre"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                      errors.academicId ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                  />
                  {errors.academicId && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.academicId}</p>
                  )}
                </div>
              </div>
            )}

            {/* Pessoa Física / Outro */}
            {profileType === 'individual' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  CPF *
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 ${
                    errors.cpf ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                  }`}
                />
                {errors.cpf && <p className="text-[11px] text-red-500 mt-1">{errors.cpf}</p>}
              </div>
            )}

            {/* Observações adicionais */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Observações, Condição de Pagamento ou Prazo Desejado (Opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ex: Gostaria de cotar frete para consultório e parcelamento em 3x no boleto."
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40"
              />
            </div>
            </div>
          </div>

          {/* Botões de Ação Fixados no Rodapé do Modal */}
          <div className="shrink-0 p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-end gap-3 shadow-2xs">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Avançar para Envio no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
