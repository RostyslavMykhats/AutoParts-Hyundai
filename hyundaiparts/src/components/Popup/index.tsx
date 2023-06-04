import React from "react";
import s from "./popup.module.scss";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className={s.popup_overlay}>
      <div className={s.popup}>
        <p>Product added to cart!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
