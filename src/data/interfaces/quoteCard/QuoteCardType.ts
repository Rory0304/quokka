import { Editor } from "../editor/Editor";

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
}
