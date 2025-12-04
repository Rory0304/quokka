"use client";

import { FC } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster: FC<ToasterProps> = (props) => {
  return <Sonner className="toaster group" position="top-center" {...props} />;
};

export { Toaster };
