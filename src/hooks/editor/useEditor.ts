import {
  EditorDispatchContext,
  EditorValueContext,
} from "@/components/pages/editor/contexts/context";

import { useContext } from "react";

export const useEditor = () => {
  const state = useContext(EditorValueContext);
  const dispatch = useContext(EditorDispatchContext);

  const editorLayout = state.data.find(
    (data) => data.id === state.state.selectedLayerId
  )?.layout;

  const editorTemplate = state.data.find(
    (data) => data.id === state.state.selectedLayerId
  )?.template;

  return {
    state,
    initialState: state.intiailData,

    editorState: state.state,
    editorData: state.data,
    editorConfig: state.config,
    editorLayout,
    editorTemplate,

    dispatch,
  };
};
