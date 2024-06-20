'use client';

import Alert from '@kit/ui/Alert';
import If from '@kit/ui/If';
import Trans from '@kit/ui/Trans';
import useUser from '~/core/hooks/use-user';

import UpdatePasswordForm from './UpdatePasswordForm';

function UpdatePasswordFormContainer() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  const canUpdatePassword = user.identities?.some(
    (item) => item.provider === `email`,
  );

  return (
    <If
      condition={canUpdatePassword}
      fallback={<WarnCannotUpdatePasswordAlert />}
    >
      <UpdatePasswordForm user={user} />
    </If>
  );
}

export default UpdatePasswordFormContainer;

function WarnCannotUpdatePasswordAlert() {
  return (
    <Alert type={'warn'}>
      <Trans i18nKey={'profile:cannotUpdatePassword'} />
    </Alert>
  );
}
