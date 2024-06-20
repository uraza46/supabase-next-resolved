'use client';
import React from 'react';
import Image from 'next/image';

import DashHeaderRight from '../components/DashHeaderRight';

import scratchImage from '../assets/images/scratch.svg';
import ideaGeneratorImage from '../assets/images/ideagenerator.svg';
import articleToPostImage from '../assets/images/articletopost.svg';
import shareRecentLearningImage from '../assets/images/sharerecentlearning.svg';
import {
  Doodle,
  DoodleArrow,
  DoodleDiamond,
  DoodleLine,
  DoodlePlane,
} from '../components/Icons';
import Link from 'next/link';

const AiButtons = (props: any) => {
  const { title, desc, image, id, link } = props;
  return (
    <div className="generate_buttons h-auto   rounded-sm border border-[#E0E1E3] flex justify-between ">
      <div className="p-6 flex-1">
        <div className="font-semibold text-xl leading-[34px] mb-4 relative w-fit">
          {(id === 0 || id === 2) && (
            <div className="absolute top-[-8px] left-[-15px]">
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
              <div className="absolute top-[-4px] right-[-18px] rotate-90">
                <Doodle />
              </div>
              <div className="absolute top-[-8px] left-[-15px]">
                <DoodleDiamond />
              </div>
            </>
          )}
          {id === 3 && (
            <div className="absolute top-[-14px] left-[-18px]">
              <DoodlePlane />
            </div>
          )}
          {title}
        </div>
        <p className="text-[#5B606A] text-xs leading-[18px] mb-4">{desc}</p>
        <Link href={link}>
          <button
            type="button"
            className="bg-[#F6F7F9] p-[6px] w-full font-medium text-sm leading-[24px]"
          >
            Start Now
          </button>
        </Link>
      </div>
      <div className="w-[298px] h-full bg-[#F6F7F9] hidden md:flex items-center justify-center">
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
      <div className="sepeartor h-[2px] w-full bg-[#F6F7F9] mb-6"></div>
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5 ">
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
