import { useNavgationGuard } from "../common";
import { useEditor } from "./useEditor";
import { isEqual } from "es-toolkit/predicate";

/**
 * 뒤로가기, 새로고침을 방지하는 훅
 * - 폼이 변경되었을 경우: 활성화
 * - 에디엍 저장/업데이트 후 리다이렉트하는 경우: 비활성화
 */
export const useEditorNavigationGuard = () => {
  const {
    editorState: { isSaving },
    state,
    initialState,
  } = useEditor();

  const {
    onCancel,
    onDiscard,
    active: openSaveModal,
  } = useNavgationGuard({
    enabled:
      !isEqual(
        {
          config: state.config,
          data: state.data,
        },
        initialState
      ) && !isSaving,
  });

  return {
    onCancel,
    onDiscard,
    openSaveModal,
  };
};
