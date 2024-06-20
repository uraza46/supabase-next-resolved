'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactionsImage from '../assets/icons/Reactions.svg';
import {
  LaptopIconActive,
  LikeLinkedIn,
  MessageLinkedIn,
  MobileIconActive,
  RepostLinkedIn,
  SendLinkedIn,
  TabIconActive,
} from './Icons';


interface TwoSectionEditorLayoutProps{

  children: React.ReactNode;
  postContent: string;
}

function convertToHtml(postContent: string): string {
  // Replace double line breaks with paragraph tags to create paragraphs
  const withParagraphs = postContent
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join('');

  // Replace single line breaks with <br> within paragraphs
  const withLineBreaks = withParagraphs.replace(/\n/g, '<br>');

  return withLineBreaks;
}

function TwoSectionEditorLayout({ children, postContent }:TwoSectionEditorLayoutProps) {

  const [deviceType, setDeviceType] = useState(0);

  const htmlContent = convertToHtml(postContent);
  //   0-> mobile ,1 -> tabl , 2-> laptop
  return (
    <div className="pl-6 flex flex-col lg:flex-row flex-1">
      <div className="border-r-2 border-[#F6F7F9] p-6 pl-0 flex flex-col gap-6 w-full lg:w-[732px] ">
        {children}
      </div>
      <div
        className="  flex-1 bg-[#F6F7F9] p-6 "
        style={{ minHeight: 'calc(100vh - 106px)' }}
      >
        <div className="flex items-center justify-between pb-[21px] border-b-2 border-[#E0E1E3] mb-4">
          <div className="font-semibold text-xl leading-[30px] text-[#071019]">
            Post Preview
          </div>
          <div className="flex items-center">
            <div className="text-[#5B606A] text-sm leading-[22px] pr-3 mr-3 border-r border-[#E0E1E3]">
              Device
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={` hover:mix-blend-normal  hover:bg-[#007FFF1A] p-[6px] rounded-full ${deviceType === 0 ? 'mix-blend-normal bg-[#007FFF1A]' : 'mix-blend-luminosity'}`}
                onClick={() => setDeviceType(0)}
              >
                <MobileIconActive />
              </button>
              <button
                type="button"
                onClick={() => setDeviceType(1)}
                className={` hover:mix-blend-normal  hover:bg-[#007FFF1A] p-[6px] rounded-full ${deviceType === 1 ? 'mix-blend-normal bg-[#007FFF1A]' : 'mix-blend-luminosity'}`}
              >
                <TabIconActive />
              </button>
              <button
                type="button"
                onClick={() => setDeviceType(2)}
                className={` hover:mix-blend-normal  hover:bg-[#007FFF1A] p-[6px] rounded-full ${deviceType === 2 ? 'mix-blend-normal bg-[#007FFF1A]' : 'mix-blend-luminosity'}`}
              >
                <LaptopIconActive />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
        <div
      className={`output-boxshadow p-4 bg-white ${deviceType === 0 && 'w-[278px]'} ${deviceType === 1 && 'w-[350px]'} ${deviceType === 2 && 'w-[424px]'} `}
      dangerouslySetInnerHTML={{ __html: htmlContent }} // Render the converted HTML content
    />
        </div>
      </div>
    </div>
  );
}

export default TwoSectionEditorLayout;
