import ProductCard from '../ProductCard'

import './style.css'

/**
 * Lays out a collection of products. Knows nothing about where they came from.
 * 5 columns on desktop, so a 10-product page fills exactly 2 rows.
 */
function ProductGrid({ products = [], onAddToCart, onAddToWishlist, onQuickView }) {
  if (!products.length) return null

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  )
}

export default ProductGrid
