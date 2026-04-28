import { useState, useEffect } from 'react';
import { PlaceholderArt } from './PlaceholderArt';

export interface FeaturedPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  glyph: string;
  accentColor: string;
  readTime: string;
  href: string;
}

interface Props {
  posts: FeaturedPost[];
}

export default function FeaturedCarousel({ posts }: Props) {
  const [idx, setIdx] = useState(0);

  // Autorotación cada 6s; se reinicia si el usuario hace click manual
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % posts.length), 6000);
    return () => clearInterval(id);
  }, [posts.length]);

  const post = posts[idx];

  return (
    <div className="featured">
      <div className="featured-thumbs">
        {posts.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className={`featured-thumb${i === idx ? ' on' : ''}`}
            onClick={() => setIdx(i)}
          >
            <div className="featured-thumb-glyph" style={{ color: p.accentColor }}>
              {p.glyph}
            </div>
            <div className="featured-thumb-title">
              {p.title.length > 38 ? `${p.title.slice(0, 38)}…` : p.title}
            </div>
          </div>
        ))}
      </div>

      <div className="featured-main" key={idx}>
        <div className="featured-stage">
          <PlaceholderArt seed={post.id} accent={post.accentColor} glyph={post.glyph} />
          <div className="featured-badge">DESTACADO</div>
          <div className="featured-tag">{post.tags[0].toUpperCase()}</div>
        </div>
        <div className="featured-info">
          <div className="featured-meta">
            <span>{post.date}</span>
            <span className="meta-dot"></span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="featured-title">{post.title}</h2>
          <p className="featured-desc">{post.description}</p>
          <div className="featured-actions">
            <a href={post.href} className="btn gold">Leer ahora ▶</a>
            <button className="btn">+ Guardar</button>
            <div className="featured-progress">
              {posts.map((_, i) => (
                <div key={i} className={`fpd${i === idx ? ' on' : ''}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
