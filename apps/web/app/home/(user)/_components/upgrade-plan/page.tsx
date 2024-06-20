'use client';
import React from 'react';

import DashHeaderRight from '../../components/DashHeaderRight';
import PricingComp from './PricingComp';

function Page(props: any) {
  return (
    <>
      <DashHeaderRight
        title="Upgrade your plan"
        desc="Select the plan that suits you"
      />
      <div className="sepeartor h-[2px] w-full bg-[#F6F7F9]"></div>
      <PricingComp />
    </>
  );
}

export default Page;
