import React from "react";

const InputField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props.register(props.name)}
        id={props.name}
        type="string"
        className={`min-w-24 max-w-full border font-medium p-2 text-ultra-dark-grayish-violet  placeholder:text-light-grayish-violet rounded-lg focus:outline-none focus:border-ultra-dark-grayish-violet ${
          props.extraClass ? props.extraClass : ""
        } ${
            props.errors[props.name]
            ? "border-error-red-input focus:ring-error-red-input"
            : "border-light-grayish-violet "
        }`}
        {...props}
      />
      {props.errors[props.name] ? (
        <p className="text-error-red-input text-xs font-medium">
          {props.errors[props.name].message}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
