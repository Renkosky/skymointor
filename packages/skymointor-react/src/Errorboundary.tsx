import React, { ReactNode } from 'react';
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
interface ErrorBoundaryProps {
  onError?: (error: Error) => void;
  fallback?: ((error: Error | null) => ReactNode) | ReactNode;
  children: ReactNode;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  state = { hasError: false, error: null };


  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return typeof this.props.fallback === 'function' ? this.props.fallback(this.state.error) : this.props.fallback;
    }

    return this.props.children;
  }
}