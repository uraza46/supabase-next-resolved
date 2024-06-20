'use client';
import React, { useState } from 'react';
import DashLayout from './DashLayout';
import TabsToggler from './TabsToggler';
import Drafts from './Drafts';
import Published from './Published';
import Scheduled from './Scheduled';
import DashHeaderRight from './DashHeaderRight';
import { getSupabaseBrowserClient } from '@kit/supabase/browser-client';
import { useUserSession } from '@kit/supabase/hooks/use-user-session';
import { cookies } from 'next/headers';


// import { useUserDrafts } from '~/hooks/useUserDrafts';

// import { useUserScheduled } from '~/hooks/useUserScehdueled';
// import { useUserPublished } from '~/hooks/useUserPublished';
import { Spinner } from '@kit/ui/spinner';
import PublishedComponent from './Published';
import ScheduledComponent from './Scheduled';


const NewDashboard = () => {
  const [activeTab, setActiveTab] = useState('drafts');
  const tabOptions = [
    { label: 'Drafts', value: 'drafts' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Published', value: 'published' },
    { label: 'Insights', value: 'insights' },
  ];

  const  user  = useUserSession();
  const userId = user.data?.user.id;

  // const { drafts = [], isLoading: isLoadingDrafts } = useUserDrafts(userId);
  // const { scheduled = [], isLoading: isLoadingScheduled } = useUserScheduled(userId);
  // const { published = [], isLoading: isLoadingPublished } = useUserPublished(userId);

  // Determine if any data is currently being fetched
  // const isLoading = isLoadingDrafts || isLoadingScheduled || isLoadingPublished;

  


  
  return (
   <>
      <DashHeaderRight
        title="My Posts"
        titleSecondary={
          <div className="text-sm text-[#071019] flex items-center gap-[6px]">
            <div className="h-[6px] w-[6px] rounded-full bg-[#FFBC58]"></div>
            Post Scheduled at 16:00
          </div>
        }
        desc="Schedule, manage and post your ideas • Last Drafted on 10th Nov 2023"
      />
      <TabsToggler
        tabOptions={tabOptions}
        active={activeTab}
        setActive={setActiveTab}
      />
{/*       
      {isLoading ? (
        <Spinner /> // Display a loading spinner while data is loading
      ) : (
        <div className="p-6">
          {activeTab === 'drafts' && <Drafts drafts={drafts} isLoading={isLoadingDrafts} />}
          {activeTab === 'scheduled' && <ScheduledComponent scheduledPosts={scheduled} isLoading={isLoadingScheduled} />}
          {activeTab === 'published' && <PublishedComponent published={published} isLoading={isLoadingPublished}  />}
          {activeTab === 'insights' && <div>Insights</div>}
        </div>
      )} */}
      </>
  );
};

export default NewDashboard;
