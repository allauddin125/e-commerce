import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'

/**
 * Temporary data. Replace with the API response:
 *   <CategorySlider categories={apiCategories} />
 * Expected shape: { id, name, slug, image }
 * image = path inside /public, without the "public" part.
 */
const CATEGORIES = [
  { id: 1, name: 'Electronics', slug: 'electronics', image: '/categories/Electronocs-removebg-preview.png' },
  { id: 2, name: 'Fashion', slug: 'fashion', image: '/categories/New_Project__15_-removebg-preview.png' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden', image: '/categories/Home___Garden-removebg-preview.png' },
  { id: 4, name: 'Sports', slug: 'sports', image: '/categories/Sports__1_-removebg-preview.png' },
  { id: 5, name: 'Books', slug: 'books', image: '/categories/Books-removebg-preview.png' },
  { id: 6, name: 'Toys', slug: 'toys', image: '/categories/Toys1-removebg-preview.png' },
  { id: 7, name: 'Fruits & Vegetables', slug: 'fruits-vegetables', image: '/categories/fruits-Vegetables-removebg-preview.png' },
  { id: 8, name: 'Dairy & Eggs', slug: 'dairy-eggs', image: '/categories/Dairy-Eggs-removebg-preview.png' },
  { id: 9, name: 'Meat & Fish', slug: 'meat-fish', image: '/categories/Meatr-Fish-removebg-preview.png' },

  // Bakery aur Beverages ki image public/categories/ me abhi nahi hai.
  // Image daalne ke baad neeche ki 2 line uncomment kar dena (naam file se match karna):
  // { id: 10, name: 'Bakery', slug: 'bakery', image: '/categories/bakery.png' },
  // { id: 11, name: 'Beverages', slug: 'beverages', image: '/categories/beverages.png' },
]

/** Visible cards per screen width */
const BREAKPOINTS = {
  0: { slidesPerView: 2.2, spaceBetween: 12 },
  480: { slidesPerView: 3.2, spaceBetween: 14 },
  640: { slidesPerView: 4, spaceBetween: 16 },
  768: { slidesPerView: 5, spaceBetween: 16 },
  1024: { slidesPerView: 6, spaceBetween: 18 },
  1280: { slidesPerView: 7, spaceBetween: 20 },
  1536: { slidesPerView: 8, spaceBetween: 20 },
}

const NAV_BUTTON_CLASS =
  'category-nav-btn flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-600 hover:bg-green-600 hover:text-white sm:size-10'

/**
 * Soft pastel background per card, picked by index so it keeps working
 * with API data too. More categories than colours simply cycle the list.
 */
const CARD_COLORS = [
  'bg-rose-50 hover:bg-rose-100',
  'bg-amber-50 hover:bg-amber-100',
  'bg-emerald-50 hover:bg-emerald-100',
  'bg-sky-50 hover:bg-sky-100',
  'bg-violet-50 hover:bg-violet-100',
  'bg-orange-50 hover:bg-orange-100',
  'bg-teal-50 hover:bg-teal-100',
  'bg-fuchsia-50 hover:bg-fuchsia-100',
  'bg-lime-50 hover:bg-lime-100',
  'bg-cyan-50 hover:bg-cyan-100',
  'bg-indigo-50 hover:bg-indigo-100',
]

function CategoryCard({ category, color }) {
  return (
    <a
      href={`/category/${category.slug}`}
      className={`category-card group flex h-full flex-col items-center gap-2 rounded-xl px-1 py-3 text-center transition duration-300 hover:-translate-y-1 sm:px-1.5 sm:py-3.5 ${color}`}
    >
      <div className="category-card__icon flex size-16 items-center justify-center rounded-full bg-white p-2 sm:size-[72px] sm:p-2.5">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          draggable={false}
          className="size-full object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="line-clamp-2 text-xs font-semibold text-gray-800 sm:text-sm">
        {category.name}
      </h3>
    </a>
  )
}

function CategorySlider({ categories = CATEGORIES, title = 'Featured Categories' }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (!categories?.length) return null

  return (
    <section className="w-full px-4 py-6 sm:py-8 lg:px-8">
      {/* Heading and arrows sit outside Swiper so they never slide */}
      <header className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">{title}</h2>

        <div className="flex shrink-0 items-center gap-2">
          <button ref={prevRef} type="button" aria-label="Previous categories" className={NAV_BUTTON_CLASS}>
            <FiChevronLeft size={18} />
          </button>

          <button ref={nextRef} type="button" aria-label="Next categories" className={NAV_BUTTON_CLASS}>
            <FiChevronRight size={18} />
          </button>
        </div>
      </header>

      <Swiper
        className="category-slider"
        modules={[Navigation]}
        breakpoints={BREAKPOINTS}
        speed={500}
        grabCursor
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          // Refs are only filled after render, so wire them up before Swiper initialises
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <CategoryCard category={category} color={CARD_COLORS[index % CARD_COLORS.length]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default CategorySlider
