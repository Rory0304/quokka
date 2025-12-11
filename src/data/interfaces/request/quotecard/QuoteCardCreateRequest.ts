import { Editor } from '../../editor/Editor';
import { EditorConfig } from '../../editor/EditorConfig';

export interface QuoteCardCreateRequest {
  title: EditorConfig['title'];
  category: EditorConfig['category'];
  tags: EditorConfig['tags'];
  isPublic: EditorConfig['isPublic'];
  customFields: Pick<Editor, 'data'>;
  thumbnailUrl?: string;
}
