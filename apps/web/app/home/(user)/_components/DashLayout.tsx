'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Button from '@kit/ui/Button';
import { PlusIcon } from '@heroicons/react/24/solid';
import MyIcon from './MyIcon';
import { PageBody } from '@kit/ui/Page';
import Container from '@kit/ui/Container';
import LogoImage from '@kit/ui/Logo/LogoImage';
import { usePathname } from 'next/navigation';
import configuration from '~/configuration';
import SubscriptionStatusBadge from './organizations/SubscriptionStatusBadge';
import useSupabase from '~/core/hooks/use-supabase';


import {
  ContentInspirationActive,
  ContentInspirationInActive,
  HelpIconActive,
  HelpIconInActive,
  Menu,
  MyPostsActive,
  MyPostsInactive,
  PostGeneratorActive,
  PostGeneratorInactive,
  SettingIconActive,
  SettingIconInActive,
  Times,
} from './Icons';
import { useGlobalContext } from '~/content/store';
import ProfileDropdown from '~/components/ProfileDropdown';

import useUserSession from '~/core/hooks/use-user-session';
import useSignOut from '~/core/hooks/use-sign-out';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import getSupabaseBrowserClient from '~/core/supabase/browser-client';
import { getUserById } from '~/lib/user/database/queries';
import { SupabaseClient } from '@supabase/supabase-js';

const Navlinks = (props: any) => {
  const { active, href, children, activeSvg, inActiveSvg, ...rest } = props;
  // console.log('HREF', typeof href);
  return (
    <>
      <Link
        href={href ?? '/'}
        className={`flex items-center gap-3 py-3 px-6    navlinks-bg   ${active && 'font-semibold navlinks-active-bg border-[#007FFF] border-r-2 '}`}
        {...rest}
      >
        {active ? activeSvg : inActiveSvg} {children}
      </Link>
    </>
  );
  
};

const generateDashboardUrl = (organizationId: any, path: any) => {
  return `/dashboard/${organizationId}/${path}`;
};

function  DashLayout(props: any) {
  

  const { children } = props;
  const { sideBarOpen, setSideBarOpen } = useGlobalContext();
  const pathname = usePathname();
  const userSession = useUserSession();
  const signOut = useSignOut();
  const organizationUid = props.organizationUid;

  
  const postGeneratorUrl = generateDashboardUrl(organizationUid, 'post-generator/edit-and-publish');
  const myPostsUrl = generateDashboardUrl(organizationUid, 'post-generator');
  const contentInspirationUrl = generateDashboardUrl(organizationUid, 'content-inspiration');
  const helpUrl = generateDashboardUrl(organizationUid, 'help');
  const settingsUrl = generateDashboardUrl(organizationUid, 'settings');
  const dashboardurl = generateDashboardUrl(organizationUid,'/');

  const  supabase  =  useSupabase().auth.getSession();

  

  


  

  return (
    <>
      <div className=" flex max-h-screen h-screen ">
        <div
          className={`leftt fixed z-30 w-screen lg:w-[236px] lg:static flex flex-col justify-between h-screen lg:max-h-full overflow-auto overflow-y-scroll  bg-[#F6F7F9] pt-6 scroll-m-0  transition-all ${sideBarOpen ? 'translate-x-0 lg:translate-x-0' : 'translate-x-[-100vw] lg:translate-x-0'} `}
        >
          <div className="topp">
            <div className="flex  w-fit gap-5 pl-6 mb-6">
              <Button
                round
                href="#"
                className="lg:hidden bg-white text-[#071019] hover:bg-[#ececec] w-fit "
                onClick={() => setSideBarOpen(!sideBarOpen)}
              >
                <Times />
              </Button>
              <div className="h-9 w-44 flex items-center">
                <LogoImage />
              </div>
            </div>
            <Button
              round
              href={postGeneratorUrl}
              className="ml-6 mb-6"
              onClick={() => setSideBarOpen(false)}
            >
              <span className="flex items-center justify-center gap-2">
                <PlusIcon height={18} width={18} />
                Create a Post new
              </span>
            </Button>

            <div className="navlinks">
              <Navlinks
                active={pathname.startsWith('/post-generator')}
                href={myPostsUrl}
                activeSvg={<PostGeneratorActive />}
                inActiveSvg={<PostGeneratorInactive />}
                onClick={() => setSideBarOpen(false)}
              >
                Post Generator
              </Navlinks>
              <Navlinks
                active={pathname === '/newdashboard'}
                href={dashboardurl}
                activeSvg={<MyPostsActive />}
                inActiveSvg={<MyPostsInactive />}
                onClick={() => setSideBarOpen(false)}
              >
                My Posts
              </Navlinks>
              <Navlinks
                active={pathname === '/'}
                href={myPostsUrl}
                activeSvg={<ContentInspirationActive />}
                inActiveSvg={<ContentInspirationInActive />}
                onClick={() => setSideBarOpen(false)}
              >
                Content Inspiration
              </Navlinks>
            </div>
          </div>
          <div className="bottomm pb-6">
            <div className="px-6">
              <div className="seperatorr h-[1px] bg-[#E0E1E3] m-auto my-6"></div>
            </div>
            <div className="navlinks">
              <Navlinks
                active={pathname === '/'}
                href={myPostsUrl}
                activeSvg={<HelpIconActive />}
                inActiveSvg={<HelpIconInActive />}
                onClick={() => setSideBarOpen(false)}
              >
                Help
              </Navlinks>
              <Navlinks
                active={pathname === '/'}
                href={myPostsUrl}
                activeSvg={<SettingIconActive />}
                inActiveSvg={<SettingIconInActive />}
                onClick={() => setSideBarOpen(false)}
              >
                Settings
              </Navlinks>
            </div>
            <div className="px-6">
              <div className="words__generated__box py-4 px-2 rounded-sm border border-[#E0E1E3] mt-6">
                <MyIcon size={24} />
                <div className="font-semibold text-2xl mb-1 mt-3">
                  Words Generated
                </div>
                <div className="text-xs mb-3">5k/10k</div>
                <div className="w-full bg-[#E0E1E3] h-1  rounded-full">
                  <div className="bg-blue-500 h-full w-[50%] rounded-full"></div>
                </div>
                <div className="text-xs my-3">
                  You are on a free trial which ends on{' '}
                  <span className="font-bold">12/01/2024</span>
                </div>
                <Link
                  href="#"
                  className="text-[#007FFF] font-semibold text-sm"
                  onClick={() => setSideBarOpen(false)}
                >
                  Upgrade Now
                </Link>
              </div>

              <div className="seperatorr h-[1px] bg-[#E0E1E3] m-auto my-6"></div>
              <div className="user-info__section flex gap-2">
             
              </div>
              <div className="user-info__section flex gap-2">
                <div className="img "><ProfileDropdownContainer collapsed={!props.collapsed} userSession={userSession} signOut={signOut} /></div>
                <div className="name_and_email">
                  <div className="font-bold text-sm">{userSession?.data?.displayName}</div>
                  <div className="text-xs text-[#5B606A]">
                    {userSession?.auth.user.email}
                    
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button
              onClick={()=>{console.log(supabase)}}>

              </Button>
            </div>
          </div>
        </div>
        <div className="rightt flex-1 max-h-screen overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}

export default DashLayout;
function ProfileDropdownContainer(props: { collapsed: boolean, userSession:any, signOut:any }) {
  

  return (
    <div className={props.collapsed ? '' : 'w-full'}>
      <StatusBadge />

      <ProfileDropdown
        displayName={!props.collapsed}
        className={'w-full'}
        userSession={props.userSession}
        signOutRequested={props.signOut}
      />


      

      
    </div>
  );
}

function StatusBadge() {
  const organization = useCurrentOrganization();
  const subscription = organization?.subscription?.data;

  const isActive = ['active', 'trialing'].includes(
    subscription?.status ?? 'free',
  );

  // if the organization has an active subscription
  // we do not show the subscription status badge
  if (isActive || !subscription) {
    return null;
  }

  const appPrefix = configuration.paths.appPrefix;
  const href = `/${appPrefix}/${organization?.uuid}/settings/subscription`;

  // in all other cases we show the subscription status badge
  // which will show the subscription status and a link to the subscription page
  return (
    <Link href={href}>
      <SubscriptionStatusBadge subscription={subscription} />
    </Link>
  );
}
