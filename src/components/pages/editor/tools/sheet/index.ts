import { SheetContainer } from './SheetContainer';
import { SheetDivider } from './SheetDivider';
import { SheetItemContainer } from './SheetItemContainer';
import { SheetItemTitle } from './SheetItemTitle';
import { SheetTitle } from './SheetTitle';

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
