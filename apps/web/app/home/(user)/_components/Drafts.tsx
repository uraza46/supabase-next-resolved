// components/Drafts.tsx

import React, { useEffect, useState } from 'react';
import DraftCard from './DraftCard';
import useUserSession from '~/core/hooks/use-user-session';
import { useUserDrafts } from '~/hooks/useUserDrafts';
import { Draft } from '~/core/session/types/drafts';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import useRefresh from '~/core/hooks/use-refresh';
import { deleteDraft } from '~/lib/drafts/mutation';
import useDeleteDraft from '~/hooks/useDeleteDraft';
import Spinner from '@kit/ui/Spinner';
import Modal from '@kit/ui/Modal';

interface DraftsProps {
  drafts: Draft[]; // Use the Draft type from your types definitions
  isLoading: boolean;
}

 function  Drafts({drafts,isLoading} : DraftsProps) {
  const userSession = useUserSession();
  const userId = userSession?.auth.user.id;
  const {refetch} = useUserDrafts(userId);
  
  const deleteDraftMutation = useDeleteDraft();
  const [draftsList, setDraftsList] = useState<Draft[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update draftsList whenever the drafts prop changes
  useEffect(() => {
    setDraftsList(drafts);
  }, [drafts]);

  const handleDeleteDraft = async (draftId: number) => {
    console.log('deleting')
    setIsDeleting(true); // Show the spinner modal
    try {
      await deleteDraftMutation(userId as string, draftId);
      refetch(); // Refetch the drafts after deletion
    } catch (error) {
      console.error('Failed to delete draft:', error);
      // Handle error (show error message to user)
    }
    setIsDeleting(false); // Hide the spinner modal
  };


  if (isLoading) return <div>Loading drafts...</div>;
 
  if (draftsList.length === 0) return <div>No Drafts</div>

  return (
    <>
    
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {draftsList.map((draft: Draft) => (
        <DraftCard draft={draft} key={draft.id} onDelete={handleDeleteDraft} />
      ))}
    </div>
    </>
  );
}

export default Drafts;
