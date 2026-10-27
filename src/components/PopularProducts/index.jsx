import { useMemo, useState } from 'react'

import useProducts from '../../hooks/useProducts'
import categories from '../../data/categories'
import ProductFilter from '../Product/ProductFilter'
import ProductGrid from '../Product/ProductGrid'

import './style.css'

// First tab is selected by default, so the list can change without touching this
const DEFAULT_CATEGORY = categories[0].slug

// Data holds 20 products per category — the homepage only shows the first 10
const PRODUCTS_PER_PAGE = 10

/** Container: owns the active category and decides what the grid receives. */
function PopularProducts({
  title = 'Popular Products',
  limit = PRODUCTS_PER_PAGE,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}) {
  const { products, loading, error } = useProducts()
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)

  const visibleProducts = useMemo(() => {
    const inCategory =
      activeCategory === 'all'
        ? products
        : products.filter((product) => product.categorySlug === activeCategory)
     
 
    return inCategory.slice(0, limit)
  }, [products, activeCategory, limit])

  const renderBody = () => {
    if (loading) return <p className="py-10 text-center text-sm text-gray-500">Loading products...</p>
    if (error) return <p className="py-10 text-center text-sm text-red-500">Unable to load products.</p>
    if (!visibleProducts.length) return <p className="py-10 text-center text-sm text-gray-500">No products found.</p>

    return (
      <ProductGrid
        products={visibleProducts}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        onQuickView={onQuickView}
      />
    )
  }

  return (
    <section className="w-full px-4 py-6 sm:py-8 lg:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <h2 className="shrink-0 text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
          {title}
        </h2>

        <ProductFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {renderBody()}
    </section>
  )
}

export default PopularProducts
