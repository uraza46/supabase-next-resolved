// routes.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { enhanceRouteHandler } from '@kit/next/routes';
import { z } from 'zod';
import { getSupabaseRouteHandlerClient } from '@kit/supabase/route-handler-client';
import { savePublishedPost } from '~/lib/published/savePublished';

// Initialize Supabase client with service role key for server-side operations
const supabaseUrl = 'https://ytglvcvtkvotdmiqwpsc.supabase.co/';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Zod schema for request validation
const ZodSchema = z.object({
  content: z.string().min(1),
});

async function publishToLinkedIn(content: string, accessToken: string, linkedInUserId: string): Promise<string> {
  const url = `https://api.linkedin.com/v2/ugcPosts`;

  const payload = {
    author: `urn:li:person:${linkedInUserId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: content,
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`LinkedIn API request failed: ${errorData.message}`);
  }

  const responseData = await response.json();
  const postId = responseData.id;

  if (!postId) {
    throw new Error('LinkedIn API response did not include a Post ID.');
  }

  return postId;
}

function getLinkedInPostUrl(postId: string) {
  const numericId = postId.split(':').pop();
  return `https://www.linkedin.com/feed/update/urn:li:share:${numericId}`;
}

export const POST = enhanceRouteHandler(
  async function({ body, user, request }) {
    const client = getSupabaseRouteHandlerClient();

    const { content } = body;

    const accessToken = request.cookies.get('4k8j5H2mN9qV1zX')?.value;
    const linkedInUserId = user?.user_metadata?.provider_id;

    if (!accessToken || !linkedInUserId) {
      return NextResponse.json({ error: 'LinkedIn access token or user ID is missing' }, { status: 400 });
    }

    const postId = await publishToLinkedIn(content, accessToken, linkedInUserId);
    const postUrl = getLinkedInPostUrl(postId);
    const postDate = new Date().toISOString();

    const newPublished = {
      postId,
      postContent: content,
      postUrl,
      postDate,
    };

    await savePublishedPost(client, user.id, newPublished);

    return NextResponse.json({ message: 'Post published successfully', postUrl }, { status: 200 });
  },
  {
    schema: ZodSchema,
    captcha: false,
    captureException: true,
    
  }
);
