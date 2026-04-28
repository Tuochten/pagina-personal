import { useState } from 'react';

const INITIAL = [
  { key: '✦',  label: 'Útil',       count: 23 },
  { key: '🔧', label: 'Aplicable',  count: 11 },
  { key: '⚡', label: 'Rápido',     count:  7 },
  { key: '♥',  label: 'Me encantó', count: 18 },
];

// Contadores hardcoded por ahora — en producción vendrían de un endpoint
export default function Reactions() {
  const [counts, setCounts] = useState(
    () => Object.fromEntries(INITIAL.map(r => [r.key, r.count]))
  );
  const [picked, setPicked] = useState<string | null>(null);

  const handleClick = (key: string) => {
    if (picked === key) return;
    setCounts(prev => ({
      ...prev,
      [key]: prev[key] + 1,
      ...(picked ? { [picked]: prev[picked] - 1 } : {}),
    }));
    setPicked(key);
  };

  return (
    <div className="reactions">
      <div className="reactions-label">¿Qué te pareció este post?</div>
      <div className="reactions-row">
        {INITIAL.map(r => (
          <button
            key={r.key}
            className={`react-btn${picked === r.key ? ' on' : ''}`}
            onClick={() => handleClick(r.key)}
          >
            <span className="react-icon">{r.key}</span>
            <span className="react-lbl">{r.label}</span>
            <span className="react-count">{counts[r.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
