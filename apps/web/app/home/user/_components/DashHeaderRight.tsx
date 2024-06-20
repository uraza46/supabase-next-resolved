import React, { useState } from 'react';

import Link from 'next/link';

import { useGlobalContext } from 'content/store/globalContext';

import { Button } from '@kit/ui/button';

import { DarkClock, Menu, WhiteStarDashed } from './Icons';

function DashHeaderRight(props: any) {
  const { title, titleSecondary, desc } = props;
  const { sideBarOpen, setSideBarOpen } = useGlobalContext();
  return (
    <>
      <div className="mb-6 flex w-full flex-col flex-wrap gap-5 p-6 pb-0 lg:flex-row lg:items-center   lg:justify-between lg:gap-3">
        <div className="flex w-fit gap-5 lg:hidden">
          <Button
            className=" w-fit bg-[#F6F7F9] text-[#071019] hover:bg-[#ececec]"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            <Menu />
          </Button>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold leading-[36px]">{title}</h1>
            {titleSecondary}
          </div>
          <div className="text-xs text-[#5B606A]">{desc}</div>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-[8px] bg-[#F6F7F9] px-3 py-2 md:w-fit md:flex-row md:items-center md:justify-center md:gap-6">
          <div className="flex items-center gap-2 text-sm font-medium ">
            <DarkClock />
            Your free trial ends in just 6 days
          </div>
          <Link href="/upgrade-plan">
            <button className="flex w-full items-center justify-center gap-1 rounded-[8px] bg-[#071019] px-4 py-2 text-white md:w-fit">
              <WhiteStarDashed /> Upgrade Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default DashHeaderRight;
