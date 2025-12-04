import { useNavigationGuard } from "next-navigation-guard";

interface useNavgationGuardProps {
  enabled: boolean;
}

export const useNavgationGuard = ({ enabled }: useNavgationGuardProps) => {
  const navGuard = useNavigationGuard({ enabled });

  const onCancel = () => {
    navGuard.reject();
  };

  const onDiscard = () => {
    navGuard.accept();
  };

  return {
    active: navGuard.active,
    onCancel,
    onDiscard,
  };
};
