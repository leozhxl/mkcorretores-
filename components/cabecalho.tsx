'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Heart, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { TIPOS, tiposDisponiveis } from '@/lib/imoveis'
import { useFavoritos } from '@/lib/favoritos'
import { linkWhatsApp, site } from '@/lib/site'

function Submenu({ rotulo, finalidade }: { rotulo: string; finalidade: 'Comprar' | 'Alugar' }) {
  const disponiveis = tiposDisponiveis(finalidade)
  const base = `/imoveis?finalidade=${finalidade}`

  return (
    <div className="menu-item">
      <button type="button">{rotulo} <ChevronDown size={14} /></button>
      <div className="submenu">
        {disponiveis.map((tipo) => <Link key={tipo} href={`${base}&tipo=${encodeURIComponent(tipo)}`}>{tipo}</Link>)}
        {disponiveis.length === 0 && <span className="vazio">Nenhum imóvel nesta modalidade ainda</span>}
        <Link href={base}>Todos os imóveis</Link>
      </div>
    </div>
  )
}

export function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const { favoritos } = useFavoritos()

  return <>
    <div className="topbar">
      <div className="container">
        <div className="topbar-contatos">
          <a href={`mailto:${site.email}`}><Mail size={13} /> {site.email}</a>
          {site.telefone && <a href={`tel:${site.telefone.replace(/\D/g, '')}`}><Phone size={13} /> {site.telefone}</a>}
          {site.endereco && <span><MapPin size={13} /> {site.endereco}</span>}
        </div>
        <a href={linkWhatsApp('Olá, vim pelo site e gostaria de atendimento.')} target="_blank" rel="noreferrer">
          WhatsApp {site.whatsappVendas.exibicao}
        </a>
      </div>
    </div>

    <header className="cabecalho">
      <div className="container">
        <Link href="/" className="logo" aria-label={`${site.nome} — início`}>
          <img className="logo-marca" src="/logo.png" alt="" width={46} height={46} />
          <span><strong>{site.nome}</strong><small>{site.slogan}</small></span>
        </Link>

        <nav className="menu" aria-label="Navegação principal">
          <Submenu rotulo="Comprar" finalidade="Comprar" />
          <Submenu rotulo="Alugar" finalidade="Alugar" />
          <div className="menu-item">
            <button type="button">Anunciar <ChevronDown size={14} /></button>
            <div className="submenu">
              {TIPOS.map((tipo) => <Link key={tipo} href={`/anuncie?tipo=${encodeURIComponent(tipo)}`}>{tipo}</Link>)}
              <Link href="/anuncie">Anunciar meu imóvel</Link>
            </div>
          </div>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/favoritos" className="favoritos-link"><Heart size={15} /> Favoritos <span className="favoritos-contador">{favoritos.length}</span></Link>
        </nav>

        <button className="menu-botao" aria-label="Abrir menu" onClick={() => setAberto(true)}><Menu size={21} /></button>
      </div>
    </header>

    {aberto && (
      <div className="menu-mobile">
        <button className="fechar" aria-label="Fechar menu" onClick={() => setAberto(false)}><X size={22} /></button>
        <strong>Comprar</strong>
        {tiposDisponiveis('Comprar').map((tipo) => <Link key={tipo} href={`/imoveis?finalidade=Comprar&tipo=${encodeURIComponent(tipo)}`} onClick={() => setAberto(false)}>{tipo}</Link>)}
        <Link href="/imoveis?finalidade=Comprar" onClick={() => setAberto(false)}>Todos os imóveis à venda</Link>
        <strong>Alugar</strong>
        {tiposDisponiveis('Alugar').map((tipo) => <Link key={tipo} href={`/imoveis?finalidade=Alugar&tipo=${encodeURIComponent(tipo)}`} onClick={() => setAberto(false)}>{tipo}</Link>)}
        <Link href="/imoveis?finalidade=Alugar" onClick={() => setAberto(false)}>Todos os imóveis para alugar</Link>
        <strong>Institucional</strong>
        <Link href="/anuncie" onClick={() => setAberto(false)}>Anunciar meu imóvel</Link>
        <Link href="/sobre" onClick={() => setAberto(false)}>Sobre nós</Link>
        <Link href="/contato" onClick={() => setAberto(false)}>Contato</Link>
        <Link href="/favoritos" onClick={() => setAberto(false)}>Favoritos ({favoritos.length})</Link>
      </div>
    )}
  </>
}
