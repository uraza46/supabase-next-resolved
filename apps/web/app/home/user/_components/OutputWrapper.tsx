import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import magicHandImage from '../_assets/images/magicHand.svg';
import TabsToggler from './TabsToggler';

function OutputWrapper(props: any) {
  const { isEmpty, newOutput, history, loading } = props;
  const [activeTab, setActiveTabs] = useState('new-output');
  const tabOptions = [
    { label: 'New Output', value: 'new-output' },
    { label: 'History', value: 'history' },
  ];
  return (
    <>
      <div className="px-0 py-6 pb-0 md:px-6">
        <div className="text-xl font-semibold leading-[30px] text-[#071019]">
          Output
        </div>
        <p className="mb-6 text-sm text-[#5B606A]">
          Here is AI generated content for you. Feel free to tweak before
          posting it.
        </p>
      </div>
      {isEmpty && !loading && (
        <div className=" flex w-full flex-col items-center justify-center pt-20">
          <Image
            src={magicHandImage}
            alt="magic hand"
            className="mix-blend-luminosity"
          />
          <p>Input the requirement and wait for the magic to happen</p>
        </div>
      )}
      {!isEmpty && (
        <>
          <TabsToggler
            tabOptions={tabOptions}
            active={activeTab}
            setActive={setActiveTabs}
          />
        </>
      )}
      {loading && (
        <>
          <div className="mt-6 px-0 md:px-6">
            <div className="skeleton mb-3 h-[400px] w-full"></div>
            {/* <div className="skeleton h-[110px] w-[50%] mb-3"></div>
            <div className="skeleton h-[110px] w-full mb-3"></div> */}
          </div>
        </>
      )}
      {!loading && !isEmpty && (
        <>
          {activeTab === 'new-output' && (
            <div className="p-6">{props.newOutput}</div>
          )}
          {activeTab === 'history' && <div className="p-6">{history}</div>}
        </>
      )}
    </>
  );
}

export default OutputWrapper;
