'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Button } from '@kit/ui/button';

import useGenerateArticle from '~/../hooks/useGenerateArticle';

import DashHeaderRight from '../../_components/DashHeaderRight';
import { MagicStar } from '../../_components/Icons';
import { TextAreaInput } from '../../_components/Inputs/Inputs';
import MoodSelect from '../../_components/MoodSelect';
import OutputItem from '../../_components/OutputItem';
import OutputWrapper from '../../_components/OutputWrapper';
import TwoSectionLayout from '../../_components/TwoSectionLayout';

function Page(props: any) {
  const [moodActive, setMoodActive] = useState('');
  const { article, generateArticle, isGenerating } = useGenerateArticle();
  const [inputText, setInputText] = useState('');
  const handleGenerateArticleClick = () => {
    if (inputText && moodActive) {
      generateArticle({
        inputText,
        identifier: 'generate-article',
        mood: moodActive,
      });
    }
  };

  const searchParams = useSearchParams();

  const ideasText = searchParams.get('idea');

  useEffect(() => {
    if (ideasText) {
      setInputText(ideasText);
    }
  }, [ideasText]);

  return (
    <>
      <DashHeaderRight
        title="Generate Post using AI"
        desc="Select a template to generate high quality posts using AI"
      />
      <div className="sepeartor h-[2px] w-full bg-[#F6F7F9]"></div>
      <TwoSectionLayout
        leftSection={
          <>
            <TextAreaInput
              label="What do you want to post about?"
              placeholder="Start by writing your idea"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
            />
            <div className="mood__section">
              <div className="input-label mb-4">Select tone of your post</div>
              <div className="moods flex w-full flex-wrap gap-4 md:w-[496px]">
                <MoodSelect active={moodActive} setActive={setMoodActive} />
              </div>
            </div>
            <Button
              onClick={handleGenerateArticleClick}
              disabled={isGenerating}
            >
              <span className="flex items-center justify-center gap-2">
                <MagicStar />{' '}
                {isGenerating ? 'Generating...' : 'Generate Article'}
              </span>
            </Button>
          </>
        }
        rightSection={
          <OutputWrapper
            isEmpty={!inputText.length && !isGenerating && !article}
            newOutput={
              !isGenerating &&
              article && (
                <OutputItem
                  article={article}
                  organizationId={props.organizationUid}
                />
              )
            }
            loading={isGenerating}

            //history={
            // ... history content if available
            // }
          />
        }
      />
    </>
  );
}

export default Page;
