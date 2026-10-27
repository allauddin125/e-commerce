import products from '../data/products'

/**
 * The only place that knows where product data comes from.
 *
 * When the backend is ready, replace the body of this function — nothing
 * else in the app changes:
 *
 *   export const getProducts = async () => {
 *     const response = await fetch('/api/products')
 *     if (!response.ok) throw new Error('Failed to fetch products')
 *     return response.json()
 *   }
 */
export const getProducts = async () => {
  return products
}
