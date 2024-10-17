import React from 'react';
import './styles/Loading.css';

class Loading extends React.Component {
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
}

export { Loading };
