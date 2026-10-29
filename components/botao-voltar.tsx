'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

/** Volta para a página anterior. Sem histórico (link direto, aba nova), vai para a home. */
export function BotaoVoltar() {
  const router = useRouter()

  const voltar = () => {
    if (window.history.length > 1) router.back()
    else router.push('/')
  }

  return (
    <button type="button" className="botao-voltar" onClick={voltar}>
      <ArrowLeft size={16} /> Voltar
    </button>
  )
}
