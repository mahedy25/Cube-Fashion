export default function Loader() {
  return (
    <div className='flex justify-center items-center w-full min-h-svh bg-gray-100'>
      <div className='relative flex justify-center items-center'>
        {/* Outer spinning ring */}
        <div className='absolute animate-spin rounded-full h-32 w-32 border-8 border-transparent border-t-[#D9004C] border-l-[#670626]'></div>

        {/* Inner glow */}
        <div className='absolute animate-pulse rounded-full h-16 w-16 bg-[#D9004C] opacity-50'></div>
      </div>
    </div>
  )
}
