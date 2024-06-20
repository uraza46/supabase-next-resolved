// components/DraftCard.tsx

import React from 'react';
import { PenIcon, PenWithLineIcon } from './Icons';
import Link from 'next/link';
import { Draft } from '~/core/session/types/drafts';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import { deleteDraft } from '~/lib/drafts/mutation';
import useSupabase from '~/core/hooks/use-supabase';
import useUserSession from '~/core/hooks/use-user-session';
import useRefresh from '~/core/hooks/use-refresh';

interface DraftCardProps {
  draft: Draft,
  onDelete: (draftId: number) => void;

}
function truncateText(text: string, maxLength:number) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}


function DraftCard({ draft, onDelete }: DraftCardProps) {
  // Format the date
  const lastEditedDate = new Date(draft.postDate).toLocaleString();

  // Calculate the character count
  const characterCount = draft.content.length;

  const organizationId = useCurrentOrganization()?.uuid;
  const editandpublish = `/dashboard/${organizationId}/post-generator/edit-and-publish`

  const truncatedContent = truncateText(draft.content, 100);
  const supabaseClient = useSupabase();
  const userSession = useUserSession();
  const userId = userSession?.auth.user.id;
  const handleDelete = async () => {
   
    onDelete(draft.id as number)
  };
  return (
    <div className="p-4 rounded-sm border border-[#E0E1E3]">
      <div className="text-sm text-[#5B606A] mb-4">
        Last edited on {lastEditedDate} • {characterCount} Characters
      </div>
      <div className="mb-4">
      <div className="text-sm leading-[22px] overflow-hidden">
          {truncatedContent}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="text-sm text-[#5B606A] hover:text-red-500"
          onClick={handleDelete}
        >
          Delete Post
        </button>
        <Link href={{
           pathname:editandpublish,
           query:{
             article: draft.content,
             draft: true
           }
        }}>
        <button
          type="button"
          className="bg-[#F6F7F9] text-[#5B606A] px-4 py-2 flex items-center justify-center gap-1 text-sm font-medium"
        >
          <PenWithLineIcon /> Edit And Publish
        </button>
        </Link>

      </div>
    </div>
  );
}

export default DraftCard;
function onDelete(id: number | undefined) {
  throw new Error('Function not implemented.');
}

