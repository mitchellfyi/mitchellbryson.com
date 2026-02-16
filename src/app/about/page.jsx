import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About',
  description:
    "I'm Mitchell Bryson, a full-stack AI Software Engineer. I build engaging products and practical systems that ship fast and create measurable value.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Mitchell Bryson portrait photo"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I build practical systems that ship fast and create measurable
            value.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m a full-stack AI Software Engineer. I build engaging products
              and practical systems that ship fast, reduce manual work, and
              create measurable value for teams. I&apos;ve been making websites
              and apps since 2000, and I still prefer small, verifiable wins
              over grand promises.
            </p>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                What I&apos;m good at
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-teal-500">•</span>
                  <span>
                    <strong>Product strategy to working software</strong> -
                    deciding what to build and why, then delivering it
                    end-to-end. I&apos;ve worked for, started, and co-founded
                    tech companies, covering product decisions, resource
                    allocation, hands-on engineering, and hiring
                    multi-disciplinary teams.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-teal-500">•</span>
                  <span>
                    <strong>Modern web stacks</strong> - Ruby on Rails
                    (Hotwire), JavaScript (React/Vue), Next.js, and Tailwind
                    with Sass.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-teal-500">•</span>
                  <span>
                    <strong>Applied AI</strong> - bringing LLMs into real SaaS
                    workflows (search, support, data/ops), with a clear line
                    from model output to business value. I&apos;m actively
                    deepening applied AI for product engineering and data
                    science.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                In my spare-time....
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-teal-500">•</span>
                  <span>
                    Shipping a socially curated RSS feed reader as a live
                    testbed for product and AI ideas.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-teal-500">•</span>
                  <span>
                    Collaborating on B2B SaaS where LLMs have concrete use cases
                    and ROI.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink> */}
            {/* <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink> */}
            <SocialLink
              href="https://github.com/mitchellfyi"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/mitchellfyi"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:website@mitchellbryson.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              website@mitchellbryson.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
