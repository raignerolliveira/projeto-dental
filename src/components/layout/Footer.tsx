/**
 * @fileoverview Rodapé institucional unificado com dados cadastrais e compliance Anvisa.
 * @module components/layout/Footer
 */

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ShieldCheck, Clock } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import logo from '@/assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-brand-primary text-white">
      {/* Faixa superior de compliance e confiança */}
      <div className="bg-brand-primary-hover border-b border-brand-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-soft">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{COMPANY_CONFIG.compliance.anvisaNotice}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>Seg a Sex: {COMPANY_CONFIG.businessHours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Sobre */}
          <div>
            <Link
              to="/"
              className="inline-block bg-white px-3 py-2 rounded-2xl mb-4 shadow-sm hover:scale-105 transition-transform"
              title="Dental Santo Antônio"
            >
              <img
                src={logo}
                alt="Dental Santo Antônio"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              Distribuição e fornecimento de suprimentos odontológicos de excelência para consultórios,
              clínicas, hospitais e acadêmicos de odontologia.
            </p>
            <p className="text-xs text-brand-soft/80 font-mono">
              CNPJ: {COMPANY_CONFIG.cnpj}
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-brand-accent transition-colors">
                  Catálogo de Produtos
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="hover:text-brand-accent transition-colors">
                  Solicitar Orçamento
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-brand-accent transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidade" className="hover:text-brand-accent transition-colors">
                  Política de Privacidade (LGPD)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Canais de Contato
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <a
                  href={`tel:${COMPANY_CONFIG.phoneFormatted.replace(/\D/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_CONFIG.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {COMPANY_CONFIG.whatsappFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a
                  href={`mailto:${COMPANY_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>
                  {COMPANY_CONFIG.address.street}, {COMPANY_CONFIG.address.neighborhood} -{' '}
                  {COMPANY_CONFIG.address.city}/{COMPANY_CONFIG.address.state}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Conecte-se Conosco
            </h4>
            <p className="text-xs text-gray-300 mb-4">
              Acompanhe lançamentos, novidades de produtos e campanhas promocionais.
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-secondary hover:bg-brand-accent flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Instagram da Dental Santo Antônio"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href={COMPANY_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-secondary hover:bg-brand-accent flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Facebook da Dental Santo Antônio"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href={COMPANY_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-secondary hover:bg-brand-accent flex items-center justify-center transition-transform hover:scale-105"
                aria-label="LinkedIn da Dental Santo Antônio"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé inferior com direitos autorais */}
        <div className="border-t border-brand-secondary/30 mt-10 pt-6 text-center text-xs text-gray-400">
          <p>
            &copy; {currentYear} {COMPANY_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
