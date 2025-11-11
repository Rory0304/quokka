"use client";

import { EditorTool } from "@/components/pages/editor/tools/EditorTool";
import { useReducer } from "react";
import { reducer } from "./reducer";
import {
  EditorDispatchContext,
  EditorValueContext,
  initalEditorState,
} from "./context";
import { BookCard } from "@/components/pages/editor/bookCard/BookCard";

export default function Editor() {
  const [state, dispatch] = useReducer(reducer, initalEditorState);

  return (
    <div className="h-">
      <EditorValueContext.Provider value={state}>
        <EditorDispatchContext.Provider value={dispatch}>
          <BookCard />
          <EditorTool />
        </EditorDispatchContext.Provider>
      </EditorValueContext.Provider>
    </div>
  );
}
