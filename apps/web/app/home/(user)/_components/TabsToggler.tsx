import React from 'react';

function TabsToggler(props: any) {
  const { tabOptions, active, setActive } = props;

  return (
    <div className="px-6 flex gap-6 border-b-2 border-[#F6F7F9]">
      {tabOptions?.map((e: any, i: number) => {
        return (
          <button
            type="button"
            key={i}
            onClick={() => setActive(e.value)}
            className={`text-base py-2  border-b-2  translate-y-[1.8px] ${active === e.value ? 'border-[#007FFF] text-[#071019]' : 'border-[#F6F7F9] text-[#5B606A]'}`}
          >
            {e.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabsToggler;
