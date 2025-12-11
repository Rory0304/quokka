'use client';

import React, { FC, useEffect, useReducer, useRef, useState } from 'react';

import { createEditorStateFromQuoteCard } from '@/app/editor/utils';
import { ErrorAlert } from '@/components/blocks/alert/ErrorAlert';
import { AsyncBoundary } from '@/components/blocks/asyncBoundary/AsyncBoundary';
import { EditorDesktopOnlyView } from '@/components/pages/editor/EditorDesktopOnlyView';
import { EditorMain } from '@/components/pages/editor/EditorMain';
import {
  EditorDispatchContext,
  EditorHandlerContext,
  EditorValueContext,
} from '@/components/pages/editor/contexts/context';
import { reducer } from '@/components/pages/editor/contexts/reducer';
import { EditorNavigation } from '@/components/pages/editor/navigation/EditorNavigation';
import { EditorTool } from '@/components/pages/editor/tools/EditorTool';
import { useEditor } from '@/hooks/editor/useEditor';
import { useQuoteCard } from '@/hooks/quoteCard/useQuoteCard';
import { useSearchParams } from 'next/navigation';

const EditorContent: FC = () => {
  const searchParams = useSearchParams();

  const { dispatch } = useEditor();
  const [id, setId] = useState('');

  useEffect(() => {
    const idQuery = searchParams.get('id');

    if (idQuery) {
      setId(idQuery);
    }
  }, [searchParams]);

  const { quoteCard } = useQuoteCard(id);

  const quoteCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quoteCard) {
      dispatch({
        type: 'INIT_STATE',
        payload: createEditorStateFromQuoteCard(quoteCard),
      });
    }
  }, [quoteCard, dispatch]);

  return (
    <EditorHandlerContext.Provider
      value={{
        quoteCardRef,
      }}
    >
      <EditorNavigation />
      <div className="relative w-full bg-gray-100 flex flex-row justify-between min-h-full gap-4 pt-16">
        <EditorMain />
        <EditorTool />
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white sm:hidden">
        <EditorDesktopOnlyView />
      </div>
    </EditorHandlerContext.Provider>
  );
};

export default function Editor() {
  const [state, dispatch] = useReducer(
    reducer,
    createEditorStateFromQuoteCard(null)
  );

  return (
    <EditorValueContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        <AsyncBoundary
          pendingFallback={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">인용 카드를 생성 중입니다...</p>
              </div>
            </div>
          }
          errorFallback={({ reset }) => (
            <ErrorAlert
              title="관련 정보를 찾지 못했어요"
              description="주소가 정확한지 확인해주세요"
              onReset={reset}
            />
          )}
        >
          <EditorContent />
        </AsyncBoundary>
      </EditorDispatchContext.Provider>
    </EditorValueContext.Provider>
  );
}
