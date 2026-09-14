import { useEffect, useState } from 'react'
import './App.css'

type IconProps = { size?: number; strokeWidth?: number; fill?: string }
const icon = (symbol: string, label: string) => function Icon({ size = 16 }: IconProps) { return <span className="inline-icon" aria-label={label} style={{ fontSize: `${size}px` }}>{symbol}</span> }
const ArrowRight = icon('→', 'arrow right')
const ArrowUpRight = icon('↗', 'arrow up right')
const Bag = icon('□', 'bag')
const Check = icon('✓', 'check')
const Instagram = icon('◎', 'Instagram')
const MapPin = icon('●', 'location')
const Menu = icon('☰', 'menu')
const Minus = icon('—', 'minus')
const Search = icon('⌕', 'search')
const X = icon('×', 'close')

const images = {
  hero: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=2200&q=90',
  intro: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1100&q=85',
  shirts: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
  bottoms: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
  layers: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85',
  banner: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=2200&q=90',
  oxford: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85',
  trouser: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85',
  overshirt: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
  knit: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=85',
  story: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1300&q=85',
  look1: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1100&q=85',
  look2: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
  look3: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1100&q=85',
  look4: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=85',
  look5: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
  look6: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85',
}

const products = [
  { name: 'The Structured Oxford', category: 'Shirts', price: '₹3,490', image: images.oxford },
  { name: 'The Relaxed Trouser', category: 'Trousers', price: '₹4,290', image: images.trouser },
  { name: 'The Essential Overshirt', category: 'Layers', price: '₹5,490', image: images.overshirt },
  { name: 'The Everyday Knit', category: 'Knitwear', price: '₹3,990', image: images.knit },
]

const collections = [
  { title: 'Essential Shirts', text: 'Clean lines. Elevated everyday dressing.', image: images.shirts },
  { title: 'Tailored Bottoms', text: 'Structure meets effortless movement.', image: images.bottoms },
  { title: 'Signature Layers', text: 'Modern layers for changing perspectives.', image: images.layers },
]

const lookbookDetails = [
  { title: 'The Structured Oxford', category: 'Shirts / Editorial 01', price: '₹3,490', note: 'Sharp proportion, softened by movement.' },
  { title: 'The Essential Overshirt', category: 'Layers / Editorial 02', price: '₹5,490', note: 'A quiet study in texture and useful form.' },
  { title: 'The Relaxed Trouser', category: 'Trousers / Editorial 03', price: '₹4,290', note: 'Easy structure for the everyday.' },
  { title: 'The Everyday Knit', category: 'Knitwear / Editorial 04', price: '₹3,990', note: 'Tactile warmth, pared back to its essence.' },
  { title: 'The Signature Layer', category: 'Layers / Editorial 05', price: '₹5,490', note: 'Built for changing perspectives.' },
  { title: 'The Modern Essential', category: 'Essentials / Editorial 06', price: '₹4,290', note: 'A considered final layer for a distinctive presence.' },
]

type ProductDetail = { name: string; category: string; price: string; image: string; gallery: string[] }
const productGallery = (product: typeof products[number], selectedImage = product.image): ProductDetail => ({
  ...product,
  image: selectedImage,
  gallery: [selectedImage, `${selectedImage}&crop=faces`, `${selectedImage}&crop=entropy`],
})

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? 'logo-light' : ''}`} href="#top" aria-label="Velora home"><span className="logo-mark">V</span><span>VELORA</span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [enquiry, setEnquiry] = useState<string | null>(null)
  const [lookbookDetail, setLookbookDetail] = useState<{ image: string; title: string; category: string; price: string; note: string } | null>(null)
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)
  const [rotationIndex, setRotationIndex] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll)
    onScroll()
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const openProductDetail = (name: string, selectedImage?: string) => {
    const product = products.find((item) => item.name === name) ?? products[0]
    setRotationIndex(0)
    setProductDetail(productGallery(product, selectedImage))
  }
  const rotateFromDrag = (clientX: number) => {
    if (dragStart === null || !productDetail) return
    const distance = clientX - dragStart
    if (Math.abs(distance) < 32) return
    setRotationIndex((index) => (index + (distance < 0 ? 1 : productDetail.gallery.length - 1)) % productDetail.gallery.length)
    setDragStart(clientX)
  }

  return <div id="top">
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}><Logo light={!scrolled} /><nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation"><a href="#collections" onClick={closeMenu}>Collections</a><a href="#story" onClick={closeMenu}>Our Story</a><a href="#lookbook" onClick={closeMenu}>Lookbook</a><a href="#visit" onClick={closeMenu}>Visit Us</a></nav><div className="header-actions"><button aria-label="Search"><Search size={17} strokeWidth={1.5} /></button><button aria-label="Shopping bag"><Bag size={17} strokeWidth={1.5} /><span className="bag-count">0</span></button><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></header>
    <main>
      <section className="hero" style={{ backgroundImage: `url(${images.hero})` }}><div className="hero-overlay" /><div className="hero-content page-width"><p className="eyebrow hero-eyebrow">EST. 2026 <span /> MODERN ESSENTIALS</p><h1>DEFINE<br /><em>YOUR</em> PRESENCE.</h1><p className="hero-copy">Refined silhouettes. Considered details.<br />A new perspective on everyday luxury.</p><div className="hero-actions"><a className="button button-light" href="#collections">Explore Collection <ArrowUpRight size={15} /></a><a className="text-link text-link-light" href="#story">Our Story <ArrowRight size={15} /></a></div></div><div className="scroll-cue"><span>Scroll to discover</span><i><Minus size={16} /></i></div></section>
      <section className="intro section-pad page-width reveal"><div className="intro-label"><span className="section-number">01</span><p className="eyebrow">The Velora Standard</p><div className="intro-note"><span>01 / 04</span><strong>Considered form</strong><small>Cut for movement.<br />Made to endure.</small></div></div><div className="intro-main"><h2>LESS,<br /><em>BUT SIGNIFICANT.</em></h2><div className="intro-copy"><p>VELORA is a modern expression of refined menswear — designed around confident silhouettes, considered materials, and effortless individuality.</p><a className="text-link" href="#story">Read our story <ArrowUpRight size={15} /></a></div></div><div className="intro-image image-reveal"><img src={images.intro} alt="Velora model in a softly tailored neutral jacket" /><span>01 / 04</span></div><div className="intro-detail"><img src={images.overshirt} alt="Close detail of a neutral fabric texture" /><div><span className="eyebrow">Material study / 01</span><strong>Texture before ornament.</strong></div></div></section>
      <section id="collections" className="collections section-pad page-width"><div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">02</span> The Current Edit</p><h2>THE CURRENT <em>EDIT.</em></h2></div><p>A considered selection of pieces<br />designed to move with you.</p></div><div className="collection-grid">{collections.map((collection, index) => <a className="collection-card reveal" href="#products" key={collection.title} style={{ transitionDelay: `${index * 100}ms` }}><div className="collection-image"><img src={collection.image} alt={collection.title} /></div><div className="collection-meta"><div><h3>{collection.title}</h3><p>{collection.text}</p></div><ArrowUpRight size={20} strokeWidth={1.3} /></div></a>)}</div></section>
      <section className="editorial-banner" style={{ backgroundImage: `url(${images.banner})` }}><div className="banner-overlay" /><div className="banner-content reveal"><p className="eyebrow">The Velora Journal / 001</p><h2>BUILT FOR<br /><em>THE DISTINCTIVE.</em></h2><p>Clothing that speaks without trying.</p><a className="button button-light" href="#lookbook">View Lookbook <ArrowUpRight size={15} /></a></div></section>
      <section id="products" className="products section-pad page-width"><div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">03</span> The Wardrobe</p><h2>SIGNATURE <em>PIECES.</em></h2></div><a className="text-link" href="#collections">View all pieces <ArrowRight size={15} /></a></div><div className="product-grid">{products.map((product, index) => <article className="product-card reveal" key={product.name} style={{ transitionDelay: `${index * 80}ms` }}><button className="product-image" onClick={() => openProductDetail(product.name)} aria-label={`Explore ${product.name}`}><img src={product.image} alt={product.name} /><span className="quick-view">Explore piece <ArrowUpRight size={14} /></span></button><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{product.price}</strong></div><button className="enquiry-link" onClick={() => setEnquiry(product.name)}>Add to enquiry <ArrowRight size={14} /></button></article>)}</div></section>
      <section id="story" className="story"><div className="story-copy reveal"><p className="eyebrow eyebrow-gold"><span className="section-number">04</span> The Velora World</p><h2>DESIGNED WITH<br /><em>INTENTION.</em></h2><p>We believe great style is not defined by excess. It is found in proportion, texture, movement, and the quiet confidence of pieces made to last.</p><a className="button button-outline-light" href="#lookbook">Explore the Velora world <ArrowUpRight size={15} /></a></div><div className="story-image image-reveal"><img src={images.story} alt="Close portrait of a man wearing a charcoal Velora jacket" /><span>Material / 01</span></div></section>
      <section id="lookbook" className="lookbook section-pad page-width"><div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">05</span> Visual Notes</p><h2>THE <em>LOOKBOOK.</em></h2></div><p>Quiet confidence, captured<br />in considered detail.</p></div><div className="lookbook-grid">{[images.look1, images.look2, images.look3, images.look4, images.look5, images.look6].map((image, index) => <button className={`lookbook-item look-${index + 1}`} onClick={() => setLookbookDetail({ image, ...lookbookDetails[index] })} key={`${image}-${index}`} aria-label={`View ${lookbookDetails[index].title}`}><img src={image} alt={lookbookDetails[index].title} /><span>View <ArrowUpRight size={15} /></span></button>)}</div></section>
      <section id="journal" className="quote"><div className="quote-mark">“</div><blockquote>Style begins where<br /><em>imitation ends.</em></blockquote><p className="eyebrow">Velora Journal</p><p>Seasonal perspectives on modern dressing.</p><a className="text-link" href="#newsletter">Read the journal <ArrowRight size={15} /></a></section>
      <section id="visit" className="visit section-pad"><div className="visit-inner page-width"><div className="visit-copy reveal"><p className="eyebrow"><span className="section-number">06</span> The Studio</p><h2>COME<br /><em>SEE US.</em></h2><p>Experience VELORA in person. Discover our collections, textures, and signature pieces at our studio.</p><div className="visit-details"><strong>VELORA STUDIO</strong><span>Coimbatore, Tamil Nadu</span><span>Monday–Saturday · 10:00 AM — 8:00 PM</span></div><div className="visit-actions"><a className="button button-dark" href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a><a className="text-link" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={15} /></a></div></div><div className="map-card reveal"><div className="map-lines"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><span className="map-road road-four" /></div><div className="map-pin"><MapPin size={20} fill="currentColor" /><span>VELORA<br /><small>STUDIO</small></span></div><span className="map-label map-label-one">Gandhipuram</span><span className="map-label map-label-two">RS Puram</span><span className="map-coordinates">11.0168° N<br />76.9558° E</span></div></div></section>
      <section id="newsletter" className="newsletter"><div className="newsletter-inner page-width reveal"><div><p className="eyebrow eyebrow-gold">The Inner Circle</p><h2>STAY IN <em>THE KNOW.</em></h2></div><div className="newsletter-form-wrap"><p>New collections, considered stories, and selected releases — delivered occasionally.</p>{subscribed ? <div className="subscribed"><Check size={17} /> You're on the list.</div> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><label><span className="sr-only">Email address</span><input required type="email" placeholder="Your email address" /></label><button type="submit">Subscribe <ArrowUpRight size={15} /></button></form>}<span className="form-note">No noise. Just the good stuff.</span></div></div></section>
    </main>
    <footer className="footer"><div className="footer-main page-width"><div className="footer-brand"><Logo light /><p>Modern menswear<br />for a distinctive presence.</p><a className="back-top" href="#top">Back to top <ArrowUpRight size={15} /></a></div><div className="footer-links"><div><p className="eyebrow eyebrow-gold">Explore</p><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#lookbook">Lookbook</a></div><div><p className="eyebrow eyebrow-gold">Connect</p><a href="#journal">Journal</a><a href="#visit">Contact</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Instagram size={12} /></a></div><div className="footer-symbol"><span>V</span></div></div></div><div className="footer-bottom page-width"><span>© 2026 VELORA. ALL RIGHTS RESERVED.</span><span>MADE FOR THE DISTINCTIVE.</span></div></footer>
    <a className="whatsapp" href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="Chat with Velora on WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="WhatsApp" /></a>
    {enquiry && <div className="modal-backdrop" onClick={() => setEnquiry(null)}><div className="enquiry-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setEnquiry(null)} aria-label="Close"><X size={18} /></button><p className="eyebrow">Private appointment</p><h2>{enquiry}</h2><p>Leave your details and our studio team will be in touch to arrange your private viewing.</p><form onSubmit={(event) => { event.preventDefault(); setEnquiry(null) }}><input required placeholder="Your name" /><input required type="email" placeholder="Your email address" /><button className="button button-dark" type="submit">Request details <ArrowRight size={15} /></button></form></div></div>}
    {lookbookDetail && <div className="modal-backdrop" onClick={() => setLookbookDetail(null)}><div className="lookbook-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setLookbookDetail(null)} aria-label="Close"><X size={18} /></button><img src={lookbookDetail.image} alt={lookbookDetail.title} /><div className="lookbook-modal-copy"><p className="eyebrow">{lookbookDetail.category}</p><h2>{lookbookDetail.title}</h2><p>{lookbookDetail.note}</p><div><strong>{lookbookDetail.price}</strong><button className="text-link text-button" onClick={() => { const selectedImage = lookbookDetail.image; setLookbookDetail(null); openProductDetail(lookbookDetail.title, selectedImage) }}>Explore piece <ArrowRight size={15} /></button></div></div></div></div>}
    {productDetail && <div className="modal-backdrop" onClick={() => setProductDetail(null)}><div className="product-detail-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setProductDetail(null)} aria-label="Close"><X size={18} /></button><div className="product-viewer" onPointerDown={(event) => setDragStart(event.clientX)} onPointerMove={(event) => rotateFromDrag(event.clientX)} onPointerUp={() => setDragStart(null)} onPointerLeave={() => setDragStart(null)}><img src={productDetail.gallery[rotationIndex]} alt={`${productDetail.name} view ${rotationIndex + 1}`} /><span className="viewer-index">0{rotationIndex + 1} / 03</span><span className="drag-hint">Drag to view 360°</span><div className="viewer-controls"><button onClick={() => setRotationIndex((rotationIndex + productDetail.gallery.length - 1) % productDetail.gallery.length)} aria-label="Previous product view">←</button><button onClick={() => setRotationIndex((rotationIndex + 1) % productDetail.gallery.length)} aria-label="Next product view">→</button></div></div><div className="product-detail-copy"><p className="eyebrow">{productDetail.category} / VELORA EDIT</p><h2>{productDetail.name}</h2><p className="product-detail-description">Refined proportion, considered texture, and an ease designed for the everyday.</p><strong className="product-detail-price">{productDetail.price}</strong><div className="product-thumbs">{productDetail.gallery.map((image, index) => <button className={rotationIndex === index ? 'active' : ''} onClick={() => setRotationIndex(index)} key={`${image}-${index}`}><img src={image} alt={`View ${index + 1}`} /></button>)}</div><button className="button button-dark product-enquiry" onClick={() => { setProductDetail(null); setEnquiry(productDetail.name) }}>Add to enquiry <ArrowUpRight size={15} /></button><span className="detail-note">Manual view only. Drag or use the arrows to explore.</span></div></div></div>}
  </div>
}

export default App
