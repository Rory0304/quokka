import { Button } from "@/components/blocks/button/Button";
import { RouteConfig } from "@/data/constants/route";
import { cn } from "@/libs/styles/cn";
import { GlobeIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

export const SearchViewToggle: FC = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 rounded-md p-1 box-border">
      <SearchViewToggleButton
        linkTo={RouteConfig.my}
        icon={<PersonIcon width={8} />}
        label="나의 목록"
        active={pathname === RouteConfig.my}
      />
      <SearchViewToggleButton
        linkTo={RouteConfig.home}
        icon={<GlobeIcon width={8} />}
        label="통합 검색"
        active={pathname === RouteConfig.home}
      />
    </div>
  );
};

interface SearchViewToggleButtonProps {
  icon: React.ReactNode;
  linkTo: string;
  label: string;
  active: boolean;
}

const SearchViewToggleButton: FC<SearchViewToggleButtonProps> = ({
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
