import React from 'react';
import MyIcon from './MyIcon';
import Link from 'next/link';
import { DarkClock, Menu, WhiteStarDashed } from './Icons';
import Button from '@kit/ui/Button';
import LogoImage from '@kit/ui/Logo/LogoImage';
import { useGlobalContext } from '~/content/store';

function DashHeaderRight(props: any) {
  const { title, titleSecondary, desc } = props;
  const { sideBarOpen, setSideBarOpen } = useGlobalContext();
  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-3 lg:flex-row lg:justify-between lg:items-center w-full mb-6 p-6   pb-0 flex-wrap">
        <div className="flex lg:hidden w-fit gap-5">
          <Button
            round
            href="#"
            className=" bg-[#F6F7F9] text-[#071019] hover:bg-[#ececec] w-fit"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            <Menu />
          </Button>

          <div className="h-9 w-44 flex items-center">
            <LogoImage className="w-full" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-semibold leading-[36px]">{title}</h1>
            {titleSecondary}
          </div>
          <div className="text-[#5B606A] text-xs">{desc}</div>
        </div>
        <div className="flex md:items-center md:justify-center gap-2 md:gap-6 bg-[#F6F7F9] py-2 px-3 rounded-[8px] w-full md:w-fit flex-col md:flex-row">
          <div className="text-sm font-medium gap-2 flex items-center ">
            <DarkClock />
            Your free trial ends in just 6 days
          </div>
          <Link href="/upgrade-plan">
            <button className="flex gap-1 py-2 px-4 rounded-[8px] bg-[#071019] text-white w-full items-center justify-center md:w-fit">
              <WhiteStarDashed /> Upgrade Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default DashHeaderRight;
