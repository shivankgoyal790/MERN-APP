import React from 'react';

import './Loadingscreen.css';

const Loadingscreen = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loadingscreen;