import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../button/Button";
import Link from "next/link";
import { RouteConfig } from "@/data/constants/route";

interface ErrorAlertProps {
  title: string;
  description: string;
  onReset?: () => void;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({
  title,
  description,
  onReset,
}) => {
  const handleReset = () => {
    onReset?.();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Image
          src="/qukka_error.png"
          width={240}
          height={240}
          alt="error occured"
          className="mb-4"
        />
        <h1 className="text-foreground text-xl mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" asChild>
            <Link href={RouteConfig.home}>홈으로</Link>
          </Button>
          {typeof onReset === "function" ? (
            <Button variant="default" onClick={handleReset}>
              다시 시도
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
