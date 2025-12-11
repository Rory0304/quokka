import React, { FC, useEffect, useRef, useState } from 'react';

import { LoadingIndicator } from '@/components/blocks/loading/LoadingIndicator';
import { LoginTooltip } from '@/components/blocks/tooltip/LoginTooltip';
import { Editor } from '@/data/interfaces/editor/Editor';
import { useAuth } from '@/hooks/auth';
import { useDebounce } from '@/hooks/common';
import { useEditor } from '@/hooks/editor/useEditor';
import { useQuoteCardUpdate } from '@/hooks/quoteCard/useQuoteCardUpdate';
import { cn } from '@/libs/styles/cn';
import { delay } from '@/libs/utils/delay';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const EditorTitleInput: FC = () => {
  const {
    dispatch,
    state,
    editorConfig: { title },
  } = useEditor();
  const { isLogin } = useAuth();

  const abortControllerRef = useRef<AbortController | null>(null);
  const isUserInputRef = useRef(false);
  const prevTitleRef = useRef(title);
  const mutation = useQuoteCardUpdate();
  const delayMutation = useMutation({
    mutationFn: () => {
      return delay(1000);
    },
  });

  const [value, setValue] = useState<string>(title);

  // 외부에서 title이 변경될 때 (데이터 fetch 등) value 동기화
  useEffect(() => {
    const isTitleChanged = prevTitleRef.current !== title;
    prevTitleRef.current = title;

    if (!isUserInputRef.current && isTitleChanged && value !== title) {
      setValue(title);
    }
    isUserInputRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const updateQuoteCardTitle = async ({
    quoteCardId,
    title,
    signal,
  }: {
    quoteCardId: Editor['id'];
    title: string;
    signal: AbortSignal;
  }) => {
    if (quoteCardId) {
      mutation.mutate(
        {
          signal,
          body: {
            id: quoteCardId,
            data: {
              title: title,
            },
          },
        },
        {
          onSuccess: () => {
            delayMutation.mutate();
          },
          onError: () => {
            toast.error('제목 수정에 오류가 발생했습니다.', {
              position: 'top-right',
            });
          },
        }
      );
    } else {
      if (isLogin) {
        // create and then mutate
      }
    }
  };

  useDebounce({
    deps: [value],
    ms: 400,
    fn: () => {
      if (!value || value === title) return;

      handleTitleInput(value);
    },
  });

  const handleTitleInput = (title: string) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: {
        title,
      },
    });

    // [TODO] AbortSignal 로직 확인
    if (state.id) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      updateQuoteCardTitle({
        quoteCardId: state.id,
        title,
        signal: abortControllerRef.current.signal,
      });
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      <LoginTooltip
        contentProps={{
          side: 'right',
        }}
      >
        <input
          placeholder="제목을 입력해주세요"
          type="text"
          className={cn(
            'border border-gray-200 px-2 py-1 rounded-md',
            mutation.isError && 'focus-within:bg-red-50',
            mutation.isPending && 'bg-gray-100 text-muted-foreground',
            isLogin === false && 'bg-gray-100 text-muted-foreground'
          )}
          onChange={e => {
            isUserInputRef.current = true;
            setValue(e.target.value);
          }}
          disabled={mutation.isPending || isLogin === false}
          value={value}
        />
      </LoginTooltip>
      <div
        className={cn(
          'pointer-events-none opacity-0 transition',
          (mutation.isError || mutation.isPending || delayMutation.isPending) &&
            'opacity-100'
        )}
      >
        {mutation.isPending ? (
          <LoadingIndicator />
        ) : mutation.isSuccess ? (
          <CheckIcon className="h-5 w-5 text-green-500" />
        ) : (
          <Cross1Icon className="h-5 w-5 text-red-500" />
        )}
      </div>
    </div>
  );
};
