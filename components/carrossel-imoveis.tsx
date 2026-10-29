'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CardImovel } from '@/components/card-imovel'
import type { Imovel } from '@/lib/imoveis'

type Props = {
  imoveis: Imovel[]
  /** Intervalo do avanço automático, em milissegundos. */
  intervalo?: number
}

/** Vitrine horizontal: passa sozinha, pausa no mouse e pode ser arrastada no celular. */
export function CarrosselImoveis({ imoveis, intervalo = 4500 }: Props) {
  const trilho = useRef<HTMLDivElement>(null)
  const [pausado, setPausado] = useState(false)
  const [posicao, setPosicao] = useState(0)

  /** Largura de um card + o espaço entre eles. */
  const passo = () => {
    const atual = trilho.current
    if (!atual) return 0
    const card = atual.firstElementChild as HTMLElement | null
    if (!card) return 0
    const espaco = parseFloat(getComputedStyle(atual).columnGap || '0')
    return card.offsetWidth + espaco
  }

  const irPara = useCallback((indice: number) => {
    const atual = trilho.current
    if (!atual) return
    atual.scrollTo({ left: indice * passo(), behavior: 'smooth' })
  }, [])

  const navegar = useCallback((direcao: 1 | -1) => {
    const atual = trilho.current
    if (!atual) return
    const largura = passo()
    if (!largura) return

    const visiveis = Math.max(1, Math.round(atual.clientWidth / largura))
    const ultimo = Math.max(0, imoveis.length - visiveis)
    const indice = Math.round(atual.scrollLeft / largura)
    const proximo = direcao === 1 ? (indice >= ultimo ? 0 : indice + 1) : indice <= 0 ? ultimo : indice - 1

    atual.scrollTo({ left: proximo * largura, behavior: 'smooth' })
  }, [imoveis.length])

  // Avanço automático, desligado quando o mouse está sobre a vitrine
  // ou quando o sistema pede menos animação.
  useEffect(() => {
    if (pausado || imoveis.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => navegar(1), intervalo)
    return () => clearInterval(timer)
  }, [pausado, navegar, intervalo, imoveis.length])

  // Acompanha o arraste manual para manter os indicadores corretos.
  const aoRolar = () => {
    const atual = trilho.current
    const largura = passo()
    if (atual && largura) setPosicao(Math.round(atual.scrollLeft / largura))
  }

  return (
    <div
      className="carrossel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="carrossel-trilho" ref={trilho} onScroll={aoRolar}>
        {imoveis.map((imovel) => (
          <div className="carrossel-item" key={imovel.id}>
            <CardImovel imovel={imovel} />
          </div>
        ))}
      </div>

      {imoveis.length > 1 && <>
        <button type="button" className="carrossel-seta carrossel-anterior" onClick={() => navegar(-1)} aria-label="Imóvel anterior">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="carrossel-seta carrossel-proxima" onClick={() => navegar(1)} aria-label="Próximo imóvel">
          <ChevronRight size={22} />
        </button>

        <div className="carrossel-pontos" role="tablist" aria-label="Escolher imóvel">
          {imoveis.map((imovel, indice) => (
            <button
              key={imovel.id}
              type="button"
              className={indice === posicao ? 'ativo' : ''}
              onClick={() => irPara(indice)}
              aria-label={`Ir para o imóvel ${indice + 1}`}
              aria-selected={indice === posicao}
              role="tab"
            />
          ))}
        </div>
      </>}
    </div>
  )
}
