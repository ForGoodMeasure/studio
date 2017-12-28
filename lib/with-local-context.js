import React from 'react';
import PropTypes from 'prop-types';

function withLocalContext(WrappedComponent, localContext) {
  class LocalContextWrapper extends React.Component {
    getChildContext() {
      return {
        localContext
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  LocalContextWrapper.childContextTypes = {
    localContext: PropTypes.object
  }

  return LocalContextWrapper;
}

export default withLocalContext;
