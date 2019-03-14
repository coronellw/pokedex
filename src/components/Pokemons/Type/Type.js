import React from 'react';

import './Type.css';

const Type = props => {

  return <div className={'Type ' + props.type}>
    {props.type}
  </div>;
};

export default Type;