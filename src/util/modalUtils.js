let modalOpener = null;

export const setModalOpener = (opener) => {
  modalOpener = opener;
};

export const triggerContactModal = () => {
  if (modalOpener) {
    modalOpener();
  } else {
    console.error("Modal opener not initialized");
  }
};
