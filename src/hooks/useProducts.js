import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'

/**
 * Owns the fetching/loading/error state for products.
 * UI components never call the service directly.
 */
function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Guards against setting state after the component unmounts
    let active = true

    const load = async () => {
      try {
        const data = await getProducts()
        if (active) setProducts(data)
      } catch (err) {
        if (active) setError(err)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return { products, loading, error }
}

export default useProducts
