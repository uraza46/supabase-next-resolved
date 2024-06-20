import React from 'react';

function MyIcon(props: any) {
  const { size } = props;
  return (
    <div
      className="h-4 w-4 bg-slate-200 rounded text-[transparent] flex items-center justify-center"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      I
    </div>
  );
}

export default MyIcon;
