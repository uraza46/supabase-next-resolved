import React, { useEffect, useState } from 'react';
import magicHandImage from '../assets/images/magicHand.svg';
import Image from 'next/image';
import TabsToggler from './TabsToggler';
import OutputItem from './OutputItem';

function OutputWrapper(props: any) {
  const { isEmpty, newOutput, history, loading } = props;
  const [activeTab, setActiveTabs] = useState('new-output');
  const tabOptions = [
    { label: 'New Output', value: 'new-output' },
    { label: 'History', value: 'history' },
  ];
  return (
    <>
      <div className="py-6 px-0 md:px-6 pb-0">
        <div className="font-semibold text-xl leading-[30px] text-[#071019]">
          Output
        </div>
        <p className="text-[#5B606A] text-sm mb-6">
          Here is AI generated content for you. Feel free to tweak before
          posting it.
        </p>
      </div>
      {isEmpty && !loading && (
        <div className=" w-full flex flex-col pt-20 items-center justify-center">
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
          <div className="px-0 md:px-6 mt-6">
            <div className="skeleton h-[400px] w-full mb-3"></div>
            {/* <div className="skeleton h-[110px] w-[50%] mb-3"></div>
            <div className="skeleton h-[110px] w-full mb-3"></div> */}
          </div>
        </>
      )}
      {!loading && !isEmpty && (
        <>
          {activeTab === 'new-output' && <div className="p-6">{props.newOutput}</div>}
          {activeTab === 'history' && <div className="p-6">{history}</div>}
        </>
      )}
    </>
  );
}

export default OutputWrapper;
