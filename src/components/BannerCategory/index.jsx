import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'

/**
 * Temporary data. Replace with the API response:
 *   <BannerCategory banners={apiBanners} />
 * Shape: { id, image, alt, link? }   link is optional.
 */
const BANNERS = [
  {
    id: 1,
    image: '/bannercategory/file_1783655398952_1731598986_cold_drinks.webp',
    alt: 'Cold drinks and snacks offers',
    link: '/shop',
  },
  {
    id: 2,
    image: '/bannercategory/file_1783655431054_1731599644_Smart_Deals_Trending_Smartphones.webp',
    alt: 'Smart deals on trending smartphones',
    link: '/shop',
  },
  {
    id: 3,
    image: '/bannercategory/file_1783655461892_1731599705_Best_Deals__On_Fashion.webp',
    alt: 'Best deals on fashion',
    link: '/shop',
  },
  {
    id: 4,
    image: '/bannercategory/file_1783655566944_NewProject(44).jpg',
    alt: 'New arrivals — 30% off on online orders',
    link: '/shop',
  },
]

/** Visible banners per screen width */
const BREAKPOINTS = {
  0: { slidesPerView: 1.2, spaceBetween: 12 },
  640: { slidesPerView: 2, spaceBetween: 14 },
  1024: { slidesPerView: 3, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 16 },
}

function BannerCategory({ banners = BANNERS }) {
  if (!banners?.length) return null

  return (
    <section className="w-full px-4 py-4 sm:py-6 lg:px-8">
      <Swiper
        className="banner-category"
        modules={[Navigation]}
        breakpoints={BREAKPOINTS}
        speed={500}
        navigation
        grabCursor
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* No href = plain non-clickable card, so link stays optional */}
            <a
              href={banner.link}
              className="banner-category__card block aspect-[768/447] overflow-hidden rounded-xl"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                loading="lazy"
                draggable={false}
                className="size-full object-cover transition duration-500 hover:scale-105"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default BannerCategory
