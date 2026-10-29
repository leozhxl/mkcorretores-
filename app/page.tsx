'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, MapPinned, Users } from 'lucide-react'
import { BuscaImoveis } from '@/components/busca-imoveis'
import { CarrosselImoveis } from '@/components/carrossel-imoveis'
import { TIPOS, cidadesComTotal, imoveis, type Finalidade } from '@/lib/imoveis'
import { site } from '@/lib/site'

export default function Home() {
  const [aba, setAba] = useState<Finalidade>('Comprar')
  const oportunidades = useMemo(() => imoveis.filter((imovel) => imovel.finalidade === aba), [aba])
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
          <p>Todos os imóveis disponíveis agora no nosso portfólio.</p>
          <span className="linha" />
        </div>

        <div className="abas">
          {(['Comprar', 'Alugar'] as const).map((opcao) => (
            <button key={opcao} type="button" className={aba === opcao ? 'ativo' : ''} onClick={() => setAba(opcao)}>{opcao}</button>
          ))}
        </div>

        {oportunidades.length > 0 ? <>
          <CarrosselImoveis imoveis={oportunidades} />
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

    <Link className="faixa-anuncie" href="/anuncie" aria-label="Anuncie seu imóvel com a gente — quero anunciar">
      <img src="/faixa-anuncie.png" alt={`Anuncie seu imóvel com a ${site.nome}`} width={2172} height={724} />
    </Link>

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
