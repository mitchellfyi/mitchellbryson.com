'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

export function CopyLinkButton({ label = 'Copy link to these results' }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Button variant="secondary" onClick={handleCopy} aria-live="polite">
      {copied ? 'Copied!' : label}
    </Button>
  )
}
