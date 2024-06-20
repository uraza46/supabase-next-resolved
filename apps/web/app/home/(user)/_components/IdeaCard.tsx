import Link from 'next/link';
import React from 'react';
import Button from '@kit/ui/Button';

interface IdeaCardProps{
  text:string;
}



const IdeaCard: React.FC<IdeaCardProps> =({text}) => {
  return (
    <div className="idea__card p-4 border border-[#E0E1E3] rounded-[8px]">
      <div className="text-sm text-[#071019] leading-[22px] pb-4 mb-4 border-b  border-[#E0E1E3]">
        {text}
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <button
          type="button"
          className="text-sm leading-6 text-[#071019] whitespace-nowrap text-center w-full md:w-fit"
        >
          Save Idea
        </button>
        <Link
          
          href={{
            pathname:"start-from-scratch/",
            query:{
              idea: text
            }
    
        }}
          className=" bg-[#F6F7F9] text-[#071019] hover:bg-[#ececec] w-full"
        >
          <span className="flex items-center text-sm leading-6 justify-center gap-2">
            Generate Content
          </span>
        </Link>
      </div>
    </div>
  );
}

export default IdeaCard;
