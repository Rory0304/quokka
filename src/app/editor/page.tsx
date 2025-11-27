"use client";

import { EditorTool } from "@/components/pages/editor/tools/EditorTool";
import { useReducer, useRef, Suspense } from "react";
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
import { ErrorBoundary } from "react-error-boundary";
import { createEditorStateFromQuoteCard } from "./utils";
import { useQuoteCard } from "@/hooks/quoteCard/useQuoteCard";

function EditorContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { quoteCard, isLoading } = useQuoteCard(id);

  const quoteCardRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, quoteCard, (card) =>
    card ? createEditorStateFromQuoteCard(card) : initalEditorState
  );

  if (isLoading) return null;

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
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-2">
              Failed to load quote card
            </p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quote card...</p>
            </div>
          </div>
        }
      >
        <EditorContent />
      </Suspense>
    </ErrorBoundary>
  );
}
