import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import { createAuthCallbackService } from '@kit/supabase/auth';
import { getSupabaseRouteHandlerClient } from '@kit/supabase/route-handler-client';

import pathsConfig from '~/config/paths.config';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const service = createAuthCallbackService(getSupabaseRouteHandlerClient());
  const requestUrl = new URL(request.url);

  const searchParams = requestUrl.searchParams;
  let userId;
  const authCode = searchParams.get('code');
  const client = getSupabaseRouteHandlerClient();
  if(authCode){
   const{data,error} = await  client.auth.exchangeCodeForSession(authCode);

   

   


    if(data.session?.provider_token){
      cookies().set("4k8j5H2mN9qV1zX",data.session?.provider_token)
    }     

  }

  const { nextPath } = await service.exchangeCodeForSession(request, {
    joinTeamPath: pathsConfig.app.joinTeam,
    redirectPath: pathsConfig.app.home,
  });

  return redirect(nextPath);
}
