'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import DashHeaderRight from '../_components/DashHeaderRight';
import {
  Doodle,
  DoodleArrow,
  DoodleDiamond,
  DoodleLine,
  DoodlePlane,
} from '../_components/Icons';
import articleToPostImage from '../_assets/images/articletopost.svg';
import ideaGeneratorImage from '../_assets/images/ideagenerator.svg';
import scratchImage from '../_assets/images/scratch.svg';
import shareRecentLearningImage from '../_assets/images/sharerecentlearning.svg';

const AiButtons = (props: any) => {
  const { title, desc, image, id, link } = props;
  return (
    <div className="generate_buttons flex   h-auto justify-between rounded-sm border border-[#E0E1E3] ">
      <div className="flex-1 p-6">
        <div className="relative mb-4 w-fit text-xl font-semibold leading-[34px]">
          {(id === 0 || id === 2) && (
            <div className="absolute left-[-15px] top-[-8px]">
              <Doodle />
            </div>
          )}
          {(id === 0 || id === 3) && (
            <div className="absolute bottom-[-4px] right-0">
              <DoodleLine />
            </div>
          )}
          {id === 2 && (
            <div className="absolute bottom-[-24px] right-[28px]">
              <DoodleArrow />
            </div>
          )}
          {id == 1 && (
            <>
              <div className="absolute right-[-18px] top-[-4px] rotate-90">
                <Doodle />
              </div>
              <div className="absolute left-[-15px] top-[-8px]">
                <DoodleDiamond />
              </div>
            </>
          )}
          {id === 3 && (
            <div className="absolute left-[-18px] top-[-14px]">
              <DoodlePlane />
            </div>
          )}
          {title}
        </div>
        <p className="mb-4 text-xs leading-[18px] text-[#5B606A]">{desc}</p>
        <Link href={link}>
          <button
            type="button"
            className="w-full bg-[#F6F7F9] p-[6px] text-sm font-medium leading-[24px]"
          >
            Start Now
          </button>
        </Link>
      </div>
      <div className="hidden h-full w-[298px] items-center justify-center bg-[#F6F7F9] md:flex">
        {image && <Image src={image} alt={title} className="max-w-[90%]" />}
      </div>
    </div>
  );
};

function Page(props: any) {
  const aiBtnsData = [
    {
      title: 'Start from Scratch',
      desc: 'Use the power of AI generated content to create impactful linkedin posts.',
      image: scratchImage,
      id: 0,
      link: 'post-generator/start-from-scratch',
    },
    {
      title: 'Idea Generator',
      desc: 'Use the power of AI generated content to create impactful linkedin posts.',
      image: ideaGeneratorImage,
      link: 'post-generator/idea-generator',
      id: 1,
    },
    {
      title: 'Rephrase Post',
      desc: 'Use the power of AI generated content to create impactful linkedin posts.',
      image: articleToPostImage,
      id: 2,
      link: 'post-generator/rephrase-post',
    },
    {
      title: 'Proofread and Check Grammar',
      desc: 'Use the power of AI generated content to create impactful linkedin posts.',
      image: shareRecentLearningImage,
      link: 'post-generator/proofread-and-check-grammar',
      id: 3,
    },
  ];
  return (
    <>
      <DashHeaderRight
        title="Generate Post using AI"
        desc="Select a template to generate high quality posts using AI"
      />
      <div className="sepeartor mb-6 h-[2px] w-full bg-[#F6F7F9]"></div>
      <div className="px-6">
        <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-2 ">
          {aiBtnsData.map((e: any, i: number) => {
            return (
              <AiButtons
                key={i}
                image={e.image}
                desc={e.desc}
                title={e.title}
                id={e.id}
                link={e.link}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
