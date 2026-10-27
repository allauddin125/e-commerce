import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { FiArrowRight } from 'react-icons/fi'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'

// Static banner data (temporary).
// Later API se data aayega — bas <BannerSlider banners={data} /> pass karna hai,
// response ki shape yahi rakhna: { id, image, alt, link, buttonText }
//
// image      = public folder ka path, 'public' hata ke '/' se likhna hai:
//              public/banners/Electronics.png  ->  '/banners/Electronics.png'
// buttonText = admin panel se aayega. Khali ('' ya null) bheja to us banner par
//              button dikhega hi nahi.
const bannerData = [
  { id: 1, image: '/banners/Electronics.png', alt: 'Electronics', link: '/', buttonText: 'Shop Now' },
  { id: 2, image: '/banners/fashion.png', alt: 'Fashion', link: '/', buttonText: 'Shop Now' },
  { id: 3, image: '/banners/home_green.png', alt: 'Home & Garden', link: '/', buttonText: 'Shop Now' },
  { id: 4, image: '/banners/sports.png', alt: 'Sports', link: '/', buttonText: 'Shop Now' },
  { id: 5, image: '/banners/toys.png', alt: 'Toys', link: '/', buttonText: 'Shop Now' },
]

function BannerSlider({ banners = bannerData, delay = 3000 }) {
  if (!banners?.length) return null

  return (
    <section className="w-full py-2 sm:px-2 sm:py-3 lg:px-4">
      <Swiper
        className="banner-slider overflow-hidden sm:rounded-2xl"
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        speed={700}
        loop={banners.length > 1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay, disableOnInteraction: false, pauseOnMouseEnter: true }}
        grabCursor
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative">
              <img
                src={banner.image}
                alt={banner.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className="h-[180px] w-full object-cover object-center sm:h-[260px] md:h-[340px] lg:h-[420px]"
              />

              {banner.buttonText && (
                <a
                  href={banner.link}
                  className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2.5 text-xs font-semibold tracking-wide text-white ring-1 ring-white/25 shadow-lg shadow-green-900/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/40 hover:brightness-110 sm:bottom-12 sm:px-8 sm:py-3.5 sm:text-sm"
                >
                  {banner.buttonText}
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default BannerSlider
