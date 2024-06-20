import React from 'react';
import { PenWithLineIcon } from './Icons';
import Link from 'next/link';

function OutputItem(props: any) {
  const { article, organizationId } = props;
  
  return (
    <div className="border border-[#E0E1E3] p-6 mb-6 pb-[88px] relative">
     <div className="text-sm leading-[22px]"  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} >
        {article}
      </div>
      <Link href={{
        pathname:"edit-and-publish/",
        query:{
          article: article
        }

    }}>
        <button
          type="button"
          className="text-sm leading-[24px] text-[#071019] absolute bottom-6 bg-[#F6F7F9] py-2 px-4 font-semibold flex gap-2 rounded-[8px]"
        >
          <PenWithLineIcon /> Edit And Publish
        </button>
      </Link>
    </div>
  );
}

export default OutputItem;
