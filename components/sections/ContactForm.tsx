'use client'

import { submitContactForm } from '@/actions/submitContactForm'
import { useState, useTransition } from 'react'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    startTransition(async () => {
      const result = await submitContactForm(formData)

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        ;(e.target as HTMLFormElement).reset()

        setTimeout(() => {
          setStatus({ type: null, message: '' })
        }, 5000)
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        })
      }
    })
  }

  return (
    <div className='bg-white border border-[#670626]/20 rounded-2xl p-6 md:p-8 shadow-sm'>

      {status.type && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm text-center ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status.message}
        </div>
      )}

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='space-y-1'>
          <label htmlFor='name' className='text-sm text-[#670626] font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full px-4 py-2 rounded-xl border border-[#670626]/30 focus:outline-none focus:ring-2 focus:ring-[#D9004C]/50 text-sm'
            placeholder='Your name'
            required
            disabled={isPending}
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='email' className='text-sm text-[#670626] font-medium'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full px-4 py-2 rounded-xl border border-[#670626]/30 focus:outline-none focus:ring-2 focus:ring-[#D9004C]/50 text-sm'
            placeholder='your.email@example.com'
            required
            disabled={isPending}
          />
        </div>

        <div className='space-y-1'>
          <label
            htmlFor='subject'
            className='text-sm text-[#670626] font-medium'
          >
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full px-4 py-2 rounded-xl border border-[#670626]/30 focus:outline-none focus:ring-2 focus:ring-[#D9004C]/50 text-sm'
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div className='space-y-1'>
          <label
            htmlFor='message'
            className='text-sm text-[#670626] font-medium'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            className='w-full px-4 py-2 rounded-xl border border-[#670626]/30 focus:outline-none focus:ring-2 focus:ring-[#D9004C]/50 text-sm resize-none'
            placeholder='Tell us about your project...'
            required
            disabled={isPending}
          />
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full py-3 rounded-xl text-white font-medium text-sm bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
