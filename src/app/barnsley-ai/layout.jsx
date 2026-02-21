import { BarnsleyNav } from '@/components/BarnsleyNav'

export default function BarnsleyLayout({ children }) {
  return (
    <>
      <header className="mx-auto mt-6 max-w-xl border-b border-zinc-200 px-4 py-4 sm:px-8 lg:max-w-4xl lg:px-12 xl:max-w-5xl dark:border-zinc-700">
        <BarnsleyNav />
      </header>
      {children}
    </>
  )
}
