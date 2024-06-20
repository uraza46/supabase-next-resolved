'use client';
import React, { useState } from 'react';

import DashHeaderRight from '../../components/DashHeaderRight';
import TwoSectionLayout from '../../components/TwoSectionLayout';
import OutputWrapper from '../../components/OutputWrapper';
import { TextInput } from '../../components/Inputs/Inputs';
import Button from '@kit/ui/Button';
import { MagicStar } from '../../components/Icons';
import IdeaCard from '../../components/IdeaCard';
import useGenerateIdeas from '~/hooks/generateideas';

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

            <Button round onClick={handleGenerateIdeasClick} className="mb-6 w-fit" disabled={isGenerating}>
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
