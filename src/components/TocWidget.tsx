import { useState, useEffect } from 'react';

export interface TocItem {
  id: string;
  num: string;
  text: string;
  depth: number;
}

interface Props {
  items: TocItem[];
}

// TOC sticky con heading activo + barra de progreso de lectura
export default function TocWidget({ items }: Props) {
  const [activeId,  setActiveId]  = useState(items[0]?.id ?? '');
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc   = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);

      // El heading activo es el último cuya parte superior ya pasó el viewport
      let active = items[0]?.id ?? '';
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - 120 <= 0) active = item.id;
      }
      setActiveId(active);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <>
      <div className="toc">
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`toc-item${item.id === activeId ? ' active' : ''}`}
          >
            <span className="toc-num">{item.num}</span>
            <span className="toc-text">{item.text}</span>
            {item.id === activeId && <span className="toc-marker">▶</span>}
          </a>
        ))}
      </div>

      <div className="reading-progress">
        <div className="reading-progress-hdr">
          <span>Progreso</span>
          <span className="rp-val">{Math.round(progress)}%</span>
        </div>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${progress}%` }} />
          <div className="bar-ticks">
            {Array.from({ length: 20 }).map((_, i) => <span key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
}
