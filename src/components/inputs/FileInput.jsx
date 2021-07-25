import React, { useRef } from 'react';
import { OutlineBtn } from '../buttons/OutlineBtn';

export default ({ children, handleChange, accept, notButton }) => {
  const fileInput = useRef(null);
  function handleClick() {
    fileInput.current.click();
  }
  function handleFileChange(e) {
    handleChange(e.target.files[0]);
  }
  return (
    <>
      {notButton ? (
        <span onClick={handleClick}>{children}</span>
      ) : (
        <OutlineBtn type="primary" onClick={handleClick} customStyle={{display: 'inline-block'}}>
          {children}
        </OutlineBtn>
      )}
      <input ref={fileInput} type="file" hidden onChange={handleFileChange} accept={accept} />
    </>
  );
};
