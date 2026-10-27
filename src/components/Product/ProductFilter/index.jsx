import './style.css'

/**
 * Category tabs only — no data fetching, no filtering.
 * Reports the selected category's slug back through onCategoryChange.
 */
function ProductFilter({ categories = [], activeCategory, onCategoryChange }) {
  if (!categories.length) return null

  return (
    <nav className="product-filter min-w-0 overflow-x-auto py-1">
      <ul className="flex w-max items-center gap-2">
        {categories.map((category) => {
          const isActive = category.slug === activeCategory

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onCategoryChange(category.slug)}
                aria-current={isActive ? 'true' : undefined}
                className={`block rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm ${
                  isActive
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                {category.name}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default ProductFilter
