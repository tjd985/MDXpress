import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError) {
      return <FallbackComponent error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
