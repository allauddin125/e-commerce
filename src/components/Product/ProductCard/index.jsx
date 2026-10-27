import { FaStar } from 'react-icons/fa'
import { FiEye, FiHeart, FiShoppingCart } from 'react-icons/fi'

import './style.css'

const MAX_RATING = 5

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`

const ACTION_CLASS =
  'flex size-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-green-600 hover:text-white focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none sm:size-9'

/**
 * Shows one product. Receives everything through props — no data of its own.
 * Cart/wishlist/quick-view logic lives outside: the card only reports clicks.
 */
function ProductCard({ product, onAddToCart, onAddToWishlist, onQuickView }) {
  if (!product) return null

  const { image, name, category, rating, seller, price, oldPrice } = product
  const hasDiscount = oldPrice != null && oldPrice > price

  return (
    <article className="product-card flex h-full flex-col overflow-hidden rounded-xl bg-white">
      <div className="group relative aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          draggable={false}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          // Missing image should show the plain grey tile, not a broken-icon
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
        />

        {/* Hover actions — CSS only, no state. See style.css for the label swap. */}
        <div className="product-card__overlay absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="product-card__actions relative">
            <span className="product-card__label product-card__label--wishlist">
              Add to Wishlist
            </span>
            <span className="product-card__label product-card__label--quick">Quick View</span>

            <div className="product-card__box flex items-center gap-1 rounded-full bg-white p-1 shadow-lg">
              <button
                type="button"
                aria-label="Add to wishlist"
                onClick={() => onAddToWishlist?.(product)}
                className={`product-card__action product-card__action--wishlist ${ACTION_CLASS}`}
              >
                <FiHeart size={16} />
              </button>

              <button
                type="button"
                aria-label="Quick view"
                onClick={() => onQuickView?.(product)}
                className={`product-card__action product-card__action--quick ${ACTION_CLASS}`}
              >
                <FiEye size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        {category && (
          <p className="text-[11px] tracking-wide text-gray-400 uppercase">{category}</p>
        )}

        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">{name}</h3>

        {rating != null && (
          <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: MAX_RATING }, (_, index) => (
              <FaStar
                key={index}
                size={12}
                className={index < rating ? 'text-amber-400' : 'text-gray-300'}
              />
            ))}
          </div>
        )}

        {seller && <p className="text-xs text-gray-500">By {seller}</p>}

        {/* Price on the left, cart action on the opposite side */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-lg leading-tight font-bold text-green-600">
              {formatPrice(price)}
            </span>

            {hasDiscount && (
              <span className="truncate text-xs text-gray-400 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            onClick={() => onAddToCart?.(product)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-600 px-2.5 py-2 text-[11px] font-semibold whitespace-nowrap text-white transition hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 sm:px-3 sm:text-xs"
          >
            <FiShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
