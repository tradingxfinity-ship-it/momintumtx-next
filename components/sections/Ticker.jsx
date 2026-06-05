const items = [
  'Sports Cards', 'Pokémon TCG', 'One Piece TCG', 'Graded Cards',
  'Card Singles', 'Sealed Product', 'Live Breaks', 'Friday Tournaments',
  'Buy · Sell · Trade', 'NBA Cards', 'NFL Cards',
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-brand-yellow py-4 overflow-hidden select-none">
      <div className="flex animate-ticker w-max gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-brand-navy-dark text-xs font-black tracking-[0.12em] uppercase whitespace-nowrap px-6">
              {item}
            </span>
            <span className="text-brand-navy/40 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
