import Link from 'next/link'
import type { Metadata } from 'next'
import { AtSign, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { FormularioContato } from '@/components/formulario-contato'
import { linkWhatsApp, site } from '@/lib/site'
import { BotaoVoltar } from '@/components/botao-voltar'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a nossa equipe por WhatsApp, e-mail ou formulário.',
}

export default function ContatoPage() {
  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas"><Link href="/">Início</Link> <span>/</span> <span>Contato</span></nav>
        <h1>Fale conosco</h1>
        <p>Conte o que você procura e retornamos em horário comercial.</p>
      </div>
    </section>

    <section className="secao">
      <div className="container colunas-contato">
        <div>
          <div className="secao-titulo">
            <h2>Canais de atendimento</h2>
            <span className="linha" />
          </div>
          <div className="lista-contato">
            <div>
              <MessageCircle size={19} />
              <span>
                <strong>WhatsApp Vendas</strong>
                <a href={linkWhatsApp('Olá, vim pelo site e gostaria de atendimento.')} target="_blank" rel="noreferrer">{site.whatsappVendas.exibicao}</a>
              </span>
            </div>
            {site.whatsappLocacao.numero && (
              <div>
                <MessageCircle size={19} />
                <span>
                  <strong>WhatsApp Locação</strong>
                  <a href={linkWhatsApp('Olá, gostaria de falar sobre locação.', 'locacao')} target="_blank" rel="noreferrer">{site.whatsappLocacao.exibicao}</a>
                </span>
              </div>
            )}
            {site.telefone && (
              <div><Phone size={19} /><span><strong>Telefone</strong><a href={`tel:${site.telefone.replace(/\D/g, '')}`}>{site.telefone}</a></span></div>
            )}
            <div><Mail size={19} /><span><strong>E-mail</strong><a href={`mailto:${site.email}`}>{site.email}</a></span></div>
            {site.endereco && <div><MapPin size={19} /><span><strong>Endereço</strong>{site.endereco}</span></div>}
            {site.instagram && (
              <div><AtSign size={19} /><span><strong>Instagram</strong><a href={site.instagram} target="_blank" rel="noreferrer">{site.instagramHandle}</a></span></div>
            )}
            <div><Clock size={19} /><span><strong>Atendimento</strong>Segunda a sexta, em horário comercial</span></div>
          </div>
        </div>

        <div className="bloco-branco">
          <div className="secao-titulo">
            <h2>Envie uma mensagem</h2>
            <span className="linha" />
          </div>
          <FormularioContato origem="site · página de contato" />
        </div>
      </div>
    </section>
  </>
}
