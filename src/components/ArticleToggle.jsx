'use client'

import { useState } from 'react'
import Link from 'next/link'

function DocumentIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points="14,2 14,8 20,8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleToggle({ isDraft, onToggle, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className} mb-16`}>
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            !isDraft
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
          aria-label="Switch to AI formatted version"
        >
          <DocumentIcon className="h-4 w-4" />
          AI Formatted
        </button>
        <button
          type="button"
          onClick={() => onToggle(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            isDraft
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
          aria-label="Switch to draft version"
        >
          <EditIcon className="h-4 w-4" />
          Draft
        </button>
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        <div className="text-xs text-zinc-500 dark:text-zinc-500 leading-tight">
          {isDraft 
            ? "Viewing the original draft I wrote to generate the formatted article." 
            : "Viewing the AI-enhanced version of the article I wrote."
          }
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
          <Link href="/contact" className="hover:text-zinc-700 dark:hover:text-zinc-300 underline">
            Contact me for the prompt used to generate the article.
          </Link>
        </div>
      </div>
    </div>
  )
}
