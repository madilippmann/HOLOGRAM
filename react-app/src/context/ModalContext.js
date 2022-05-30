import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext)

export default function ModalProvider(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                showModal,
                setShowModal: setShowModal
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
