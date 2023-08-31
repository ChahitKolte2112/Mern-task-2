import React from "react";
import './Authpage.css'
export const Input = ({
  type,
  placeholder = "",
  name,
  label,
  value,
  onChange,
  error = false,
  errorMessage = "",
}) => {
  return (
    <>
      <label className="authlabel" for={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={`${error === true && "err"} ${"authinput"}`}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={onChange}
      />
      <span className={`error ${error === true && "show"}`}>
        {errorMessage}
      </span>
    </>
  );
};
