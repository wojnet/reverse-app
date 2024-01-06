import { FC } from 'react';

interface ModalProps {
  children?: React.ReactNode,
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div
      className="bg-red-500 fixed top-0 right-0 bottom-0 left-0"
    >
      <div
        className="w-1/2 max-w-[700px] h-300px"
      >
        { children }
      </div>
    </div>
  );
}

export default Modal;