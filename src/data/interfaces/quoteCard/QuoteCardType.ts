import { Editor } from "../editor/Editor";

export interface QuoteCardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface QuoteCardType {
  id: string;
  userId: string;
  customFields: Pick<Editor, "data">;
  title: string;
  isPublic: boolean;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  isBookmarked?: boolean;
  user?: QuoteCardUser;
}
