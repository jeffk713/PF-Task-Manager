import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    const { hasErrored } = this.state;
    if (hasErrored) {
      return (
        <Fragment>
          <img className='error-page' src={'https://i.imgur.com/yW2W9SC.png'} />
          <p className='error-message'>Something went wrong.</p>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
