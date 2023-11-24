import * as React from 'react';
import './label.css';



function Label({ children }) {
  return <h3 className="label">{children}</h3>;
}

export default Label;