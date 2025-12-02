import { Button } from "@/components/blocks/button/Button";
import { RouteConfig } from "@/data/constants/route";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/libs/styles/cn";
import { GlobeIcon, PersonIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

export const SearchViewToggle: FC = () => {
  const { isLogin } = useAuth();
  const pathname = usePathname();

  const googleAuthHandler = async () => {
    await signIn("google", { callbackUrl: RouteConfig.my });
  };

  return (
    <div className="bg-gray-100 rounded-md p-1 box-border">
      <SearchViewToggleLink
        linkTo={RouteConfig.home}
        icon={<GlobeIcon width={8} />}
        label="통합 검색"
        active={pathname === RouteConfig.home}
      />

      {isLogin ? (
        <SearchViewToggleLink
          linkTo={RouteConfig.my}
          icon={<PersonIcon width={8} />}
          label="나의 목록"
          active={pathname === RouteConfig.my}
        />
      ) : (
        <SearchViewToggleButton
          icon={<PersonIcon width={8} />}
          label="나의 목록"
          active={pathname === RouteConfig.my}
          onClick={googleAuthHandler}
        />
      )}
    </div>
  );
};

interface SearchViewToggleButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SearchViewToggleButton: FC<SearchViewToggleButtonProps> = ({
  active,
  icon,
  label,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("rounded-md", active ? "bg-blue-100" : "bg-gray-100")}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex items-center gap-1",
          active ? " text-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
        <span className={cn("font-medium text-xs")}>{label}</span>
      </div>
    </Button>
  );
};

interface SearchViewToggleLinkProps {
  icon: React.ReactNode;
  linkTo: string;
  label: string;
  active: boolean;
}

const SearchViewToggleLink: FC<SearchViewToggleLinkProps> = ({
  icon,
  linkTo,
  label,
  active,
}) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("rounded-md", active ? "bg-blue-100" : "bg-gray-100")}
    >
      <Link href={linkTo}>
        <div
          className={cn(
            "flex items-center gap-1",
            active ? " text-foreground" : "text-muted-foreground"
          )}
        >
          {icon}
          <span className={cn("font-medium text-xs")}>{label}</span>
        </div>
      </Link>
    </Button>
  );
};
