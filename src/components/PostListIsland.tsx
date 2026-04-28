import { useStore } from '@nanostores/react';
import { $activeTag, $viewMode } from '../store/posts';
import { PlaceholderArt } from './PlaceholderArt';

export interface PostItem {
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
  posts: PostItem[];
}

function Capsule({ post }: { post: PostItem }) {
  return (
    <a href={post.href} className="capsule">
      <div className="capsule-thumb">
        <PlaceholderArt seed={post.id} accent={post.accentColor} glyph={post.glyph} />
        <div
          className="capsule-tag"
          style={{ borderColor: post.accentColor, color: post.accentColor }}
        >
          {post.tags[0]}
        </div>
        <div className="capsule-glow"></div>
      </div>
      <div className="capsule-body">
        <div className="capsule-title">{post.title}</div>
        <div className="capsule-desc">{post.description}</div>
        <div className="capsule-foot">
          <div className="capsule-meta">
            <span>{post.date}</span>
            <span className="meta-dot"></span>
            <span>{post.readTime}</span>
          </div>
          <div className="capsule-arrow">▶</div>
        </div>
      </div>
    </a>
  );
}

function PostRow({ post }: { post: PostItem }) {
  return (
    <a href={post.href} className="row">
      <div className="row-thumb">
        <PlaceholderArt seed={post.id} accent={post.accentColor} glyph={post.glyph} />
      </div>
      <div className="row-body">
        <div className="row-tags">
          {post.tags.slice(0, 3).map(t => (
            <span key={t} className="row-tag">{t}</span>
          ))}
        </div>
        <div className="row-title">{post.title}</div>
        <div className="row-desc">{post.description}</div>
        <div className="row-meta">
          <span>{post.date}</span>
          <span className="meta-dot"></span>
          <span>{post.readTime}</span>
        </div>
      </div>
      <div className="row-cta">
        <div className="row-cta-arrow">▶</div>
        <div className="row-cta-label">LEER</div>
      </div>
    </a>
  );
}

export default function PostListIsland({ posts }: Props) {
  const activeTag = useStore($activeTag);
  const viewMode  = useStore($viewMode);

  const visible =
    activeTag === 'Todos'
      ? posts
      : posts.filter(p => p.tags.includes(activeTag));

  return (
    <div>
      <div className="shdr" style={{ marginTop: '24px' }}>
        <span className="stitle">
          <span className="stitle-tick"></span>
          {activeTag === 'Todos' ? 'Todas las entradas' : `Filtro: ${activeTag}`}
          <span className="stitle-count">{visible.length} POSTS</span>
        </span>
        <div className="view-toggle">
          <span
            className={`vt${viewMode === 'grid' ? ' on' : ''}`}
            onClick={() => $viewMode.set('grid')}
          >▦ GRID</span>
          <span
            className={`vt${viewMode === 'list' ? ' on' : ''}`}
            onClick={() => $viewMode.set('list')}
          >▤ LIST</span>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="capsules">
          {visible.map(p => <Capsule key={p.id} post={p} />)}
        </div>
      ) : (
        <div className="rows">
          {visible.map(p => <PostRow key={p.id} post={p} />)}
        </div>
      )}

      {visible.length === 0 && (
        <div className="empty">
          <div className="empty-glyph">∅</div>
          <div className="empty-title">Nada con ese filtro todavía</div>
          <div className="empty-sub">Vuelve pronto, o revisa otro tema.</div>
        </div>
      )}
    </div>
  );
}
