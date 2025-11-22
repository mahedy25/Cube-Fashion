import Image from 'next/image'
import { Lobster } from 'next/font/google'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function ContactUs() {
  return (
    <section className='w-full px-6 py-16 max-w-6xl mx-auto'>
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl ${lobster.className} text-[#670626] tracking-wide text-center mb-6`}
      >
        Contact Us
      </h1>

      <div className='relative w-32 sm:w-40 md:w-48 h-1 mx-auto mb-12'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full blur-md opacity-60' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <div className='space-y-6'>
          {[
            {
              title: 'Email Us',
              text: 'support@cubefashion.com',
              sub: 'We reply within 24 hours.',
              icon: <Mail className='w-10 h-10 text-[#D9004C]' />,
            },
            {
              title: 'Call Us',
              text: '+1 (555) 123-4567',
              sub: 'Mon–Fri | 9 AM – 6 PM',
              icon: <Phone className='w-10 h-10 text-[#D9004C]' />,
            },
            {
              title: 'Visit Us',
              text: '123 Fashion Street, London, UK',
              sub: '',
              icon: <MapPin className='w-10 h-10 text-[#D9004C]' />,
            },
            {
              title: 'Working Hours',
              text: 'Monday – Saturday',
              sub: '10:00 AM – 7:00 PM',
              icon: <Clock className='w-10 h-10 text-[#D9004C]' />,
            },
          ].map((item) => (
            <div
              key={item.title}
              className='group bg-white border border-[#670626]/20 rounded-2xl p-6 shadow-sm hover:shadow-[0_6px_25px_rgba(103,6,38,0.15)] transition-all flex items-start gap-4'
            >
              {item.icon}
              <div>
                <h3 className='text-lg font-bold text-[#670626] group-hover:text-[#D9004C]'>
                  {item.title}
                </h3>
                <p className='text-[#670626] text-sm'>{item.text}</p>
                {item.sub && (
                  <p className='text-[#670626]/80 text-xs mt-1'>{item.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg'>
          <Image
            src='/images/contact.jpg'
            alt='Contact Cube Fashion'
            fill
            className='object-cover'
          />
        </div>
      </div>

      <div className='mt-20'>
        <h2 className='text-2xl sm:text-3xl text-center font-semibold text-[#670626] mb-6'>
          Send Us a Message
        </h2>

        <div className='relative w-32 sm:w-40 md:w-48 h-1 mx-auto mb-10'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full blur-md opacity-60' />
        </div>

        <div className='bg-white border border-[#670626]/20 rounded-2xl p-8 shadow-sm hover:shadow-[0_6px_25px_rgba(103,6,38,0.15)] transition-all'>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
