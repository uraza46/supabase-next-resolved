'use client';

import React, { useEffect, useState } from 'react';

// Use the new hook
import { useSearchParams } from 'next/navigation';

import { Button } from '@kit/ui/button';

import useCorrectGrammar from '~/../hooks/useCorrectGrammer';

import DashHeaderRight from '../../_components/DashHeaderRight';
import { MagicStar } from '../../_components/Icons';
import { TextAreaInput } from '../../_components/Inputs/Inputs';
import OutputItem from '../../_components/OutputItem';
import OutputWrapper from '../../_components/OutputWrapper';
import TwoSectionLayout from '../../_components/TwoSectionLayout';

function Page(props: any) {
  const { correctedText, correctGrammar, isCorrecting } = useCorrectGrammar(); // Use the new hook
  const [inputText, setInputText] = useState('');

  const handleCorrectGrammarClick = () => {
    if (inputText) {
      correctGrammar({ inputText, correctGrammar: true });
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
        title="Correct Grammar using AI"
        desc="Correct the grammar of your text using AI"
      />
      <div className="separator h-[2px] w-full bg-[#F6F7F9]"></div>
      <TwoSectionLayout
        leftSection={
          <>
            <TextAreaInput
              label="What do you want to correct?"
              placeholder="Write your text here"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
            />
            <Button onClick={handleCorrectGrammarClick} disabled={isCorrecting}>
              <span className="flex items-center justify-center gap-2">
                <MagicStar />{' '}
                {isCorrecting ? 'Correcting...' : 'Correct Grammar'}
              </span>
            </Button>
          </>
        }
        rightSection={
          <OutputWrapper
            isEmpty={!inputText.length && !isCorrecting && !correctedText}
            newOutput={
              !isCorrecting &&
              correctedText && (
                <OutputItem
                  article={correctedText}
                  organizationId={props.organizationUid}
                />
              )
            }
            loading={isCorrecting}
          />
        }
      />
    </>
  );
}

export default Page;
