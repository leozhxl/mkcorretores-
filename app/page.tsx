'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, MapPinned, Users } from 'lucide-react'
import { BuscaImoveis } from '@/components/busca-imoveis'
import { CardImovel } from '@/components/card-imovel'
import { TIPOS, cidadesComTotal, destaques, imoveis, type Finalidade } from '@/lib/imoveis'
import { site } from '@/lib/site'

export default function Home() {
  const [aba, setAba] = useState<Finalidade>('Comprar')
  const oportunidades = useMemo(() => destaques.filter((imovel) => imovel.finalidade === aba), [aba])
  const cidades = cidadesComTotal()

  return <>
    <section className="hero">
      <div className="container">
        <h1>As melhores oportunidades você encontra aqui</h1>
        <p>Imóveis visitados e documentados pela nossa equipe em {cidades.map((item) => item.cidade).join(', ') || 'Santa Catarina'}.</p>
        <BuscaImoveis />
      </div>
    </section>

    <section className="secao">
      <div className="container">
        <div className="secao-titulo">
          <h2>Oportunidades</h2>
          <p>Imóveis em destaque no nosso portfólio.</p>
          <span className="linha" />
        </div>

        <div className="abas">
          {(['Comprar', 'Alugar'] as const).map((opcao) => (
            <button key={opcao} type="button" className={aba === opcao ? 'ativo' : ''} onClick={() => setAba(opcao)}>{opcao}</button>
          ))}
        </div>

        {oportunidades.length > 0 ? <>
          <div className="grade-imoveis">{oportunidades.map((imovel) => <CardImovel key={imovel.id} imovel={imovel} />)}</div>
          <p style={{ marginTop: 24 }}>
            <Link className="botao botao-contorno" href={`/imoveis?finalidade=${aba}`}>Ver todos os imóveis para {aba.toLowerCase()} <ArrowRight size={16} /></Link>
          </p>
        </> : (
          <div className="vazio-estado">
            <strong>Ainda não temos imóveis para {aba.toLowerCase()} publicados.</strong>
            <p>Estamos captando novos imóveis para esta modalidade. Se você tem um imóvel disponível, anuncie com a gente — ou conte o que procura e buscamos para você.</p>
            <Link className="botao botao-primario" href="/anuncie">Anunciar meu imóvel</Link>
          </div>
        )}
      </div>
    </section>

    <section className="faixa-anuncie">
      <div className="container">
        <div>
          <h2>Anuncie seu imóvel com a gente</h2>
          <p>Na {site.nome} o seu imóvel é fotografado, documentado e apresentado a quem realmente procura. Avaliação sem compromisso.</p>
        </div>
        <Link className="botao" href="/anuncie">Quero anunciar <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="secao">
      <div className="container">
        <div className="secao-titulo">
          <h2>Por que escolher a {site.nome}</h2>
          <span className="linha" />
        </div>
        <div className="diferenciais">
          <article className="diferencial">
            <span className="diferencial-icone"><MapPinned size={24} /></span>
            <h3>Especialistas na região</h3>
            <p>Atuamos em {cidades.map((item) => `${item.cidade}/${item.estado}`).join(', ') || 'Santa Catarina'}, com conhecimento de bairro, valor de mercado e documentação local.</p>
          </article>
          <article className="diferencial">
            <span className="diferencial-icone"><Award size={24} /></span>
            <h3>Imóveis conferidos</h3>
            <p>Publicamos apenas o que está efetivamente disponível, com fotos próprias e documentação verificada antes de anunciar.</p>
          </article>
          <article className="diferencial">
            <span className="diferencial-icone"><Users size={24} /></span>
            <h3>Atendimento direto</h3>
            <p>{site.corretores ? `Time de ${site.corretores} corretores à disposição.` : 'Você fala com o mesmo corretor do primeiro contato até a assinatura do contrato.'}</p>
          </article>
        </div>
      </div>
    </section>

    {cidades.length > 0 && (
      <section className="secao" style={{ background: '#fff' }}>
        <div className="container">
          <div className="secao-titulo">
            <h2>Imóveis por cidade</h2>
            <p>Escolha a cidade e veja o que está disponível agora.</p>
            <span className="linha" />
          </div>
          <div className="cidades">
            {cidades.map((item) => (
              <Link key={item.cidade} className="cidade-card" href={`/imoveis?cidade=${encodeURIComponent(item.cidade)}`}>
                <img src={imoveis.find((imovel) => imovel.cidade === item.cidade)?.fotos[0] ?? ''} alt={item.cidade} loading="lazy" />
                <div>
                  <strong>{item.cidade}</strong>
                  <span>{item.total} {item.total === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="atalhos">
            {cidades.flatMap((item) =>
              TIPOS.filter((tipo) => imoveis.some((imovel) => imovel.cidade === item.cidade && imovel.tipo === tipo)).map((tipo) => (
                <Link key={`${item.cidade}-${tipo}`} href={`/imoveis?cidade=${encodeURIComponent(item.cidade)}&tipo=${encodeURIComponent(tipo)}`}>
                  {tipo} em {item.cidade}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    )}
  </>
}
