import React from "react";
import PropTypes from "prop-types";

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

ErrorBoundary.propTypes = {
  FallbackComponent: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
