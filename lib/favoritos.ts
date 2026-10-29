'use client'

import { useCallback, useEffect, useState } from 'react'

const CHAVE = 'casanobre:favoritos'
const EVENTO = 'casanobre:favoritos-alterados'

function ler(): string[] {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? (JSON.parse(bruto) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Favoritos ficam no navegador do visitante. O estado inicial é sempre vazio
 * para não divergir do HTML renderizado no servidor.
 */
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    const sincronizar = () => setFavoritos(ler())
    sincronizar()
    window.addEventListener(EVENTO, sincronizar)
    window.addEventListener('storage', sincronizar)
    return () => {
      window.removeEventListener(EVENTO, sincronizar)
      window.removeEventListener('storage', sincronizar)
    }
  }, [])

  const alternar = useCallback((id: string) => {
    const atual = ler()
    const novo = atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    try {
      localStorage.setItem(CHAVE, JSON.stringify(novo))
    } catch {
      // Navegação privativa pode bloquear o armazenamento: mantemos só em memória.
    }
    setFavoritos(novo)
    window.dispatchEvent(new Event(EVENTO))
  }, [])

  return { favoritos, alternar }
}
