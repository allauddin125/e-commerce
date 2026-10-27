import Header from '../../components/Header'
import BannerSlider from '../../components/BannerSlider'
import BannerCategory from '../../components/BannerCategory'
import CategorySlider from '../../components/CategorySlider'
import PopularProducts from '../../components/PopularProducts'

const Home = () => {
  return (
    <main className="w-full">
      <Header />
      <BannerSlider />
      <CategorySlider />
      <PopularProducts />
      <BannerCategory />
    </main>
  )
}

export default Home
