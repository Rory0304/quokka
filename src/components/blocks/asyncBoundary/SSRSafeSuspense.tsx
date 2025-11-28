import { useMounted } from "@/hooks/common/useMounted";
import { ComponentProps, Suspense } from "react";

export default function SSRSafeSuspense(
  props: ComponentProps<typeof Suspense>
) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
}
