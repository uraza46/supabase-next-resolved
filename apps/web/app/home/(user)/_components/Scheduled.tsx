import React from 'react';
import MyIcon from './MyIcon';
import ScheduledColumn from './ScheduledColumn';
import DateSlider from './DateSlider';
import { ScheduledPost } from '~/core/session/types/ScheduledPost';
import Spinner from '@kit/ui/Spinner';


interface ScheduledProps {
  scheduledPosts: ScheduledPost[];
  isLoading: boolean;
}
function ScheduledComponent({ scheduledPosts, isLoading }: ScheduledProps) {
  if (isLoading) return <div><Spinner/></div>;
  if (scheduledPosts.length === 0) return <div>No scheduled posts</div>;
  return (
    <div className="">
    {/* ... other elements like DateSlider if needed */}
    <div className="flex gap-6 max-w-full overflow-auto pb-6">
      {scheduledPosts.map((post) => (
        <ScheduledColumn key={post.id} post={post} />
      ))}
    </div>
  </div>
  );
}

export default ScheduledComponent;
