'use client';
import React, { useState , useCallback , useEffect} from 'react';

import DashHeaderRight from '../../_components/DashHeaderRight';
import TwoSectionEditorLayout from '../../_components/TwoSectionEditorLayout';
import RichTextEditor from '../../_components/RichTextEditor';
import { Button } from '@kit/ui/button';
import { FatArrow, WhiteClockIcon }  from '../../_components/Icons';
import Modal from '../../_components/Modal/Modal';
import ScheduleModal from '../../_components/Modal/ScheduleModal';
 import usePublishToLinkedIn from '~/hooks/usePublishToLinkdin';
 import { useSearchParams } from 'next/navigation';
import useCreateDrafts from '~/hooks/useCreateDrafts';
import useCreateScheduledPost from '~/hooks/useCreateSceduled';
import { v4 as uuidv4 } from 'uuid';





 function convertHtmlToLinkedInMarkdown(html: string): string {
  return html
    // Convert strong/bold tags
    .replace(/<(?:b|strong)>(.*?)<\/(?:b|strong)>/gim, '**\$1**')
    // Convert em/italic tags
    .replace(/<(?:i|em)>(.*?)<\/(?:i|em)>/gim, '*\$1*')
    // LinkedIn doesn't support underline; remove the tags
    .replace(/<u>(.*?)<\/u>/gim, '\$1')
    // Convert unordered lists
    .replace(/<ul>([\s\S]*?)<\/ul>/gim, (match) => {
      return match
        .replace(/<li>/gim, '\n- ')
        .replace(/<\/li>/gim, '')
        .replace(/<\/?ul>/gim, '');
    })
    // Convert ordered lists to plain text since LinkedIn does not support them
    .replace(/<ol>([\s\S]*?)<\/ol>/gim, (match) => {
      let counter = 1;
      return match
        .replace(/<li>/gim, () => `\n${counter++}. `)
        .replace(/<\/li>/gim, '')
        .replace(/<\/?ol>/gim, '');
    })
    // Remove other HTML tags
    .replace(/<[^>]*>/gim, '')
    // Decode HTML entities
    .replace(/&[#A-Za-z0-9]+;/gi, (entity) => {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = entity;
      return textArea.value;
    })
    // Trim whitespace at the start and end of the text
    .trim();
}


function Page(props: any) {
  const [modalActive, setModalActive] = useState(false);
  const [postContent, setPostContent] = useState(''); // State to hold the editor content
  const { publishPost, isPublishing, error} = usePublishToLinkedIn();
  const [characters, setCharacters]= useState(0);
  const [isSaveDraftDisabled, setIsSaveDraftDisabled] = useState(false); 

  
  const handleEditorChange = (htmlContent: string) => {
    setPostContent(htmlContent); // Update the state when the editor content changes
    const textContent = convertHtmlToLinkedInMarkdown(htmlContent);
    setCharacters(textContent.length);
  };

  const handlePublish = useCallback(() => {
    const textContent = convertHtmlToLinkedInMarkdown(postContent);
    publishPost({ content: textContent });
  }, [postContent, publishPost]);



  

 const searchParams = useSearchParams();

 const articleFromPreviousPage = searchParams.get('article');
 const isDraft = searchParams.get('draft') === 'true'; // Convert the search parameter to a boolean


 useEffect(()=>{
  if(articleFromPreviousPage)
  {
    setPostContent(articleFromPreviousPage);
    const textContent = convertHtmlToLinkedInMarkdown(articleFromPreviousPage);
    setCharacters(textContent.length);
  }

  setIsSaveDraftDisabled(isDraft);
 }, [articleFromPreviousPage, isDraft]);
 

 
  
 const createDrafts = useCreateDrafts();

 const postDate = new Date().toISOString();


 const onSaveDraft = useCallback(async () => {
    console.log('saving drafts')
   const draftData = {
      id: uuidv4(),
     content: postContent,
      postDate,
      characters

     
   };

   const success = await createDrafts(draftData as any);
   if (success) {
     console.log('Draft saved successfully');
     // Perform any additional actions on success, e.g., clear the editor or show a message
   } else {
     console.error('Failed to save the draft');
     // Handle the error case, e.g., show an error message to the user
   }
 }, [postContent, createDrafts]);
 

 




  
  return (
    <>
      <DashHeaderRight
        title="Generate Post using AI"
        desc="Select a template to generate high quality posts using AI"
      />
      <div className="sepeartor h-[2px] w-full bg-[#F6F7F9] "></div>
      <TwoSectionEditorLayout postContent={postContent}>
        <div className="mb-6">
          <div className="font-semibold text-xl leading-[30px] text-[#071019]">
            Write post
          </div>
          <p className="text-[#5B606A] text-xs leading-[18px]">
            Edit or rewrite the post based on your requirements
          </p>
        </div>

        <RichTextEditor content={postContent} onChange={handleEditorChange} />

        <div className="text-xs leading-[22px] py-4 border-t-2 border-b-2 border-[#F6F7F9] mb-6">
          {characters + ' words'}
        </div>
        <div className="flex items-center justify-between">
          <div>

            <Button
              round
              className=" bg-transparent border border-[#E0E1E3] text-[#5B606A] hover:border-[#007FFF] hover:bg-transparent hover:text-[#007FFF]"
              onClick={onSaveDraft}
              disabled={isSaveDraftDisabled}
            >
              <span className="flex items-center text-sm leading-6 justify-center gap-2">
                Save as Draft
              </span>
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <Button
              round
              href="#"
              className=" bg-[#F6F7F9] text-[#071019] hover:bg-[#ececec]"
               onClick={handlePublish}
               disabled={isPublishing}
            >
              <span className="flex items-center text-sm leading-6 justify-center gap-2">
                Publish
                <FatArrow />
              </span>
            </Button>
            <Button
              round
              href="#"
              className=""
              onClick={() => setModalActive(true)}
            >
              <span className="flex items-center justify-center gap-2">
                <WhiteClockIcon />
                Schedule
              </span>
            </Button>
          </div>
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          <ScheduleModal active={modalActive} setActive={setModalActive} postContent={postContent}  />
        </Modal>
      </TwoSectionEditorLayout>
    </>
  );
}

export default Page;
