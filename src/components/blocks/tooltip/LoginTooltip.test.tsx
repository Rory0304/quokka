import { useAuth } from '@/hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginTooltip } from './LoginTooltip';
import { TooltipProvider } from './Tooltip';

// useAuth 훅 mock
vi.mock('@/hooks/auth', () => ({
  useAuth: vi.fn(),
}));

// next-auth/react mock
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

describe('LoginTooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로그인하지 않았을 때 Login Tooltip이 보여야 한다', async () => {
    // 로그인하지 않은 상태로 mock 설정
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLogin: false,
    });

    const user = userEvent.setup();

    render(
      <TooltipProvider delayDuration={0}>
        <LoginTooltip>
          <button>Tooltip Trigger</button>
        </LoginTooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Tooltip Trigger');
    const text = '로그인 후 이용 가능합니다';

    // hover 전 툴팁이 표시되지 않는지 확인
    expect(screen.queryByText(text)).not.toBeInTheDocument();

    await user.hover(trigger);

    // hover 후 툴팁이 표시되는지 확인
    await waitFor(() => {
      // Get the first instance of the tooltip content because the second is
      // the visually hidden primitive.
      // ref: https://github.com/radix-ui/primitives/blob/main/packages/react/tooltip/src/tooltip.test.tsx
      expect(screen.queryAllByText(text)[0]).toBeVisible();
    });
  });

  it('로그인했을 때는 children만 렌더링해야 한다', () => {
    // 로그인한 상태로 mock 설정
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLogin: true,
    });

    render(
      <TooltipProvider>
        <LoginTooltip>
          <button>Tooltip Trigger</button>
        </LoginTooltip>
      </TooltipProvider>
    );

    // Tooltip Trigger 가 존재하는지 확인
    expect(screen.getByText('Tooltip Trigger')).toBeInTheDocument();

    // 로그인 후 이용 툴팁이 존재하지 않는지 확인
    expect(
      screen.queryByText('로그인 후 이용 가능합니다')
    ).not.toBeInTheDocument();
  });
});
