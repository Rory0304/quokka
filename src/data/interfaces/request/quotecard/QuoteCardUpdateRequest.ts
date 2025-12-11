import { EditorData } from '../../editor';
import { QuoteCardCreateRequest } from './QuoteCardCreateRequest';

export interface QuoteCardUpdateRequest {
  id: EditorData['id'];
  data: Partial<QuoteCardCreateRequest>;
}
