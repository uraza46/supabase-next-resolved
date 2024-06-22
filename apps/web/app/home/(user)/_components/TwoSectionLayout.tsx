import React from 'react';

function TwoSectionLayout(props: any) {
  const { children, leftSection, rightSection } = props;
  return (
    <div className="px-6 md:px-6 flex flex-col md:flex-row">
      <div className="border-r-2 border-[#F6F7F9] p-6 pl-0 flex flex-col gap-6 w-full md:w-[496px]">
        {leftSection}
      </div>
      <div className=" pr-0 flex-1">{rightSection}</div>
    </div>
  );
}

export default TwoSectionLayout;
