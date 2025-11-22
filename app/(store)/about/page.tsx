import Image from 'next/image'
import { Lobster } from 'next/font/google'
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Star,
  Truck,
  BadgeCheck,
} from 'lucide-react'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function AboutUs() {
  return (
    <section className='w-full px-6 py-16 max-w-6xl mx-auto'>
      {/* Page Title */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl ${lobster.className} 
        text-[#670626] tracking-wide text-center mb-6`}
      >
        About Cube Fashion
      </h1>

      {/* Divider */}
      <div className='relative w-32 sm:w-40 md:w-48 h-1 mx-auto mb-12'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full blur-md opacity-60' />
      </div>

      {/* Hero / Brand Message */}
      <div
        className='bg-white border border-[#670626]/20 rounded-2xl p-8 shadow-[0_4px_15px_rgba(0,0,0,0.05)]
      hover:shadow-[0_6px_25px_rgba(103,6,38,0.15)] transition-all duration-300'
      >
        <p className='text-[#670626] text-center text-lg leading-relaxed'>
          Cube Fashion brings together timeless style and modern trends to give
          you clothing that helps you feel confident, bold, and uniquely you. We
          carefully curate each collection with quality, comfort, and
          individuality in mind — because fashion should feel just as good as it
          looks.
        </p>
      </div>

      {/* Mission + Image */}
      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Left Block */}
        <div className='space-y-4'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-[#670626]'>
            Our Mission
          </h2>
          <p className='text-[#670626] text-sm sm:text-base leading-relaxed'>
            Our mission is simple — to make fashion effortless for everyone. We
            believe in creating a space where style meets accessibility,
            offering premium-quality pieces without the premium price tag.
          </p>
          <p className='text-[#670626] text-sm sm:text-base leading-relaxed'>
            Whether you&apos;re dressing up, dressing down, or expressing your own
            personality through fashion, Cube Fashion is here to elevate your
            wardrobe and your confidence.
          </p>
        </div>

        {/* Right Block (Image) */}
        <div className='relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg'>
          <Image
            src='/images/about-us.jpg' // Replace this with your image
            alt='Fashion showcase'
            fill
            className='object-cover'
          />
        </div>
      </div>

      {/* Values Section */}
      <div className='mt-20'>
        <h2 className='text-2xl sm:text-3xl text-center font-semibold text-[#670626] mb-10'>
          What We Stand For
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Quality First',
              text: 'Crafted with durability and premium comfort in mind.',
              icon: <ShieldCheck className='w-10 h-10 text-[#D9004C]' />,
            },
            {
              title: 'Styled With Passion',
              text: 'A blend of modern trends and timeless essentials.',
              icon: <Heart className='w-10 h-10 text-[#D9004C]' />,
            },
            {
              title: 'Customer Focused',
              text: 'Your satisfaction is at the heart of everything we do.',
              icon: <Sparkles className='w-10 h-10 text-[#D9004C]' />,
            },
          ].map((v) => (
            <div
              key={v.title}
              className='group p-6 bg-white border border-[#670626]/20 rounded-2xl shadow-sm
              hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(103,6,38,0.15)]
              hover:bg-[#670626]/5 transition-all duration-300 text-center'
            >
              <div className='flex justify-center mb-3'>{v.icon}</div>
              <h3 className='text-lg font-bold text-[#670626] group-hover:text-[#D9004C] mb-2'>
                {v.title}
              </h3>
              <p className='text-sm text-[#670626]'>{v.text}</p>

              <div
                className='mt-3 h-0.5 w-0 bg-linear-to-r from-[#670626] to-[#D9004C]
              mx-auto rounded-full transition-all duration-300 group-hover:w-20'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Shoppers Love Us (Icons added) */}
      <div className='mt-20'>
        <h2 className='text-2xl sm:text-3xl text-center font-semibold text-[#670626] mb-10'>
          Why Shoppers Love Us
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[
            {
              text: 'Fast & secure worldwide shipping',
              icon: <Truck className='w-6 h-6 text-[#D9004C]' />,
            },
            {
              text: 'Premium quality guaranteed',
              icon: <BadgeCheck className='w-6 h-6 text-[#D9004C]' />,
            },
            {
              text: 'Affordable modern fashion',
              icon: <Star className='w-6 h-6 text-[#D9004C]' />,
            },
            {
              text: 'Thousands of happy customers',
              icon: <Heart className='w-6 h-6 text-[#D9004C]' />,
            },
          ].map((item) => (
            <div
              key={item.text}
              className='p-6 bg-white border border-[#670626]/20 rounded-2xl shadow-sm 
              hover:bg-[#670626]/5 hover:scale-[1.03] transition-all duration-300 text-center'
            >
              <div className='flex justify-center mb-2'>{item.icon}</div>
              <p className='text-[#670626] font-medium'>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className='mt-20'>
        <h2 className='text-2xl sm:text-3xl text-center font-semibold text-[#670626] mb-8'>
          FAQ
        </h2>

        <div className='space-y-4 max-w-3xl mx-auto'>
          {[
            {
              q: 'How fast is shipping?',
              a: 'Most orders arrive within 3–7 business days depending on your location.',
            },
            {
              q: 'Do you offer returns?',
              a: 'Yes — we offer hassle-free returns on all eligible items.',
            },
            {
              q: 'Are your products high quality?',
              a: 'Absolutely. Every item is selected or designed with long-lasting quality in mind.',
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className='group border border-[#670626]/20 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all'
            >
              <summary className='cursor-pointer text-[#670626] font-semibold group-open:text-[#D9004C]'>
                {faq.q}
              </summary>
              <p className='mt-2 text-[#670626] text-sm sm:text-base'>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
