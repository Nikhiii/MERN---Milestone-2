import * as React from 'react';
import './layout.css';


  export const  Layout = ({ children }) => {
    return <div className="layout">{children}</div>;
  }
  
  export const Top = ({ children }) => {
    return <div className="top">{children}</div>;
  }
  
  export const Middle = ({ children }) => {
    return <div className="middle">{children}</div>;
  }
  
  export const Bottom = ({ children }) => {
    return <div className="bottom">{children}</div>;
  }
  
  export default Layout;