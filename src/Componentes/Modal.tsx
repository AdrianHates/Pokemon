const ModalText = ({ isOpen, closeModal, modalContent, className }) => {
  if (!isOpen) {
    return null; // No renderiza nada si el modal está cerrado
  }

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <p>{modalContent}</p>
      </div>
    </div>
  );
};

export default ModalText;