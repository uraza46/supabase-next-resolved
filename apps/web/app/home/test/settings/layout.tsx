import React from 'react';

import NavigationMenu from '@kit/ui/Navigation/NavigationMenu';
import NavigationItem from '@kit/ui/Navigation/NavigationItem';
import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import { PageBody } from '@kit/ui/Page';
import Trans from '@kit/ui/Trans';
import configuration from '~/configuration';

const getLinks = (organizationId: string) => [
  {
    path: getPath(organizationId, 'settings/profile'),
    label: 'common:profileSettingsTabLabel',
  },
  {
    path: getPath(organizationId, 'settings/organization'),
    label: 'common:organizationSettingsTabLabel',
  },
  {
    path: getPath(organizationId, 'settings/subscription'),
    label: 'common:subscriptionSettingsTabLabel',
  },
];

async function SettingsLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  const links = getLinks(params.organization);

  return (
    <>
      <AppHeader
        title={<Trans i18nKey={'common:settingsTabLabel'} />}
        description={<Trans i18nKey={'common:settingsTabDescription'} />}
      />

      <PageBody>
        <NavigationMenu bordered>
          {links.map((link) => (
            <NavigationItem
              className={'flex-1 lg:flex-none'}
              link={link}
              key={link.path}
            />
          ))}
        </NavigationMenu>

        <div
          className={`mt-4 flex h-full flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0`}
        >
          {children}
        </div>
      </PageBody>
    </>
  );
}

export default withI18n(SettingsLayout);

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return `${appPrefix}/${organizationId}/${path}`;
}
