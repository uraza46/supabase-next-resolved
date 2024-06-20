'use client';
import React, { useState } from 'react';
import { PenIcon } from './Icons';
import Modal from './Modal/Modal';
import ScheduleSettingModal from './Modal/ScheduleSettingModal';
import { ScheduledPost } from '~/core/session/types/ScheduledPost';

interface ScheduledColumnProps {
  post: ScheduledPost;
}



interface ScheduledCardProps {
  post: ScheduledPost;
}

const ScheduledCard = ({ post }: ScheduledCardProps) => {
  // Format the time to display it in a readable format
  const formattedTime = new Date(post.time).toLocaleTimeString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-[#F6F7F9] w-[271px] h-56 p-3 pb-2 border border-[#E0E1E3] rounded-sm">
      <div className="time font-semibold text-sm leading-[22px] text-[#5B606A] mb-2">
        {formattedTime}
      </div>
      <div className="text-xs leading-[22px] text-[#5B606A] mb-2">
        {post.content}
      </div>
      {/* ... rest of the component */}
      {/* Remove the empty check and related code if not needed */}
    </div>
  );
};



function ScheduledColumn({ post }: ScheduledColumnProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* ... other elements */}
      <ScheduledCard post={post} />
    </div>
  );
}

export default ScheduledColumn;