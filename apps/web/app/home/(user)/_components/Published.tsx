import React from 'react';
import DateSlider from './DateSlider';
import PublishedColumn from './PublishedColumn';
import { Published } from '~/core/session/types/published';
import Spinner from '@kit/ui/Spinner';

interface PublishedProps {
  published: Published[];
  isLoading: boolean;
}


function PublishedComponent({ published, isLoading }: PublishedProps) {
  if (isLoading) return <Spinner/>;
  if (published.length === 0) return <div>No published posts</div>;
  return (
    <div className="">
      
      <div className="flex gap-6 max-w-full overflow-auto pb-6">
        {published.map((post) => (
          <PublishedColumn key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PublishedComponent;
