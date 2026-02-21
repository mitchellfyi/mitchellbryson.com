import { BarnsleyNav } from '@/components/BarnsleyNav'

export default function BarnsleyLayout({ children }) {
  return (
    <>
      <header
        className="mt-6 mx-auto max-w-xl border-b border-zinc-200 px-4 py-4 dark:border-zinc-700 sm:px-8 lg:max-w-4xl xl:max-w-5xl lg:max-w-4xl lg:px-12"
      >
        <BarnsleyNav />
      </header>
      {children}
    </>
  )
}
