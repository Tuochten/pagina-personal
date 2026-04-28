import { useState, useEffect } from 'react';

// Barra de 2px bajo la nav — se llena al hacer scroll
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc   = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
