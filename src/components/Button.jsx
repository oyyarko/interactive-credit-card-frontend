import React from "react";

const Button = (props) => {
  return (
    <button
      className="bg-ultra-dark-grayish-violet text-white rounded-lg p-3 mt-5 font-medium min-w-full"
      onClick={props.onClick}
      {...props}
    >
      {props.title}
    </button>
  );
};

export default Button;
