import { SheetItemContainer } from "./SheetItemContainer";
import { SheetDivider } from "./SheetDivider";
import { SheetItemTitle } from "./SheetItemTitle";
import { SheetTitle } from "./SheetTitle";
import { SheetContainer } from "./SheetContainer";

export const Sheet = Object.assign(
  {
    Container: SheetContainer,
    Title: SheetTitle,
    ItemTitle: SheetItemTitle,
    ItemContainer: SheetItemContainer,
    Divider: SheetDivider,
  },
  {}
);
