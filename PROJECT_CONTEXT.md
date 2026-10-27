# Project Context — "e-commer" (React + Vite E-Commerce Frontend)

> Paste this whole file into ChatGPT as context before asking it anything about this project.
> It describes **what is built so far** and **how the code flows**. Written on 2026-09-22.

---

## 1. What this project is

A **frontend-only e-commerce storefront** (grocery / multi-category shop, "Nest"-style theme).
There is **no backend yet** — all data comes from local JS files, but the code is deliberately
structured so that swapping in a real API later touches **only one file**.

Currently only the **Home page** exists. This is the UI/layout phase — no cart logic,
no auth, no routed pages, no state-management library.

- **Brand color used everywhere:** `#29A56C` (green) / Tailwind `green-600`
- **Currency:** INR (`₹`, formatted with `toLocaleString('en-IN')`)

---

## 2. Tech stack

| Thing | Choice |
|---|---|
| Framework | React 19 (function components + hooks only, no classes) |
| Build tool | Vite 8 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` plugin + small per-component `style.css` files |
| Routing | `react-router-dom` v7 — **installed and `<BrowserRouter>` is mounted, but no `<Routes>` defined yet** |
| Sliders | `swiper` v14 (`swiper/react`) |
| Icons | `react-icons` (Fi = Feather, Fa = FontAwesome) |
| Linting | `oxlint` (config in `.oxlintrc.json`) |
| Language | Plain JavaScript / JSX (**not** TypeScript, despite a stray `src/vite-env.d.ts`) |
| Modules | ESM (`"type": "module"`) |

Scripts: `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`

---

## 3. Folder structure

```
d:\e-commer\
├─ index.html                  # Vite entry HTML, mounts <div id="root">
├─ vite.config.js              # react() + tailwindcss() plugins
├─ package.json
├─ .oxlintrc.json
├─ public/                     # static assets, served from "/" at runtime
│  ├─ banners/          (5 images)  → hero slider
│  ├─ bannercategory/   (4 images)  → promo banner strip
│  ├─ categories/       (9 images)  → category circle icons
│  └─ products/         (EMPTY — 0 files, see "Known gaps")
└─ src/
   ├─ main.jsx                 # React root + BrowserRouter
   ├─ App.jsx                  # renders <Home />
   ├─ index.css                # only: @import "tailwindcss";
   ├─ App.css                  # empty
   ├─ assets/images/logo/logo1.png
   ├─ pages/
   │  └─ Home/index.jsx        # composes the whole homepage
   ├─ components/
   │  ├─ Header/               # index.jsx + TopHeader.jsx + Navbar.jsx + Nav.jsx
   │  ├─ BannerSlider/         # hero image carousel
   │  ├─ CategorySlider/       # round category icons carousel
   │  ├─ PopularProducts/      # container: tabs + product grid
   │  ├─ BannerCategory/       # promo banners carousel
   │  ├─ Product/
   │  │  ├─ ProductFilter/     # category tab buttons
   │  │  ├─ ProductGrid/       # responsive grid layout
   │  │  └─ ProductCard/       # single product card
   │  └─ Footer/               # ⚠ index.jsx is EMPTY (0 bytes), not used anywhere
   ├─ hooks/
   │  └─ useProducts.js        # loading / error / data state for products
   ├─ services/
   │  └─ productService.js     # THE ONLY file that knows where data comes from
   └─ data/
      ├─ categories.js         # 9 categories
      └─ products.js           # 180 products (20 per category)
```

**Convention:** every component is a folder containing `index.jsx` + `style.css`,
imported as `../../components/X` (folder import resolves to `index.jsx`).

---

## 4. Code flow — top to bottom

### 4.1 Boot sequence

```
index.html  (#root, loads /src/main.jsx)
   └─ main.jsx
        <StrictMode>
          <BrowserRouter>        ← router is mounted but unused right now
            <App />
   └─ App.jsx  →  renders <Home />   (no routes, no layout wrapper)
   └─ pages/Home/index.jsx
        <main>
          <Header />          ← TopHeader + Navbar + Nav
          <BannerSlider />    ← hero carousel
          <CategorySlider />  ← category icons carousel
          <PopularProducts /> ← tabs + product grid  (the only data-driven section)
          <BannerCategory />  ← promo banners carousel
        </main>
```

There is **no `<Footer />`** in Home — the Footer component file is empty.

### 4.2 The data flow (the important architectural pattern)

This is the layering the project follows. **UI components never touch the data files directly.**

```
src/data/products.js          ← raw array (temporary "database")
        ↓  (only this file may import it)
src/services/productService.js
        export const getProducts = async () => products
        ↓
src/hooks/useProducts.js
        useEffect → getProducts() → { products, loading, error }
        (uses an `active` flag in cleanup to avoid setState after unmount)
        ↓
components/PopularProducts/index.jsx   ← "container" / smart component
        - calls useProducts()
        - holds useState(activeCategory), default = categories[0].slug ('electronics')
        - useMemo filters products by `categorySlug`, then slices to the first 10
        - renders loading / error / empty / grid states
        ↓
components/Product/ProductFilter   ← dumb: renders tabs, calls onCategoryChange(slug)
components/Product/ProductGrid     ← dumb: maps products → ProductCard
components/Product/ProductCard     ← dumb: renders one product, calls
                                     onAddToCart / onAddToWishlist / onQuickView props
```

**Why it matters:** when the backend is ready, only `productService.js` changes:

```js
export const getProducts = async () => {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
```

Nothing else in the app has to change. The file itself documents this in a comment.

### 4.3 Props-down / events-up

`ProductCard` is purely presentational. It calls `onAddToCart?.(product)` etc.
Those handlers come **from `PopularProducts`'s props**, and `Home` currently
passes **nothing** — so the **cart / wishlist / quick-view buttons are visually there
but do nothing yet.** The wiring point exists; the logic does not.

### 4.4 Header interaction flow

```
Header/index.jsx  owns  useState(isMobileNavOpen)
   ├─ TopHeader.jsx  → static promo bar (links, phone number). No state.
   ├─ Navbar.jsx     → logo, "All Categories" dropdown (local useState),
   │                   search input (UI only, no search logic),
   │                   wishlist / cart icons with HARD-CODED badges (3 and 2),
   │                   account dropdown (local useState),
   │                   hamburger button → setIsMobileNavOpen(true)
   └─ Nav.jsx        → desktop menu bar (Home/Shop/Categories/About/Blog/Contact)
                       with CSS-hover dropdowns,
                       + mobile slide-in sidebar driven by isMobileNavOpen
                       (always mounted, animated with translate-x, dark overlay,
                        useEffect locks document.body.overflow while open)
```

Mobile-nav state is **lifted up to `Header`** because both `Navbar` (opens it) and
`Nav` (renders it) need it.

---

## 5. Data shapes (the contract the future API must match)

**`src/data/categories.js`** — 9 items:

```js
{ id: 1, name: 'Electronics', slug: 'electronics' }
```

`slug` is the filtering key; `name` is display-only. Slugs: `electronics`, `fashion`,
`home-garden`, `sports`, `books`, `toys`, `fruits-vegetables`, `dairy-eggs`, `meat-fish`.

**`src/data/products.js`** — 180 items (exactly 20 per category), realistic Indian
products with real brand names (boAt, Licious, Libas, Amul…):

```js
{
  id: 1,
  name: 'boAt Rockerz 255 Bluetooth Earphones',
  category: 'Electronics',          // display text
  categorySlug: 'electronics',      // must match a slug in categories.js
  image: '/products/electronics-1.jpg',
  rating: 4,                        // 0-5 integer, rendered as stars
  seller: 'boAt',
  price: 1299,
  oldPrice: 2990                    // OPTIONAL — absent means no discount shown
}
```

**Banner shapes** (currently hard-coded inside their components, designed to be replaced by props):

- `BannerSlider`: `{ id, image, alt, link, buttonText }` — empty `buttonText` hides the button
- `CategorySlider`: `{ id, name, slug, image }`
- `BannerCategory`: `{ id, image, alt, link? }`

All three already accept the data as a prop, with the static array only as a
**default value** — e.g. `function BannerSlider({ banners = bannerData, delay = 3000 })`.
So switching to API data is just `<BannerSlider banners={apiData} />`.

Image paths are **`/public` paths with the `public` part removed**:
`public/banners/x.png` → `'/banners/x.png'`.

---

## 6. Component-by-component status

| Component | Built? | Data source | Notes |
|---|---|---|---|
| `Header/TopHeader` | ✅ UI done | hard-coded | promo bar; links are `#` anchors |
| `Header/Navbar` | ✅ UI done | hard-coded category list | search + badges are dummy |
| `Header/Nav` | ✅ UI done | hard-coded menu arrays | desktop dropdowns + mobile sidebar both work |
| `BannerSlider` | ✅ done | 5 local images | Swiper: autoplay 3s, loop, navigation, pagination |
| `CategorySlider` | ✅ done | 9 local images | responsive 2.2→8 slides, pastel color cycling, arrows wired via `onBeforeInit` |
| `PopularProducts` | ✅ done | **service + hook** | tabs + filter + 10-item slice; handles loading/error/empty |
| `ProductFilter` | ✅ done | props | pure tabs, horizontal scroll on mobile |
| `ProductGrid` | ✅ done | props | 2 / 3 / 4 / 5 columns responsive |
| `ProductCard` | ✅ done | props | stars, strike-through old price, CSS hover overlay actions, `onError` hides broken images |
| `BannerCategory` | ✅ done | 4 local images | 1.2→4 slides responsive |
| `Footer` | ❌ **empty file** | — | not imported anywhere |

---

## 7. Known gaps / things NOT built yet

1. **`public/products/` is empty** — all 180 products reference `/products/*.jpg` files that
   don't exist. `ProductCard` has an `onError` handler that hides the broken image and leaves
   a grey tile, so the UI doesn't break, but no product photos render.
2. **No routing** — `BrowserRouter` is mounted but there are no `<Routes>` / `<Route>`.
   All nav links are plain `<a href>` (full page reload) or `#` placeholders.
   Pages that do not exist: Shop, Product Detail, Cart, Checkout, Category, About,
   Blog, Contact, Login/Register, Wishlist, Order Tracking.
3. **No cart / wishlist state** — no Context, no Redux/Zustand. Badge counts (`3`, `2`)
   are hard-coded JSX. `onAddToCart` / `onAddToWishlist` / `onQuickView` props exist
   but `Home` never passes them.
4. **Search does nothing** — three separate search inputs (desktop navbar, mobile navbar,
   mobile sidebar) with no `value` / `onChange` / submit handler.
5. **Footer is an empty file.**
6. **No backend, no auth, no API client, no `.env`.**
7. **Not a git repository** (no `.git` folder) — no version history.
8. **No tests.**
9. Minor: `Nav.jsx`'s `menuItems` array ends with a double comma (`,,`) creating a sparse
   hole — harmless because `.map` skips holes, but it is a typo.
10. Minor: Bakery and Beverages are commented out in `CategorySlider` because their images
    are missing, yet they still appear in `Nav.jsx`'s dropdown list.
11. Minor: `src/vite-env.d.ts` and `@types/react` exist although the project is plain JS.
12. `README.md` is still the default Vite template text.

---

## 8. Coding conventions used in this project

- Function components, **default export** at the bottom of the file.
- One folder per component: `ComponentName/index.jsx` + `ComponentName/style.css`.
- Tailwind utility classes inline for layout/colors; `style.css` only for what Tailwind
  can't express well (Swiper overrides, the hover-label animation on `ProductCard`).
- Props get **default values** in the signature so components render standalone:
  `function ProductGrid({ products = [], onAddToCart })`.
- **Early return `null`** when there is no data: `if (!products.length) return null`.
- Optional callbacks invoked with optional chaining: `onAddToCart?.(product)`.
- Guard state updates in async effects with a local `active` flag.
- Comments mix English and Hinglish, and every hard-coded array is explicitly marked
  "temporary data — replace with the API response".
- `aria-label` / `aria-current` on icon buttons and tabs.
- Mobile-first responsive: base styles for mobile, then `sm:` `md:` `lg:` `xl:`.

---

## 9. Suggested next steps (not done yet)

1. Add the product images to `public/products/`.
2. Set up `react-router-dom` routes + a shared `Layout` (Header/Footer wrapper).
3. Build the Footer.
4. Add `CartContext` + `WishlistContext` and wire the existing callbacks and badge counts.
5. Build the Shop (with pagination/filters) and Product Detail pages.
6. Make search functional.
7. Add `categoryService.js` + a `useCategories` hook to mirror the products layering,
   and move the banner arrays into services too.
8. Replace the body of `getProducts()` with a real `fetch` once the backend exists.
9. `git init` the project.
