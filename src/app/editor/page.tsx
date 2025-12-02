"use client";

import { EditorTool } from "@/components/pages/editor/tools/EditorTool";
import { useReducer, useRef } from "react";
import { reducer } from "../../components/pages/editor/contexts/reducer";
import {
  EditorDispatchContext,
  EditorHandlerContext,
  EditorValueContext,
  initalEditorState,
} from "../../components/pages/editor/contexts/context";
import { EditorMain } from "@/components/pages/editor/EditorMain";
import { EditorNavigation } from "@/components/pages/editor/navigation/EditorNavigation";
import { useSearchParams } from "next/navigation";
import { createEditorStateFromQuoteCard } from "./utils";
import { useQuoteCard } from "@/hooks/quoteCard/useQuoteCard";
import { AsyncBoundary } from "@/components/blocks/asyncBoundary/AsyncBoundary";
import { ErrorAlert } from "@/components/blocks/alert/ErrorAlert";

function EditorContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { quoteCard } = useQuoteCard(id);

  const quoteCardRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, quoteCard, (card) =>
    card ? createEditorStateFromQuoteCard(card) : initalEditorState
  );

  return (
    <EditorValueContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        <EditorHandlerContext.Provider
          value={{
            quoteCardRef,
          }}
        >
          <EditorNavigation />
          <div className="relative w-full bg-gray-100 flex flex-row justify-between h-full gap-4 pt-16">
            <EditorMain />
            <EditorTool />
          </div>
        </EditorHandlerContext.Provider>
      </EditorDispatchContext.Provider>
    </EditorValueContext.Provider>
  );
}

export default function Editor() {
  return (
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
  );
}
