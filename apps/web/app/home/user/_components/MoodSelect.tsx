'use client';
import React from 'react';

function MoodSelect(props: any) {
  const { active, setActive } = props;
  const data = [
    { icon: '😄', name: 'Excited' },
    { icon: '💼', name: 'Professional' },
    { icon: '🌟', name: 'Encouraging' },
    { icon: '🤣', name: 'Funny' },
    { icon: '🎭', name: 'Dramatic' },
    { icon: '📷', name: 'Candid' },
    { icon: '😎', name: 'Casual' },
    { icon: '🗣️', name: 'Convincing' },
    { icon: '‼️', name: 'Urgent' },
    { icon: '🤩', name: 'Engaging' },
    { icon: '🎨', name: 'Creative' },
    { icon: '😰', name: 'Worried' },
    { icon: '🔥', name: 'Passionate' },
    { icon: '📚', name: 'Informative' },
  ];
  return (
    <>
      {data.map((e: any, i: number) => {
        return (
          <button
            type="button"
            key={i}
            className={`border  px-3 py-[6px] rounded-[8px] whitespace-nowrap text-sm leading-[22px] text-[#071019] flex items-center justify-center hover:bg-[#007FFF0D] ${active === e.name ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#E0E1E3]'}`}
            onClick={() => {
              setActive(e.name);
            }}
          >
            {e.icon} {e.name}
          </button>
        );
      })}
    </>
  );
}

export default MoodSelect;
