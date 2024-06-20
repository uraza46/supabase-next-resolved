// lib/published/savePublishedPost.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Published } from '~/types/published';

export async function savePublishedPost(
  client: SupabaseClient,
  userId: string,
  newPublished: Omit<Published, 'id'>
): Promise<void> {
  // Fetch the user with the given ID
  const { data: user, error: fetchError } = await client
    .from('users')
    .select('id, published')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error('Error fetching user:', fetchError);
    throw fetchError;
  }

  if (!user) {
    throw new Error('User not found');
  }

  // Initialize published array if it doesn't exist
  const currentPublished = user.published || [];

  // Append the new published post to the existing array of published posts
  const updatedPublished = [...currentPublished, newPublished];

  // Update the user's published posts
  const { error: updateError } = await client
    .from('users')
    .update({ published: updatedPublished })
    .eq('id', userId);

  if (updateError) {
    console.error('Error updating user published posts:', updateError);
    throw updateError;
  }
}
