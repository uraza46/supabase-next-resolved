import Image from 'next/image';
import React from 'react';
import PricingTable from '~/components/PricingTable';
import Description from '@kit/ui/Description';
import Heading from '@kit/ui/Heading';

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-lg bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function PricingComp(props: any) {
  return (
    <div>
      <div
        className={'flex flex-col items-center justify-center py-16 space-y-8'}
      >
        <div className={'flex flex-col items-center space-y-0 text-center'}>
          <div className={'flex flex-col space-y-0'}>
            <Heading type={1}>Flexible pricing Plans</Heading>

            <Description>
              Collect valuable feedback and gain insights to improve your
              product
            </Description>
          </div>
          <div className="text-center">
            <Pill>
              <div className="flex justify-center items-center gap-2">
                <Image
                  src="/assets/images/small-star.png"
                  alt="my-logo"
                  width="15"
                  height="15"
                />
                <div>
                  Get <b>20% off </b>on Yearly Plans
                </div>
                <Image
                  src="/assets/images/small-star.png"
                  alt="my-logo"
                  width="15"
                  height="15"
                />
              </div>
            </Pill>
          </div>
          <div
            className={'flex flex-row justify-center items-center gap-7 pt-6'}
          >
            <span
              className={
                'flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400'
              }
            >
              <Image
                src="/assets/images/tick-circle.png"
                alt="my-logo"
                width="25"
                height="25"
              />{' '}
              No Credit Card Required
            </span>
            <span
              className={
                'flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400'
              }
            >
              <Image
                src="/assets/images/tick-circle.png"
                alt="my-logo"
                width="25"
                height="25"
              />{' '}
              7 Days free Trail
            </span>
          </div>
        </div>

        <div className={'w-full'}>
          <PricingTable />
        </div>
      </div>
    </div>
  );
}

export default PricingComp;
