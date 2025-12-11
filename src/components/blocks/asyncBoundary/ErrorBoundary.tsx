import { Component, ComponentType, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  errorFallback: ({ reset }: { reset: () => void }) => React.ReactNode;
  resetQuery: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };

    this.reset = this.reset.bind(this);
  }

  /** 오류 발생 시 상태값을 업데이트함 */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /** 에러 상태 초기화 */
  reset(): void {
    this.props.resetQuery();

    this.setState({
      hasError: false,
      error: null,
    });
  }

  /** 오류 로깅 */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { errorFallback } = this.props;

    if (this.state.hasError) {
      return errorFallback({
        reset: this.reset,
      });
    }

    return this.props.children;
  }
}
