import React, { useEffect } from 'react';
import ReactionsImage from '../assets/icons/Reactions.svg';
import Image from 'next/image';
import { LinkedInIconDark } from './Icons';

import { Published } from '~/core/session/types/published';

interface PublishedColumnProps {
  post: Published;
}
interface PublishedCardProps {
  post: Published;
}

const PublishedCard = ({ post }: PublishedCardProps) => {
  // Format the date to display it in a readable format
  const formattedPostDate = new Date(post.postDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  

  
  
  return (
    <div className="bg-[#F6F7F9] w-[271px] p-3 border border-[#E0E1E3] rounded-sm">
      <div className="font-semibold text-sm leading-[22px] text-[#5B606A] mb-2">
        {formattedPostDate}
      </div>
      <div className="mb-2 p-3 rounded bg-white text-xs leading-[18px] h-auto relative">
        <div className="font-bold mb-2">
          {post.postContent}
        </div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <a
          href={post.posturl }
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#071019] flex items-center gap-1 font-medium text-[10px] leading-4"
        >
          
          <LinkedInIconDark /> View In my LinkedIn Profile
        </a>
      </div>
    </div>
  );
};


function PublishedColumn({ post }: PublishedColumnProps) {
  return (
    <div className="flex flex-col gap-6">
      <PublishedCard post={post} />
    </div>
  );
}

export default PublishedColumn;
