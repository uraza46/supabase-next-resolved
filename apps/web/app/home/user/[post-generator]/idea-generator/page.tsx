'use client';
import React, { useState } from 'react';
import DashHeaderRight from '../../_components/DashHeaderRight';
import TwoSectionLayout from '../../_components/TwoSectionLayout';
import OutputWrapper from '../../_components/OutputWrapper';
import { TextInput } from '../../_components/Inputs/Inputs';
import { MagicStar } from '../../_components/Icons';
import IdeaCard from '../../_components/IdeaCard';
import useGenerateIdeas from '~/../hooks/useGenerateIdeas'

import { Button } from '@kit/ui/button';

const Page: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const { ideas, generateIdeas, isGenerating } = useGenerateIdeas();

  const handleGenerateIdeasClick = () => {
    console.log('generating ideas...');
    if (topic) {
      generateIdeas({ topic });
    }
  };

  return (
    <>
      <DashHeaderRight
        title="Generate Ideas using AI"
        desc="Select a template to generate high quality posts using AI"
      />
      <div className="separator h-[2px] w-full bg-[#F6F7F9]"></div>
      <TwoSectionLayout
        leftSection={
          <>
            <TextInput
              name="topic"
              label="Add one topic or industry you want to generate idea for"
              placeholder="Start by writing your idea"
              value={topic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
            />

            <Button  onClick={handleGenerateIdeasClick} className="mb-6 w-fit" disabled={isGenerating}>
              <span className="flex items-center justify-center gap-2">
                <MagicStar /> {isGenerating ? 'Generating...' : 'Generate Ideas'}
              </span>
            </Button>
          </>
        }
        rightSection={
          <OutputWrapper
          isEmpty={!isGenerating && ideas.length === 0}
          loading={isGenerating}
          newOutput={
            !isGenerating && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {ideas.map((idea, index) => (
                  <IdeaCard key={index} text={`${idea.headline} : ${idea.angle}`} />
                ))}
              </div>
            )
          }
         // history={/* pass the history content if available */}
        >
          {/* No need to pass children here since we're using specific props */}
        </OutputWrapper>
        
        }
      />
    </>
  );
};

export default Page;
