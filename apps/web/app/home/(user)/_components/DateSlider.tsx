import React from 'react';
import MyIcon from './MyIcon';
import { ArrowLeft, ArrowRight } from './Icons';

function DateSlider(props: any) {
  return (
    <div className="pt-6 flex items-center justify-between mb-6">
      <button>
        <ArrowLeft />
      </button>
      <div className="flex flex-col items-center">
        <div className="text-base font-semibold mb-1">
          January 02 - January 05, 2024
        </div>
        <div className="text-[#5B606A] text-sm">Asia/Mumbai</div>
      </div>
      <button>
        <ArrowRight />
      </button>
    </div>
  );
}

export default DateSlider;
