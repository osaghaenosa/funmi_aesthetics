const items = ['Fashion', 'Shoes & Footwear', 'Statement Bags', 'Home Decor', 'Appliances', 'Worldwide Shipping', 'Men & Women'];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-ink py-3.5 overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.16em] uppercase text-champagne mr-14">
            {item}
            <span className="text-[0.5rem]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
