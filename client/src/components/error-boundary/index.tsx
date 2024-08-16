import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorMessage: "" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ errorMessage: `${error.message} ${info.componentStack} ` });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div>{this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

