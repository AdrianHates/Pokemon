import { useState, useEffect } from 'react';

const useModal = (initialContent:string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(initialContent);

  useEffect(() => {
    setModalContent(initialContent); // Actualiza el estado interno cuando initialContent cambia
  }, [initialContent]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, modalContent };
};

export default useModal;