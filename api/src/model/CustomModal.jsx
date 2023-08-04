/* eslint-disable react/prop-types */
const CustomModal = ({ onClose, children }) => {
  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the modal-overlay
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CustomModal;
