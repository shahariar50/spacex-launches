import React from "react";

const SingleListButton = ({ children, isctive = false, ...props }) => {
  return (
    <li
      type="button"
      className={`list-group-item ${isctive ? "active" : ""}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default SingleListButton;
