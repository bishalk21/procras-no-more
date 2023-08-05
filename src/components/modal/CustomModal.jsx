/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import React, { memo } from "react";

const CustomModal = ({ onClose, children }) => {
  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the modal-overlay
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content relative" onClick={handleContentClick}>
        {children}
        <button onClick={onClose} className="absolute right-8 top-11">
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </div>
  );
};
export const MemoizedCustomModal = React.memo(CustomModal);
