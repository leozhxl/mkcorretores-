'use client'

import Link from 'next/link'
import { CardImovel } from '@/components/card-imovel'
import { imoveis } from '@/lib/imoveis'
import { useFavoritos } from '@/lib/favoritos'
import { BotaoVoltar } from '@/components/botao-voltar'

export default function FavoritosPage() {
  const { favoritos } = useFavoritos()
  const salvos = imoveis.filter((imovel) => favoritos.includes(imovel.id))

  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas"><Link href="/">Início</Link> <span>/</span> <span>Favoritos</span></nav>
        <h1>Meus favoritos</h1>
        <p>Os imóveis que você salvou ficam guardados neste navegador.</p>
      </div>
    </section>

    <section className="secao">
      <div className="container">
        {salvos.length > 0 ? (
          <div className="grade-imoveis">{salvos.map((imovel) => <CardImovel key={imovel.id} imovel={imovel} />)}</div>
        ) : (
          <div className="vazio-estado">
            <strong>Você ainda não salvou nenhum imóvel.</strong>
            <p>Clique no coração sobre a foto de qualquer imóvel para guardá-lo aqui e comparar depois.</p>
            <Link className="botao botao-primario" href="/imoveis">Ver imóveis disponíveis</Link>
          </div>
        )}
      </div>
    </section>
  </>
}
