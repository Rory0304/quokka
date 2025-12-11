import { ComponentProps, Suspense } from 'react';

import { useMounted } from '@/hooks/common/useMounted';

export default function SSRSafeSuspense(
  props: ComponentProps<typeof Suspense>
) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
}
