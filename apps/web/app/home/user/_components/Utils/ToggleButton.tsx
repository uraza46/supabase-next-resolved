import React from 'react';

function ToggleButton(props: any) {
  const { active, setActive, text } = props;

  return (
    <label className="relative inline-flex items-center  cursor-pointer gap-2">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={active}
        onClick={() => setActive(!active)}
      />
      <div
        className="w-11 h-6 bg-[#E0E1E3] rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-red-800 dark:bg-[#FFFFFF] peer-checked:after:translate-x-full peer-checked:after:border-[#FFFFFF]
        peer-checked:after:bg-[#FFFFFF] peer-hover:after:bg-[#FFFFFF]
       after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#FFFFFF] after:border-[#FFFFFF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#007FFF]"
      ></div>
      {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Red</span> */}
      {text && <div className="text-[#071019] text-sm">{text}</div>}
    </label>
  );
}

export default ToggleButton;
