'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'

export function EmailReport({ toolName, reportEndpoint, reportData }) {
  const [email, setEmail] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(reportEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          toolName,
          permalink: window.location.href,
          ...reportData,
        }),
      })

      if (!res.ok) {
        setStatus('error')
        return
      }

      // Newsletter subscription via existing contact endpoint
      if (subscribe) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Newsletter Subscriber',
            email,
            message: `Newsletter Subscription (via ${toolName})`,
          }),
        })
      }

      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Save or share your results
      </h4>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        Email yourself a full report or copy a link to share with colleagues.
      </p>

      {status === 'sent' ? (
        <p className="mt-4 text-sm font-medium text-teal-700 dark:text-teal-300">
          Report sent! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          {status === 'error' && (
            <div className="mb-3 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">
                Sorry, there was an error sending the report. Please try again.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(
                'min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-sm shadow-sm',
                'outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500',
                'dark:bg-zinc-800 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400',
              )}
            />
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send'}
            </Button>
          </div>

          <label className="mt-3 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-teal-500 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:focus:ring-teal-400"
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Also subscribe me to occasional AI tips and updates
            </span>
          </label>
        </form>
      )}
    </div>
  )
}
