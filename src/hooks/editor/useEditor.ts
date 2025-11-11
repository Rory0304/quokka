import {
  EditorDispatchContext,
  EditorValueContext,
} from "@/app/editor/context";
import { useContext } from "react";

export const useEditor = () => {
  const state = useContext(EditorValueContext);
  const dispatch = useContext(EditorDispatchContext);

  return { state, dispatch };
};
