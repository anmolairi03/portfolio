import React from 'react';
import NotFound from './NotFound';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

/** Any uncaught render error falls back to the 404/500 caveman page. */
class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[portfolio] render error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <NotFound reason="error" detail={this.state.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;