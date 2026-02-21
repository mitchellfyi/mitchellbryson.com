'use client'

import { useState } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SimpleLayout
      title="Get in touch"
      intro={
        <>
          I&apos;d love to hear from you. Send me a message and I&apos;ll
          respond as soon as possible. You can also reach me directly at{' '}
          <a
            href="mailto:website@mitchellbryson.com"
            className="text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            website@mitchellbryson.com
          </a>
          .
        </>
      }
    >
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              Name<span aria-hidden="true"> *</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              aria-required="true"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              Email<span aria-hidden="true"> *</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Message<span aria-hidden="true"> *</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            required
            aria-required="true"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
            placeholder="Write your message..."
          />
        </div>

        {submitStatus === 'success' && (
          <div
            role="alert"
            className="rounded-md bg-green-50 p-4 dark:bg-green-900/20"
          >
            <div className="text-sm text-green-800 dark:text-green-200">
              Thank you for your message! I&apos;ll get back to you soon.
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div
            role="alert"
            className="rounded-md bg-red-50 p-4 dark:bg-red-900/20"
          >
            <div className="text-sm text-red-800 dark:text-red-200">
              Sorry, there was an error sending your message. Please try again.
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </SimpleLayout>
  )
}
