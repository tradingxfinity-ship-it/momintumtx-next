import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const posts = [
  {
    category: 'Hobby News',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'Fanatics Fest 2026 Brings the Sports Card Hobby Into the Mainstream',
    excerpt: 'Tens of thousands of collectors, athletes, and dealers packed the floor — including a rare public display of grails like the 1952 Mantle and T206 Wagner.',
    author: 'Momintum Team',
    date: 'Jun 24, 2026',
    readTime: '7 min read',
    thumb: { type: 'photo', src: '/store-1.jpg', overlay: 'from-brand-navy-dark/70 via-brand-navy-dark/20 to-transparent' },
    content: [
      { type: 'p', text: 'The sports card hobby took another major step toward mainstream recognition at Fanatics Fest 2026, an event that attracted tens of thousands of collectors, athletes, dealers, content creators, grading companies, and hobby businesses under one roof. While autograph signings and celebrity appearances were major attractions, one of the biggest highlights was an extraordinary display of some of the most valuable and historically significant sports cards ever produced.' },
      { type: 'p', text: 'Collectors were given the rare opportunity to see legendary cards such as the 1952 Topps Mickey Mantle, the iconic T206 Honus Wagner, and several other hobby "grails" displayed together. Many of these cards have sold for millions of dollars in recent years and are rarely exhibited publicly due to their immense value and the security required to protect them. For many attendees, seeing these historic collectibles in person was comparable to visiting a museum filled with priceless works of art.' },
      { type: 'p', text: 'The convention floor buzzed with nonstop activity throughout the weekend. Major grading companies including PSA, Beckett, and CGC welcomed thousands of collectors looking to submit cards, discuss grading standards, or simply learn more about card preservation. Dealers from across the country filled hundreds of booths with vintage baseball cards, modern NBA rookie cards, NFL patch autographs, Pokémon collectibles, and sealed wax products dating back decades.' },
      { type: 'p', text: "One of the event's defining features was the growing crossover between sports, entertainment, and collecting. Current and former professional athletes participated in autograph sessions, live interviews, and pack-opening events, giving fans unique opportunities to interact with their favorite stars. Many athletes also shared stories about collecting cards themselves, helping reinforce the hobby's appeal to both longtime enthusiasts and newcomers." },
      { type: 'p', text: "Live card breaks remained one of the weekend's biggest attractions. Large crowds gathered around breaking stages to watch collectors open premium products from Topps, Panini, Upper Deck, and Bowman in search of rare autograph cards, one-of-one parallels, and valuable rookie cards. Every time a major hit was pulled, excitement spread quickly across social media platforms, with clips generating hundreds of thousands of views within hours." },
      { type: 'p', text: 'Educational panels also played a significant role throughout the convention. Industry experts discussed topics such as grading strategies, counterfeit detection, long-term investment trends, card preservation techniques, and the impact of licensing changes within the hobby. These sessions attracted collectors of all experience levels, from beginners purchasing their first cards to seasoned investors managing collections worth hundreds of thousands of dollars.' },
      { type: 'p', text: 'Another noticeable trend was the growing influence of technology. Mobile marketplace apps, AI-powered pricing tools, and digital inventory management systems were showcased throughout the convention, demonstrating how technology continues to modernize collecting. Many vendors accepted instant digital payments, while collectors used real-time market data to negotiate deals directly on the convention floor.' },
      { type: 'p', text: 'The success of Fanatics Fest 2026 highlights how dramatically the sports card industry has evolved over the past several years. What was once considered a niche hobby has grown into a global collectibles market worth billions of dollars. Attendance numbers, vendor participation, and media coverage all suggest that interest in sports cards remains exceptionally strong despite fluctuations in the broader economy.' },
      { type: 'p', text: 'For longtime collectors, the event reinforced the importance of preserving hobby history while embracing innovation. For newcomers, it served as the perfect introduction to the excitement, community, and investment opportunities that continue to fuel one of the fastest-growing segments of the collectibles industry. As Fanatics continues investing heavily in the hobby, many expect future editions of Fanatics Fest to become even larger and more influential.' },
    ],
  },
  {
    category: 'New Releases',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    title: '2026 Bowman Baseball Ignites Another Prospect-Chasing Frenzy',
    excerpt: "Bowman's annual prospect rush is back — first cards of future stars, Chrome autos, Superfractors, and the race to spot tomorrow's MVP before everyone else.",
    author: 'Momintum Team',
    date: 'Jul 15, 2026',
    readTime: '6 min read',
    thumb: { type: 'photo', src: '/store-6.jpg', overlay: 'from-emerald-900/60 via-transparent to-transparent' },
    content: [
      { type: 'p', text: 'The release of 2026 Bowman Baseball has once again become one of the most anticipated events of the sports card calendar, drawing tremendous excitement from collectors, investors, hobby shops, and online breakers around the world. Bowman has long been recognized as the premier brand for prospect collectors, offering fans their first officially licensed cards of baseball’s future stars before they reach the Major League level.' },
      { type: 'p', text: 'Within hours of release day, hobby stores across North America reported strong customer turnout as collectors lined up early to purchase hobby boxes and jumbo boxes. Online retailers quickly experienced inventory shortages as demand exceeded expectations, while sealed boxes immediately began selling above their suggested retail prices on secondary marketplaces.' },
      { type: 'p', text: 'Much of the excitement centers around the highly coveted 1st Bowman logo. For collectors, a player’s first Bowman card often represents the earliest opportunity to invest in a future superstar. History has repeatedly shown that players who eventually become MVP candidates or Hall of Fame-caliber talents often see enormous increases in the value of their earliest Bowman cards.' },
      { type: 'p', text: "This year's checklist features an impressive mix of international prospects, recent MLB Draft selections, and highly regarded minor league talent. Collectors have spent months researching scouting reports, player development rankings, and organizational depth charts in an effort to identify future stars before their values increase. Some hobbyists even compare prospect collecting to investing in startup companies, where identifying talent early can lead to substantial long-term returns." },
      { type: 'p', text: 'Live box breaks have become one of the biggest drivers behind the product’s popularity. Thousands of collectors tuned into livestreams across YouTube, Whatnot, and Fanatics Live to watch breakers open cases filled with Chrome autographs, color parallels, Superfractors, and other ultra-rare inserts. Every time a major autograph surfaced, social media platforms quickly filled with screenshots and discussions about the card’s potential value.' },
      { type: 'p', text: 'Autograph cards remain the primary chase for most collectors. Chrome Prospect Autographs, particularly those featuring low-numbered refractor parallels, continue to command premium prices immediately after release. One-of-one Superfractors remain among the hobby’s ultimate prizes, often generating intense bidding wars whenever they appear on the open market.' },
      { type: 'p', text: 'Industry analysts also point to Bowman as one of the few products that consistently rewards patient collectors. Many of today’s most valuable modern baseball cards originally entered the market as inexpensive Bowman prospect cards years before the players achieved stardom. Early Bowman cards of stars like Aaron Judge, Julio Rodríguez, Bobby Witt Jr., Elly De La Cruz, and Gunnar Henderson have appreciated dramatically as those players established themselves in Major League Baseball.' },
      { type: 'p', text: 'Grading activity has also surged following the release. Thousands of collectors have begun submitting their best pulls to PSA, Beckett, and CGC in hopes of receiving Gem Mint grades that could significantly increase resale values. High-grade examples of key prospects often command substantial premiums compared to raw copies, making grading an essential part of many collectors’ strategies.' },
      { type: 'p', text: 'Despite concerns about modern print runs, hobby experts continue to believe Bowman occupies a unique position within the sports card industry. Its reputation for introducing future stars has remained remarkably consistent for decades, making each annual release one of the safest long-term products for prospect-focused collectors.' },
      { type: 'p', text: 'As baseball continues producing exciting young talent from around the world, Bowman remains at the center of prospect collecting. Whether someone is opening boxes for entertainment, investing in tomorrow’s stars, or building a personal collection, the 2026 release has once again proven why Bowman continues to dominate one of the hobby’s most exciting categories.' },
    ],
  },
  {
    category: 'Market Watch',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'Shohei Ohtani Continues to Dominate the Sports Card Market in 2026',
    excerpt: "From PSA 10 rookies to one-of-one parallels, Ohtani's global appeal keeps him at the top of the modern card market — one of the safest long-term names in the hobby.",
    author: 'Momintum Team',
    date: 'Jul 21, 2026',
    readTime: '6 min read',
    thumb: { type: 'photo', src: '/store-9.jpg', overlay: 'from-purple-900/60 via-transparent to-transparent' },
    content: [
      { type: 'p', text: 'Few athletes have transformed the sports card industry quite like Shohei Ohtani, whose extraordinary career continues to drive unprecedented demand across virtually every segment of the hobby. As one of baseball’s most recognizable global superstars, Ohtani has become a cornerstone of modern sports card collecting, with his rookie cards, autographs, and limited-edition releases consistently ranking among the most valuable contemporary collectibles.' },
      { type: 'p', text: 'Throughout 2026, collectors have continued aggressively pursuing Ohtani cards across auction platforms, hobby shops, online marketplaces, and major card shows. Dealers consistently report that Ohtani inventory sells quickly regardless of price point, while premium graded examples often receive multiple offers shortly after being listed.' },
      { type: 'p', text: 'What makes Ohtani particularly unique is that his success extends well beyond traditional baseball fans. His ability to excel as both an elite hitter and pitcher has earned worldwide recognition, attracting collectors from Japan, the United States, and numerous other countries. This global appeal creates a larger buyer pool than many other athletes enjoy, contributing to consistently strong demand.' },
      { type: 'p', text: "Rookie cards remain the foundation of Ohtani's market. High-grade PSA 10 examples of his flagship rookie cards continue attracting significant attention whenever they become available. Collectors also actively seek Chrome refractors, serial-numbered parallels, on-card autographs, game-used memorabilia cards, and one-of-one releases featuring unique designs." },
      { type: 'p', text: 'Auction houses have reported steady interest in premium Ohtani cards throughout the year. Competitive bidding remains common for low-population graded cards, particularly those featuring perfect centering, sharp corners, and strong eye appeal. Population reports from grading companies continue influencing prices, with scarcer high-grade examples commanding substantial premiums.' },
      { type: 'p', text: "Beyond rookie cards, collectors have shown increasing interest in Ohtani's newest releases from Topps and Bowman. Limited-print parallels and autograph variations often sell out rapidly, reflecting the confidence many buyers have in his long-term collectability. Even base cards from flagship releases frequently outperform comparable cards featuring many other current MLB stars." },
      { type: 'p', text: "The continued strength of Ohtani's market reflects broader trends within sports collecting. Today's hobby increasingly rewards athletes who combine elite performance, historical significance, international popularity, and strong personal branding. Ohtani checks every one of those boxes, making him one of the safest long-term investments in modern sports cards according to many analysts." },
      { type: 'p', text: 'Content creators have also contributed to the momentum surrounding Ohtani collectibles. YouTube channels, podcasts, TikTok creators, and hobby newsletters regularly feature market updates, grading submissions, and major auction results involving his cards. Every notable sale generates fresh discussion among collectors, helping maintain visibility across the hobby.' },
      { type: 'p', text: "Looking ahead, many collectors believe Ohtani's legacy is still being written. Continued success on the field, additional awards, and future postseason achievements could further strengthen demand for his cards over the coming years. While no investment is guaranteed, many hobby experts consider Shohei Ohtani one of the defining athletes of the modern collecting era, with a card market that continues to set the standard for contemporary sports collectibles." },
    ],
  },
  {
    category: 'Collecting Tips',
    categoryColor: 'bg-brand-yellow text-brand-navy-dark',
    title: 'How to Evaluate Graded Cards Before You Buy',
    excerpt: "PSA, BGS, SGC — not all grading companies are equal. Here's what to look for in a slab before spending your money on the secondary market.",
    author: 'Momintum Team',
    date: 'Apr 18, 2025',
    readTime: '8 min read',
    thumb: { type: 'photo', src: '/store-3.jpg', overlay: 'from-brand-navy-dark/70 via-brand-navy-dark/20 to-transparent' },
    content: [
      { type: 'p', text: "Graded cards have become one of the most popular ways to buy and sell high-value collectibles — but not every slab is created equal. Whether you're shopping at a card show, browsing eBay, or picking up a slab at Momintum, knowing what to look for can save you hundreds or even thousands of dollars. The graded card market has matured significantly over the past five years, and buyers today need to be more informed than ever." },
      { type: 'h3', text: 'Know the Grading Companies' },
      { type: 'p', text: "PSA (Professional Sports Authenticator) is the gold standard for most collectors. Their graded cards tend to carry the highest resale value and are the most recognized worldwide. BGS (Beckett Grading Services) is known for their subgrades — they score centering, corners, edges, and surface separately, giving you a Pristine 10 or Black Label 10 for truly flawless cards. SGC is growing fast and tends to have faster turnaround times with competitive pricing, making them a favorite for vintage sports cards." },
      { type: 'p', text: "There are also newer companies like HGA (Hybrid Grading Approach) and TAG that have carved out niches with collectors who want alternatives. However, for resale purposes, PSA remains king. Unless you're buying a card specifically for your personal collection and plan to hold it long term, stick to PSA or BGS graded cards for the best liquidity." },
      { type: 'tip', text: "Pro Tip: A PSA 10 typically commands a 2–4x premium over a raw card in similar condition. Always check recent sold comps on eBay before buying — not asking prices, actual completed sales." },
      { type: 'h3', text: 'Check the Slab Itself' },
      { type: 'p', text: "Before you even look at the grade, inspect the physical case. Look for cracks, scratches, yellowing, or fogging on the plastic — these can affect resale value even if the card inside is perfect. A cracked slab is a red flag. While the card inside may still be authentic and graded, a damaged case will require cracking it out and resubmitting if you ever want to resell at full value." },
      { type: 'p', text: "Also verify that the label is properly aligned and that the certification number on the label matches the grading company's online registry. Both PSA and BGS have free cert verification tools on their websites. Type in the number and confirm that the card description, grade, and year all match what's on the physical slab. This is the single most reliable way to spot counterfeit slabs, which unfortunately are becoming more sophisticated." },
      { type: 'h3', text: 'Look Up the Population Report' },
      { type: 'p', text: "Every major grading company publishes a population report (pop report) showing how many copies of a card have received each grade. A PSA 10 Charizard with a pop of 500 is a very different purchase than one with a pop of 10. Low-pop grades on key cards can carry significant premiums because true scarcity drives collector demand." },
      { type: 'p', text: "Pay attention to the ratio of 10s to 9s. A card where PSA 10s make up 40% of submissions is much more achievable than one where only 2% of copies make 10. High 10 rates mean PSA 10s are more attainable and generally trade at lower premiums over 9s. Low 10 rates create genuine scarcity and justify higher prices for 10-grade copies." },
      { type: 'h3', text: 'Centering Matters More Than You Think' },
      { type: 'p', text: "Even within the same numeric grade, centering varies significantly. A PSA 9 with 55/45 centering looks dramatically cleaner than one at 72/28. For display purposes and long-term resale, cards with tighter centering hold their value better. When buying in person — like at Momintum — always ask to hold the slab at different angles under good lighting. Print lines, surface scratches, and whitening on corners become much more visible this way." },
      { type: 'h3', text: 'Understand What You Are Actually Paying For' },
      { type: 'p', text: "A graded card's value comes from three things: the card itself, the grade it received, and the grading company's brand. If any one of those three is weak, the value suffers. A PSA 6 of a low-demand card isn't worth much. A PSA 10 of a massive key card is worth a fortune. A BGS 9.5 can actually be worth more than a PSA 10 on certain vintage cards where BGS is more respected." },
      { type: 'tip', text: "Before buying any graded card over $200, spend 15 minutes looking at recent eBay sold listings for that exact card, grade, and grading company. Price memory is short in this hobby and values can shift fast." },
      { type: 'p', text: "At Momintum, our team carefully evaluates every graded card that comes through the door. We buy and sell graded cards daily and are happy to walk you through any slab in our inventory. Come in, ask questions, and let us help you make a confident purchase." },
    ],
  },
  {
    category: 'Pokémon TCG',
    categoryColor: 'bg-orange-100 text-orange-700',
    title: 'Pokémon Base Set: Still Worth Collecting in 2025?',
    excerpt: 'The original 102-card set that started it all. We break down which Base Set cards are still climbing in value and which ones have peaked.',
    author: 'Momintum Team',
    date: 'Apr 10, 2025',
    readTime: '7 min read',
    thumb: { type: 'card', bg: 'from-orange-500 to-red-700', src: 'https://images.pokemontcg.io/base1/4.png' },
    content: [
      { type: 'p', text: "It's been almost 30 years since Pokémon Base Set hit shelves in 1999, and the question we get asked more than almost any other at Momintum is this: is it still worth collecting? The short answer is yes — but you need to be strategic about which cards you chase and at what price points. Base Set is no longer a hidden gem. It's a well-understood market, and that cuts both ways." },
      { type: 'h3', text: "Shadowless vs. Unlimited: What's the Difference?" },
      { type: 'p', text: "Base Set Pokémon cards came in a few distinct print runs that matter enormously for value. The 1st Edition print (marked with the stamp on the left side of the card art) is the rarest and most valuable. Shadowless cards — the second print run, without a drop shadow on the artwork box — are significantly rarer than the mass-produced Unlimited run. Unlimited cards have the characteristic shadow on the right and bottom edges of the artwork frame." },
      { type: 'p', text: "A raw Shadowless Charizard in Near Mint condition can fetch $800–$1,500+ while an Unlimited copy in similar condition might go for $150–$300. The 1st Edition version of the same card is in an entirely different tier — PSA 10 copies have sold for over $300,000 at auction." },
      { type: 'tip', text: "Quick check: Look at the artwork box on the card. No shadow on the right and bottom edges means Shadowless. Shadowless cards also tend to have slightly brighter, more saturated colors. The 1st Edition stamp appears in the lower left of the artwork frame." },
      { type: 'h3', text: 'The Cards Still Worth Buying' },
      { type: 'p', text: "Charizard is the obvious king, but other holos have shown consistent long-term growth in high grades. Blastoise and Venusaur — the other two starter evolutions — are perennial favorites. Mewtwo has enormous name recognition and broad appeal beyond just Pokémon collectors. Ninetales, Clefairy, and Gyarados have dedicated collector bases and remain undervalued relative to their cultural significance." },
      { type: 'p', text: "Non-holo rares like Scyther, Jolteon, and Vaporeon are often overlooked but hold steady demand from set completionists. For budget collectors, completing the full Unlimited set in raw Near Mint condition is still achievable and represents an excellent long-term hold." },
      { type: 'h3', text: 'What Has Peaked?' },
      { type: 'p', text: "The 2020–2021 pandemic boom pushed many common Base Set cards to unsustainable highs. Energy cards, trainer cards, and non-holo commons have largely returned to pre-pandemic levels or below. Bulk common and uncommon cards that were briefly selling for $5–$10 each have corrected significantly. We'd focus buying power on the iconic holos and 1st Edition cards where condition still dramatically impacts price." },
      { type: 'h3', text: 'Raw vs. Graded' },
      { type: 'p', text: "For Base Set holos in NM or better condition, grading almost always makes financial sense. The premium on a PSA 10 over a raw card can be enormous — sometimes 5x or more on key holos. The risk is that Base Set cards are notoriously difficult to grade due to print quality issues of the era. Whitening on card backs, print lines, and centering problems were common right off the press." },
      { type: 'p', text: "If you find a raw Base Set holo that appears to be in strong Near Mint condition, it may be worth getting a professional opinion before submitting. Stop by Momintum — we handle grading submissions regularly and can give you an honest read on whether a card is likely to grade out." },
      { type: 'tip', text: "Storage matters: Base Set cards are 25+ years old. Store them in penny sleeves inside hard top loaders or semi-rigid holders, away from direct sunlight and humidity. Improper storage can take a Gem Mint card to a PSA 7 in a matter of years." },
      { type: 'p', text: "Whether you're chasing Charizards or building out a master set, Base Set remains one of the most rewarding corners of the Pokémon hobby. The nostalgia factor is real, the demand is global, and the cards have proven their staying power over nearly three decades." },
    ],
  },
  {
    category: 'Market Trends',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    title: 'Why Sports Card Values Are Rising Again in 2025',
    excerpt: "After a correction in 2022, the sports card market is showing strong signs of recovery. Here's what's driving prices up and what to buy now.",
    author: 'Momintum Team',
    date: 'Mar 28, 2025',
    readTime: '9 min read',
    thumb: { type: 'photo', src: '/store-5.jpg', overlay: 'from-emerald-900/60 via-transparent to-transparent' },
    content: [
      { type: 'p', text: "If you were collecting sports cards during the 2020–2021 bubble and got burned by the correction, you're not alone. Prices across virtually every sport and player crashed hard through 2022 and into 2023. But if you've been paying attention to the market in the past 12 months, you've noticed something: the recovery is real, it's consistent, and it's building momentum." },
      { type: 'h3', text: 'What Caused the Correction?' },
      { type: 'p', text: "The pandemic created a perfect storm for the sports card hobby. Stimulus money, boredom, nostalgia, celebrity endorsements, and a massive wave of new collectors all flooded the market simultaneously. Card manufacturers responded by dramatically increasing print runs, which flooded supply just as speculative demand was cooling. When sports came back, life normalized, and discretionary spending tightened, prices corrected hard. Many cards lost 60–80% of their 2021 peak values. It was a painful but necessary reset." },
      { type: 'h3', text: 'Why the Recovery Is Different This Time' },
      { type: 'p', text: "What's driving prices up now is fundamentally different from 2021. The speculative flippers chasing quick profits are mostly gone. The collectors who remained through the correction are serious, knowledgeable hobbyists focused on players they genuinely follow and cards they actually want to own. This is healthier demand — slower, steadier, and more durable." },
      { type: 'p', text: "On-card rookie autos, low-numbered parallels, and key vintage cards are leading the recovery because there's real scarcity and collector passion behind them. These aren't cards being bought because a celebrity tweeted about them. They're being bought by people who love the hobby." },
      { type: 'tip', text: "Market watch: NFL rookie cards from the 2022–2024 classes are currently undervalued compared to historical norms. With several breakout stars emerging across multiple teams, now is an excellent entry window before the market fully prices in their performance." },
      { type: 'h3', text: 'Basketball Leads the Charge' },
      { type: 'p', text: "NBA cards, particularly Prizm and Select, are seeing the strongest price movement in 2025. The combination of global basketball fandom, a surge in international buyers from Europe and Southeast Asia, and a new generation of superstar players is pushing demand higher. Victor Wembanyama rookie cards have already become some of the most sought-after in years, and he's only scratched the surface of his potential." },
      { type: 'p', text: "Luka Dončić, Jayson Tatum, and Anthony Edwards cards have all shown strong upward movement. Even established veterans like LeBron James and Kevin Durant continue to hold value as their legacies solidify." },
      { type: 'h3', text: 'Baseball Is Quietly Strong' },
      { type: 'p', text: "While basketball gets most of the headlines, baseball cards have quietly been some of the most consistent performers. Vintage cards — pre-1975 Hall of Famers in mid-grade — have barely dipped from their highs and continue to attract serious collector money. Modern baseball has strong bright spots too: Juan Soto, Gunnar Henderson, and Jackson Holliday rookie cards are attracting significant attention." },
      { type: 'h3', text: 'What to Buy Right Now' },
      { type: 'p', text: "Focus on on-card autos of proven players over sticker autos — the market has consistently rewarded on-card signatures with a premium. Buy low-numbered parallels (/25, /10, /5, /1) of players you believe in long term. Numbered parallels of true superstars are among the most liquid assets in the hobby. For vintage, pre-1970 Hall of Famers in PSA 5–7 remain excellent values compared to their historical significance." },
      { type: 'tip', text: "Budget tip: You don't need to spend thousands to participate in the market recovery. A /25 rookie auto of a breakout player from last year's class can be had for $50–$200 and has serious upside if the player develops." },
      { type: 'p', text: "Come talk to our team at Momintum. We track the sports card market daily, handle grading submissions, and stock a carefully curated selection of sports cards across all price points. Whether you're investing or collecting for the love of the game, we'll help you make smart moves." },
    ],
  },
  {
    category: 'One Piece TCG',
    categoryColor: 'bg-red-100 text-red-600',
    title: 'Top One Piece TCG Cards to Watch Right Now',
    excerpt: "One Piece TCG has exploded in popularity. We highlight the chase cards from the latest sets and which pulls are turning heads at our shop.",
    author: 'Momintum Team',
    date: 'Mar 15, 2025',
    readTime: '7 min read',
    thumb: { type: 'spread', bg: 'from-red-900 to-slate-900', cards: ['https://images.pokemontcg.io/fossil/5.png','https://images.pokemontcg.io/base1/15.png','https://images.pokemontcg.io/base1/10.png'] },
    content: [
      { type: 'p', text: "The One Piece Card Game launched internationally in 2022 and has grown into one of the most exciting trading card games in the hobby. With breathtaking alternate art cards, deep competitive gameplay, and one of the most passionate global fanbases in entertainment, OPTCG has carved out a serious place alongside Pokémon and Magic: The Gathering — and we've seen demand at Momintum grow every single month since we started stocking it." },
      { type: 'h3', text: 'Why One Piece TCG Is Exploding' },
      { type: 'p', text: "The One Piece anime and manga have been cultural institutions for over 25 years, with a fanbase spanning multiple generations across every continent. The anime is currently in the middle of one of its most celebrated story arcs, drawing in millions of new viewers weekly. Many of those new fans are discovering the card game simultaneously, creating a wave of demand that Bandai has genuinely struggled to keep up with." },
      { type: 'p', text: "Unlike some TCGs that cater primarily to competitive players, OPTCG has a massive collector segment that buys purely for the artwork. The alternate art cards in this game are genuinely some of the most beautiful illustrations in any trading card game ever printed. That dual appeal — competitive and artistic — is a big reason why the market has sustained growth even between major set releases." },
      { type: 'h3', text: 'The Cards Everyone Wants' },
      { type: 'p', text: "The most coveted cards in the game are the Secret Rare and Parallel Rare alternate art versions of key characters. Monkey D. Luffy, Roronoa Zoro, Nami, and Trafalgar Law cards with alternate artwork consistently fetch $100–$600+ depending on the set and condition. First-print copies of early set Secret Rares have already seen dramatic appreciation as the game's print runs have evolved." },
      { type: 'p', text: "The Treasure Cup promos and Championship event exclusives are particularly sought after because they're not available through regular retail channels. If you see these in someone's collection, they came from competitive play — and they command serious premiums on the secondary market." },
      { type: 'tip', text: "Hot pick: The OP-09 set 'Emperors in the New World' has several chase cards that are currently underpriced relative to their playability and artwork quality. Worth picking up while supply is still available at retail." },
      { type: 'h3', text: 'Set-by-Set Breakdown' },
      { type: 'p', text: "OP-01 (Romance Dawn) is the foundation set. Original print copies are scarce and continue to appreciate. OP-02 (Paramount War) introduced some of the most competitive staples in the game. OP-04 (Kingdoms of Intrigue) contains several of the most visually stunning alternate art cards in the entire catalog. If you find sealed product from these early sets, hold it." },
      { type: 'h3', text: 'Sealed Product as an Investment' },
      { type: 'p', text: "Sealed booster boxes of early sets (OP-01 through OP-04) have already seen significant appreciation on the secondary market. Boxes that retailed for $90 are now trading at $200–$400+ depending on the set. If you can find sealed product from these sets at or near original retail, they represent strong long-term holds as existing supply is cracked open and new supply becomes impossible to produce." },
      { type: 'h3', text: 'Playing vs. Collecting' },
      { type: 'p', text: "One of the best things about OPTCG is that it's a genuinely deep, strategic card game — not just a collectible. Our Friday night One Piece events draw a growing and dedicated competitive crowd. Decks are relatively affordable compared to other TCGs, making it accessible for new players. Whether you're in it for the gameplay, the art, or the investment angle — or all three — there has never been a better time to get involved with One Piece TCG." },
      { type: 'tip', text: "New to the game? Our staff can walk you through the basics and help you build a competitive starter deck without breaking the bank. Come in on a Tuesday or Wednesday when we're less busy and we'll take the time to show you the ropes." },
    ],
  },
  {
    category: 'Selling Guide',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'How to Sell Your Card Collection for Maximum Value',
    excerpt: "Thinking about selling? We walk you through how to organize, price, and present your collection so you walk out with the best possible offer.",
    author: 'Momintum Team',
    date: 'Mar 5, 2025',
    readTime: '10 min read',
    thumb: { type: 'photo', src: '/store-2.jpg', overlay: 'from-purple-900/60 via-transparent to-transparent' },
    content: [
      { type: 'p', text: "Selling a card collection can feel overwhelming — especially if you've accumulated cards over many years and aren't sure what you have or what it's worth. At Momintum, we buy collections every single week ranging from small shoeboxes of childhood cards to massive estates worth tens of thousands of dollars. We've put together this guide to help you get the most value out of your cards, whether you sell to us or somewhere else." },
      { type: 'h3', text: 'Step 1: Sort and Organize Before You Come In' },
      { type: 'p', text: "The more organized your collection, the faster and smoother the evaluation process will be — and the better the impression you make. Separate cards by sport or game, then by player or set. Pull out anything that looks valuable: star players, holo foils, numbered parallels, graded slabs, sealed product. Keep these in protective sleeves or top loaders." },
      { type: 'p', text: "First impressions genuinely matter when selling a collection. A seller who arrives with cards neatly organized in binders or sorted boxes signals that they've taken care of their cards and are serious about the transaction. A jumbled box of mixed cards from three different sports takes significantly more time to evaluate, which can affect the offer you receive." },
      { type: 'h3', text: 'Step 2: Do Your Own Research First' },
      { type: 'p', text: "Before walking into any shop, spend 30–60 minutes on eBay searching for your key cards and filtering by 'Sold Listings' — not asking prices, actual completed sales. This gives you a realistic picture of current market value. TCGPlayer is the go-to resource for Pokémon and One Piece singles. COMC and 130point.com are excellent for sports cards. Knowing roughly what your key pieces are worth puts you in a much stronger position." },
      { type: 'tip', text: "Important: Card shops typically offer 40–60% of current market value when buying outright. This is standard industry practice — they need margin to cover operating costs, the time it takes to sell the card, and market risk. An offer in this range from a reputable shop is fair and honest." },
      { type: 'h3', text: 'Step 3: Understand What You Actually Have' },
      { type: 'p', text: "A collection of 5,000 common bulk cards is evaluated very differently than 20 key holo rares. Bulk cards — commons and uncommons with no significant demand — are typically purchased at bulk rates ($5–$15 per thousand cards depending on game and condition). High-value singles are assessed individually. Graded cards in top grades (PSA 9/10, BGS 9.5/10) command premium prices. Raw cards in Near Mint or better condition evaluate best for singles." },
      { type: 'p', text: "Be realistic about condition. A card that looks good to untrained eyes may have whitening, edge wear, or surface scratches that significantly affect its grade and value. Our team will always explain what we're seeing in a card's condition so you understand the evaluation." },
      { type: 'h3', text: 'Step 4: Decide Between Selling and Consignment' },
      { type: 'p', text: "Selling outright gives you cash the same day with no ongoing involvement. Consignment takes longer — typically 30–90 days — but often nets you a higher final price because the card sells at retail rather than wholesale. For high-value individual cards ($500+), consignment is often worth considering. For bulk collections or lower-value singles, outright sale is typically the more practical choice." },
      { type: 'h3', text: 'What to Expect at Momintum' },
      { type: 'p', text: "When you come in to sell, we sit down with you and go through the collection together transparently. We explain how we're evaluating cards and what we're seeing in terms of condition and market demand. We don't lowball — we want you to leave feeling good about the transaction and to come back, or tell your friends about us. Our offers are made on the spot and we pay cash the same day for outright purchases." },
      { type: 'tip', text: "Pro move: Bring comparable eBay sold listings on your phone for your key cards. Not to argue about price, but to have an informed conversation. We welcome that and it makes for a faster, smoother evaluation." },
      { type: 'p', text: "Have questions before you make the trip? DM us on Instagram or use the contact form on this site. We're happy to give you a rough estimate of what a collection might be worth based on a description or photos — no commitment required." },
    ],
  },
  {
    category: 'Events',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'What to Expect at a Friday Night Tournament',
    excerpt: "First time coming to a tournament? Here's everything you need to know — format, entry, prizes, and how to make the most of the night.",
    author: 'Momintum Team',
    date: 'Feb 22, 2025',
    readTime: '6 min read',
    thumb: { type: 'photo', src: '/store-8.jpg', overlay: 'from-blue-900/60 via-transparent to-transparent' },
    content: [
      { type: 'p', text: "Every Friday night at Momintum is tournament night — and if you've never come before, you're genuinely missing one of the best parts of being a card collector in San Antonio. We've been running weekly events since we opened, and what started as a small group of regulars has grown into one of the most active card gaming communities in the city." },
      { type: 'h3', text: 'What Games Do We Run?' },
      { type: 'p', text: "We rotate between Pokémon TCG, One Piece TCG, and special sealed product events depending on the week. Major set releases often come with special draft or sealed tournaments where everyone opens product on site and builds a deck from what they pull — one of the most exciting formats in trading card gaming because the playing field is level regardless of how much you've invested in singles." },
      { type: 'p', text: "Check our Instagram (@momintumtcg and @momintumsportscards) for the specific format each week. We announce the Friday format by Wednesday and always post any special prize support or guest attendance announcements well in advance." },
      { type: 'h3', text: 'Time, Cost, and What to Bring' },
      { type: 'p', text: "Doors open at 6:30 PM and tournament play begins at 7:00 PM sharp. Entry is typically $5–$10 depending on the format — sealed events may cost more to account for product. We recommend arriving by 6:45 PM to register, grab any singles you need, trade with other players, and find your seat before pairings go up." },
      { type: 'p', text: "For constructed formats, bring a legal tournament deck, a damage counter method (dice or counters), and a coin or die for flip effects. Sleeves are required for most competitive formats — KMC, Ultra Pro, or Dragon Shield all work great. Bring water and a light snack if you tend to play long." },
      { type: 'tip', text: "First timer tip: Arrive by 6:40 PM. On set release weeks, spots fill up quickly. If you're unsure about your deck's legality for the current format, come in early and ask our staff — we'd rather clarify before play starts than have awkward rulings mid-round." },
      { type: 'h3', text: 'Format and Structure' },
      { type: 'p', text: "Most of our events run Swiss format — you're paired against players with similar win-loss records each round, which means even if you lose your first round you continue playing and improving your record. There are typically 4–6 rounds depending on attendance, followed by a Top 8 cut for larger events. Prize support is distributed based on final Swiss standing or playoff results." },
      { type: 'p', text: "We run strict timing — usually 30 minutes per round for Pokémon. If time is called, the active turn finishes and then one additional turn is played. Knowing the rules around time is important for competitive play, and our judges are always available to answer questions." },
      { type: 'h3', text: 'The Vibe' },
      { type: 'p', text: "This is the part we're most proud of, and honestly the main reason people keep coming back. Momintum tournaments attract genuinely good people. Veterans teach newer players between rounds. Trades happen organically in the aisles. There's always someone willing to help you think through a deck list or explain a ruling. The competitive players are skilled but not gatekeeping — they were beginners once too." },
      { type: 'p', text: "We maintain a zero-tolerance policy for unsportsmanlike behavior, trash talk, or any conduct that makes another player feel unwelcome. In practice, we've almost never had to enforce it because the culture here simply doesn't allow for that kind of behavior to take root." },
      { type: 'tip', text: "Don't have a competitive deck yet? Come anyway. We often have loaner decks available for first-timers, or you can watch and learn from the sidelines. The best way to learn competitive play is to be in the room where it's happening." },
      { type: 'p', text: "Whether you're an experienced grinder chasing Championship Points or someone who just wants to play cards with other fans on a Friday night, you belong here. Bring your deck, bring your energy, and come ready to have a great time. We'll see you Friday." },
    ],
  },
]

function Thumbnail({ thumb }) {
  if (thumb.type === 'photo') {
    return (
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb.src} alt="" aria-hidden="true" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
        <div className={`absolute inset-0 bg-gradient-to-t ${thumb.overlay}`} />
      </div>
    )
  }
  if (thumb.type === 'card') {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${thumb.bg} flex items-center justify-center relative overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb.src} alt="" aria-hidden="true" className="h-[90%] object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500 ease-out" />
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
      </div>
    )
  }
  if (thumb.type === 'spread') {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${thumb.bg} flex items-center justify-center relative overflow-hidden`}>
        {thumb.cards.map((src, i) => {
          const rotations = [-18, 0, 18]
          const offsets   = [-52, 0, 52]
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" aria-hidden="true"
              style={{ transform: `translateX(${offsets[i]}px) rotate(${rotations[i]}deg)`, zIndex: i === 1 ? 10 : 5 }}
              className="absolute h-[80%] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          )
        })}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
      </div>
    )
  }
  return null
}

function ArticleModal({ post, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-navy-dark/80 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 flex-shrink-0">
          <Thumbnail thumb={post.thumb} />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200 z-10"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
          {/* Category */}
          <div className="absolute bottom-4 left-5">
            <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${post.categoryColor}`}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-6 lg:px-8">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{post.readTime}</span>
          </div>

          <h2 className="font-bebas text-brand-navy-dark text-3xl lg:text-4xl leading-tight tracking-wide mb-6">
            {post.title}
          </h2>

          {/* Article content */}
          <div className="space-y-4 pb-6">
            {post.content.map((block, i) => {
              if (block.type === 'p') return (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">{block.text}</p>
              )
              if (block.type === 'h3') return (
                <h3 key={i} className="font-bebas text-brand-navy-dark text-xl tracking-wide pt-2">{block.text}</h3>
              )
              if (block.type === 'tip') return (
                <div key={i} className="bg-brand-yellow/10 border-l-4 border-brand-yellow rounded-r-xl px-4 py-3">
                  <p className="text-sm text-brand-navy-dark leading-relaxed">{block.text}</p>
                </div>
              )
              return null
            })}
          </div>

          {/* Author footer */}
          <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
            <div className="w-9 h-9 rounded-full bg-brand-navy-dark flex items-center justify-center flex-shrink-0">
              <span className="text-brand-yellow text-xs font-bold">M</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{post.author}</p>
              <p className="text-xs text-slate-400">{post.date}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PostCard({ post, delay, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease, delay }}
      onClick={onClick}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <Thumbnail thumb={post.thumb} />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${post.categoryColor}`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bebas text-brand-navy-dark text-2xl leading-tight tracking-wide mb-2 group-hover:text-brand-navy transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-navy-dark flex items-center justify-center flex-shrink-0">
              <span className="text-brand-yellow text-[9px] font-bold">M</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">{post.author}</p>
              <p className="text-[11px] text-slate-400">{post.date}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-brand-yellow group-hover:underline">Read →</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const [active, setActive] = useState(null)

  return (
    <section id="blog" className="bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4">From The Shop</p>
            <h2 className="font-bebas text-brand-navy-dark leading-none tracking-wide" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Card Talk &amp; <span className="text-brand-navy">Collector Tips</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-400 text-sm max-w-xs md:text-right leading-relaxed"
          >
            Guides, market insights, and news for collectors of all levels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} delay={i * 0.07} onClick={() => setActive(post)} />
          ))}
        </div>
      </div>

      {/* Article modal */}
      <AnimatePresence>
        {active && <ArticleModal post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
