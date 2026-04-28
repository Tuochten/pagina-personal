import { useStore } from '@nanostores/react';
import { $activeTag } from '../store/posts';

interface Props {
  tags: string[];
}

export default function TagCloud({ tags }: Props) {
  const activeTag = useStore($activeTag);
  return (
    <div className="tag-cloud">
      {tags.map(t => (
        <span
          key={t}
          className={`tag${t === activeTag ? ' on' : ''}`}
          onClick={() => $activeTag.set(t)}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
