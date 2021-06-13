import React from 'react';
import { EmptyView } from 'components/dumb/general';
import { useC2DefaultMod } from 'services/concent';

interface IProps {
  /** auth id */
  authId: string | number;
  children: React.ReactElement;
}

// React.PropsWithChildren<IProps>
function AuthView(props: IProps): React.ReactElement {
  const ctx = useC2DefaultMod();
  const { globalState: { authIds } } = ctx;

  if (authIds.includes(`${props.authId}`)) return props.children;
  return <EmptyView />;
}

export default React.memo(AuthView);

