'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, MessageCircle, Quote, Sparkles, X } from 'lucide-react'
import { categoryLabel, items, translations, whatsappUrl, type Locale, type PartyItem } from '@/lib/content'

const localeNames: Record<Locale, string> = { pt: 'PT', es: 'ES', en: 'EN' }
const logoImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QXVQaseytHvQ7w9G0EiiMHF9oI5Twh.png'
const handmadeImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-a0Zs4wWUtsL7upenSLOJs5XJKPNOXk.png'

const testimonials = [
  { quote: { en: 'Everything looked beautiful and exactly how we imagined it. The balloon decorations made the whole party feel so special. Highly recommend Donali Party!', pt: 'Tudo ficou lindo e exatamente como imaginávamos. A decoração com balões deixou a festa ainda mais especial. Recomendo muito a Donali Party!', es: 'Todo quedó hermoso y exactamente como lo imaginábamos. La decoración con globos hizo que la fiesta se sintiera muy especial. ¡Recomiendo mucho a Donali Party!' }, author: 'Maria S.', location: 'Lowell, MA' },
  { quote: { en: 'Donali Party did an amazing job with our decorations! Everything was beautiful, well organized, and the setup was perfect. We loved how everything turned out.', pt: 'A Donali Party fez um trabalho incrível com a nossa decoração! Tudo ficou lindo, organizado e a montagem foi perfeita. Amamos o resultado.', es: '¡Donali Party hizo un trabajo increíble con nuestra decoración! Todo quedó hermoso, bien organizado y el montaje fue perfecto. Nos encantó el resultado.' }, author: 'Jessica R.', location: 'Lowell, MA' },
  { quote: { en: 'I was so happy with how everything came together. The balloons and decorations were beautiful, and they really made the celebration feel complete. Thank you!', pt: 'Fiquei muito feliz com o resultado. Os balões e a decoração ficaram lindos e deixaram a celebração completa. Obrigada!', es: 'Me sentí muy feliz con el resultado. Los globos y la decoración quedaron hermosos y realmente hicieron que la celebración se sintiera completa. ¡Gracias!' }, author: 'Amanda C.', location: 'Dracut, MA' },
  { quote: { en: 'The decorations were absolutely beautiful! Donali Party understood exactly what we wanted and made everything look even better than we expected. We received so many compliments.', pt: 'A decoração ficou absolutamente linda! A Donali Party entendeu exatamente o que queríamos e deixou tudo ainda mais bonito do que esperávamos. Recebemos muitos elogios.', es: '¡La decoración quedó absolutamente hermosa! Donali Party entendió exactamente lo que queríamos e hizo que todo se viera aún mejor de lo esperado. Recibimos muchos cumplidos.' }, author: 'Carolina M.', location: 'Chelmsford, MA' },
  { quote: { en: 'Great service from beginning to end. The decorations looked amazing, everything was set up beautifully, and it made our celebration even more memorable.', pt: 'Um atendimento excelente do começo ao fim. A decoração ficou incrível, tudo foi montado com muito cuidado e nossa celebração ficou ainda mais inesquecível.', es: 'Excelente servicio de principio a fin. La decoración se veía increíble, todo quedó montado hermosamente y nuestra celebración fue aún más memorable.' }, author: 'Sofia L.', location: 'Lowell, MA' },
  { quote: { en: 'The team was kind, creative, and very attentive to every detail. Our celebration looked beautiful and felt truly special.', pt: 'A equipe foi gentil, criativa e muito atenciosa com cada detalhe. Nossa celebração ficou linda e realmente especial.', es: 'El equipo fue amable, creativo y muy atento a cada detalle. Nuestra celebración quedó hermosa y se sintió realmente especial.' }, author: 'Rachel T.', location: 'Tewksbury, MA' },
]

export function PartySite() {
  const [locale, setLocale] = useState<Locale>('pt')
  const [filter, setFilter] = useState<'all' | PartyItem['category'] | PartyItem['audience']>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[locale]
  const filteredItems = useMemo(() => filter === 'all' ? items : items.filter((item) => item.category === filter || item.audience === filter), [filter])
  const chatUrl = whatsappUrl(`${t.hero.cta} — [NOME]`)
  const smsUrl = `sms:55[NUMERO]?body=${encodeURIComponent(`${locale === 'pt' ? 'Olá' : locale === 'es' ? 'Hola' : 'Hello'} — [NOME]`)}`
  const [heroIndex, setHeroIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const heroItems = items.slice(0, 6)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const smsLabel = locale === 'pt' ? 'Enviar SMS' : locale === 'es' ? 'Enviar SMS' : 'Send SMS'

  const itemMessage = (item: PartyItem) => `${t.portfolio.action}: ${item.name[locale]} | ${categoryLabel(item.category, t)} | ${item.description[locale]}`
  const itemUrl = (item: PartyItem) => whatsappUrl(itemMessage(item))
  const itemSmsUrl = (item: PartyItem) => `sms:55[NUMERO]?body=${encodeURIComponent(itemMessage(item))}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-[#3d3145]">
      <header className={`fixed inset-x-0 top-0 z-40 border-b border-[#3d3145]/10 bg-[#fffaf5]/90 backdrop-blur-md transition-shadow duration-500 ${scrolled ? 'shadow-lg shadow-[#3d3145]/5' : ''}`}>
        <div className="bg-[#e85d7b]/10 px-5 py-2.5 text-center text-sm font-medium text-[#3d3145]">
          {t.header.banner}
        </div>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#top" aria-label="Dona Li Party" className="flex items-center"><Image src={logoImage} alt="Dona Li Party Decorações" width={92} height={92} className="size-14 object-contain sm:size-16" /></a>
          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {Object.entries(t.nav).map(([key, value]) => <a key={key} href={`#${key}`} className="nav-link transition-colors hover:text-[#e85d7b]">{value}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-[#3d3145]/15 bg-white p-1" aria-label="Idioma">
              {(Object.keys(localeNames) as Locale[]).map((language) => <button key={language} onClick={() => setLocale(language)} className={`motion-button rounded-full px-2.5 py-1 text-[11px] font-bold transition ${locale === language ? 'bg-[#3d3145] text-white' : 'text-[#3d3145]/55 hover:text-[#3d3145]'}`} aria-pressed={locale === language}>{localeNames[language]}</button>)}
            </div>
            <button className="motion-button rounded-full p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-[#3d3145]/10 bg-[#fffaf5] px-5 py-5 lg:hidden">{Object.entries(t.nav).map(([key, value]) => <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}>{value}</a>)}</nav>}
      </header>

      <section id="top" className="relative px-5 pb-20 pt-36 lg:px-10 lg:pb-32 lg:pt-48">
        <div className="absolute -right-28 top-20 size-72 rounded-full bg-[#f8cf55]/30 blur-3xl" /><div className="absolute -left-32 top-56 size-80 rounded-full bg-[#d9a7d9]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-xl"><p className="eyebrow hero-stagger">{t.hero.eyebrow}</p><h1 className="font-display hero-stagger mt-5 text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-8xl">{t.hero.title}</h1><p className="hero-stagger mt-7 max-w-md text-lg leading-relaxed text-[#3d3145]/70">{t.hero.body}</p><div className="hero-stagger mt-9 flex flex-wrap gap-3"><a href={chatUrl} className="motion-button whatsapp-pulse whatsapp-glow inline-flex items-center gap-2 rounded-full bg-[#e85d7b] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#e85d7b]/20 transition hover:-translate-y-0.5">{t.hero.cta}<ArrowUpRight size={18} /></a><a href="#portfolio" className="motion-button inline-flex items-center gap-2 rounded-full border border-[#3d3145]/20 px-6 py-3.5 font-semibold transition hover:border-[#e85d7b] hover:text-[#e85d7b]">{t.hero.secondary}<ArrowDown size={16} /></a></div></div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none"><div className="hero-image-in hero-float rotate-3 overflow-hidden rounded-[2.5rem] border-[12px] border-white bg-[#f8cf55] shadow-2xl shadow-[#3d3145]/15"><Image src={heroItems[heroIndex].image} alt={heroItems[heroIndex].name[locale]} width={700} height={760} className="aspect-[.92] w-full object-cover" priority /></div><div className="absolute -bottom-6 -left-4 flex items-center gap-2 rounded-2xl bg-white px-5 py-4 shadow-xl"><Sparkles className="text-[#e85d7b]" size={22} /><span className="font-display text-xl font-bold">{t.hero.handmade}</span></div><div className="absolute right-4 top-4 flex gap-2"><button type="button" onClick={() => setHeroIndex((heroIndex - 1 + heroItems.length) % heroItems.length)} aria-label="Imagem anterior" className="motion-button flex size-11 items-center justify-center rounded-full bg-white text-[#3d3145] shadow-lg transition hover:bg-[#e85d7b] hover:text-white"><ArrowLeft /></button><button type="button" onClick={() => setHeroIndex((heroIndex + 1) % heroItems.length)} aria-label="Próxima imagem" className="motion-button flex size-11 items-center justify-center rounded-full bg-white text-[#3d3145] shadow-lg transition hover:bg-[#e85d7b] hover:text-white"><ArrowRight /></button></div><div className="absolute bottom-4 right-5 flex gap-1.5" aria-label="Selecionar imagem">{heroItems.map((item, index) => <button key={item.id} type="button" onClick={() => setHeroIndex(index)} aria-label={`Ver imagem ${index + 1}`} className={`motion-button size-2.5 rounded-full transition ${index === heroIndex ? 'bg-[#e85d7b]' : 'bg-white/80'}`} />)}</div></div>
        </div>
      </section>

      <section className="reveal bg-white px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.categories.eyebrow}</p><h2 className="section-title">{t.categories.title}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{(['rental', 'decoration', 'pickup'] as const).map((category, index) => <a href="#portfolio" key={category} onClick={() => setFilter(category)} className={`motion-button reveal group rounded-3xl p-7 transition hover:-translate-y-1 ${index === 0 ? 'bg-[#f8cf55]' : index === 1 ? 'bg-[#d9a7d9]' : 'bg-[#bde3d7]'}`}><div className="flex items-start justify-between"><span className="font-display text-4xl font-bold">0{index + 1}</span><ArrowUpRight className="transition group-hover:rotate-45" /></div><h3 className="font-display mt-14 text-2xl font-bold">{t.categories[category]}</h3><p className="mt-2 max-w-xs text-[#3d3145]/70">{t.categories[`${category}Body` as keyof typeof t.categories] as string}</p></a>)}</div></div></section>

      <section id="portfolio" className="reveal px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.portfolio.eyebrow}</p><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="section-title">{t.portfolio.title}</h2><div className="flex flex-wrap gap-2">{(['all', 'kids', 'adults', 'rental', 'decoration', 'pickup'] as const).map((key) => <button key={key} onClick={() => setFilter(key)} className={`motion-button rounded-full px-4 py-2 text-sm font-semibold transition ${filter === key ? 'bg-[#3d3145] text-white' : 'bg-white text-[#3d3145]/65 hover:text-[#e85d7b]'}`}>{t.portfolio[key]}</button>)}</div></div><div key={filter} className="portfolio-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredItems.map((item) => <article key={item.id} className="reveal group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#3d3145]/8"><div className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-[#e85d7b]">{categoryLabel(item.category, t)}</p><h3 className="font-display mt-2 text-2xl font-bold">{item.name[locale]}</h3><p className="mt-2 text-sm leading-relaxed text-[#3d3145]/65">{item.description[locale]}</p><div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"><a href={itemUrl(item)} className="inline-flex items-center gap-2 text-sm font-bold text-[#62a997] hover:text-[#e85d7b]">{t.portfolio.action}<ArrowUpRight size={15} /></a><a href={itemSmsUrl(item)} className="inline-flex items-center gap-2 text-sm font-bold text-[#3d3145]/65 hover:text-[#e85d7b]">{t.portfolio.sms}<ArrowUpRight size={15} /></a></div></div></article>)}</div></div></section>

      <section id="how" className="reveal bg-[#3d3145] px-5 py-20 text-white lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.how.eyebrow}</p><h2 className="section-title text-white">{t.how.title}</h2><div className="mt-12 grid gap-10 md:grid-cols-3">{t.how.steps.map((step, index) => <div key={step.title} style={{ transitionDelay: `${index * 140}ms` }} className="reveal how-step relative border-t border-white/20 pt-5"><span className="font-display text-5xl font-bold text-[#f8cf55]">0{index + 1}</span><h3 className="font-display mt-8 text-2xl font-bold text-white">{step.title}</h3><p className="mt-3 max-w-xs leading-relaxed text-white/65">{step.body}</p></div>)}</div></div></section>

      <section id="about" className="px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto flex max-w-3xl flex-col justify-center"><p className="eyebrow">{t.about.eyebrow}</p><h2 className="section-title">{t.about.title}</h2><p className="mt-7 whitespace-pre-line text-lg leading-relaxed text-[#3d3145]/70">{t.about.body}</p><Image src={logoImage} alt="Donali Party" width={180} height={90} className="mt-8 h-auto w-40 object-contain object-left" /><p className="mt-4 font-display text-xl font-bold italic text-[#e85d7b]">{t.about.signature}</p></div></section>

      <section id="testimonials" className="reveal bg-[#bde3d7] px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.testimonials.eyebrow}</p><h2 className="section-title">{t.testimonials.title}</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((testimonial, index) => <article key={testimonial.author} className={`reveal flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm ${index === testimonials.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}><div><Quote className="text-[#e85d7b]" size={30} aria-hidden="true" /><p className="mt-5 text-lg leading-relaxed text-[#3d3145]/80">&ldquo;{testimonial.quote[locale]}&rdquo;</p></div><footer className="mt-7 border-t border-[#3d3145]/10 pt-4"><p className="font-bold">{testimonial.author}</p><p className="text-sm text-[#3d3145]/55">{testimonial.location}</p></footer></article>)}</div></div></section>

      <section id="faq" className="reveal bg-[#f8cf55] px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-4xl"><p className="eyebrow">{t.faq.eyebrow}</p><h2 className="section-title">{t.faq.title}</h2><div className="mt-10 flex flex-col gap-3">{t.faq.questions.map((question) => <details key={question.q} className="reveal group rounded-2xl bg-white px-6 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">{question.q}<ChevronDown className="transition group-open:rotate-180" /></summary><p className="mt-4 max-w-2xl leading-relaxed text-[#3d3145]/70">{question.a}</p></details>)}</div></div></section>

      <section id="contact" className="px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#d9a7d9] p-8 sm:p-12 lg:flex-row lg:items-end lg:p-16"><div><p className="eyebrow">{t.contact.eyebrow}</p><h2 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">{t.contact.title}</h2><p className="mt-5 max-w-lg text-lg text-[#3d3145]/70">{t.contact.body}</p></div><div className="flex flex-wrap gap-3"><a href={chatUrl} className="motion-button whatsapp-glow inline-flex shrink-0 items-center gap-2 rounded-full bg-[#3d3145] px-6 py-3.5 font-semibold text-white transition hover:bg-[#e85d7b]">{t.contact.cta}<MessageCircle size={18} /></a><a href={smsUrl} className="motion-button inline-flex shrink-0 items-center gap-2 rounded-full border border-[#3d3145]/25 bg-white/60 px-6 py-3.5 font-semibold text-[#3d3145] transition hover:border-[#e85d7b] hover:text-[#e85d7b]">{smsLabel}<MessageCircle size={18} /></a></div></div></section>

      <footer className="border-t border-[#3d3145]/10 px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#3d3145]/60 sm:flex-row sm:items-center sm:justify-evenly"><span className="font-display text-xl font-bold text-[#e85d7b]">Donali Party</span><span>{t.footer}</span><a href="https://instagram.com/donali.party" target="_blank" rel="noreferrer" aria-label="Instagram Donali Party" className="text-[#e85d7b] transition hover:scale-110 hover:text-[#d94e6d]"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a></div></footer>
      <a href={chatUrl} aria-label="WhatsApp" className="whatsapp-pulse motion-button fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition hover:scale-105"><MessageCircle size={27} /></a>
    </main>
  )
}

export function CheckIcon() { return <Check size={16} /> }
