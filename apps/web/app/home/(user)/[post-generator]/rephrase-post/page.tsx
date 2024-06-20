'use client';
import React, { useEffect, useState } from 'react';
import Button from '@kit/ui/Button';

import DashHeaderRight from '../../components/DashHeaderRight';
import MoodSelect from '../../components/MoodSelect';
import { MagicStar } from '../../components/Icons';
import OutputWrapper from '../../components/OutputWrapper';
import TwoSectionLayout from '../../components/TwoSectionLayout';
import { TextAreaInput } from '../../components/Inputs/Inputs';
import OutputItem from '../../components/OutputItem';
import useRephraseText from '~/hooks/useRephraseText'; // Use the new hook
import { useSearchParams } from 'next/navigation';

function Page(props: any) {
  const { rephrasedText, rephraseText, isRephrasing } = useRephraseText(); // Use the new hook
  const [inputText, setInputText] = useState('');
  const [moodActive, setMoodActive] = useState(''); // Added mood state for rephrasing

  const handleRephraseTextClick = () => {
    if (inputText) {
      rephraseText({ inputText, mood: moodActive, rephrase: true });
    }
  };

  const searchParams = useSearchParams();
  const ideasText = searchParams.get('idea');

  useEffect(() => {
    if (ideasText) {
      setInputText(ideasText);
    }
  }, [ideasText]);

  useEffect(() => {
    console.log('Rephrased Text:', rephrasedText); // Debugging log
  }, [rephrasedText]);

  return (
    <>
      <DashHeaderRight
        title="Rephrase Post using AI"
        desc="Select a template to generate high quality posts using AI"
      />
      <div className="separator h-[2px] w-full bg-[#F6F7F9]"></div>
      <TwoSectionLayout
        leftSection={
          <>
            <TextAreaInput
              label="What do you want to rephrase?"
              placeholder="Write your article here"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
            />
            <div className="mood__section">
              <div className="input-label mb-4">Select tone of your post</div>
              <div className="moods flex gap-4 flex-wrap w-full md:w-[496px]">
                <MoodSelect active={moodActive} setActive={setMoodActive} />
              </div>
            </div>
            <Button round onClick={handleRephraseTextClick} disabled={isRephrasing}>
              <span className="flex items-center justify-center gap-2">
                <MagicStar /> {isRephrasing ? 'Rephrasing...' : 'Rephrase Article'}
              </span>
            </Button>
          </>
        }
        rightSection={
          <OutputWrapper
            isEmpty={!inputText.length && !isRephrasing && !rephrasedText}
            newOutput={
              !isRephrasing && rephrasedText && (
                <OutputItem article={rephrasedText} organizationId={props.organizationUid} />
              )
            }
            loading={isRephrasing}
          />
        }
      />
    </>
  );
}

export default Page;
