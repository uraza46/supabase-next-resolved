'use client';
import React, { useEffect, useState } from 'react';
import Button from '@kit/ui/Button';

import DashHeaderRight from '../../components/DashHeaderRight';
import { MagicStar } from '../../components/Icons';
import OutputWrapper from '../../components/OutputWrapper';
import TwoSectionLayout from '../../components/TwoSectionLayout';
import { TextAreaInput } from '../../components/Inputs/Inputs';
import OutputItem from '../../components/OutputItem';
import useCorrectGrammar from '~/hooks/useCorrectGrammer'; // Use the new hook
import { useSearchParams } from 'next/navigation';

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
            <Button round onClick={handleCorrectGrammarClick} disabled={isCorrecting}>
              <span className="flex items-center justify-center gap-2">
                <MagicStar /> {isCorrecting ? 'Correcting...' : 'Correct Grammar'}
              </span>
            </Button>
          </>
        }
        rightSection={
          <OutputWrapper
            isEmpty={!inputText.length && !isCorrecting && !correctedText}
            newOutput={
              !isCorrecting && correctedText && (
                <OutputItem article={correctedText} organizationId={props.organizationUid} />
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
