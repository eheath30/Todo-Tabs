import React, { ButtonHTMLAttributes } from "react";
//todo: What is buttonhtmlattributes???
import ReactDom from "react-dom";
import styles from "../styles/modal.module.css";

type Props = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ open, children, onClose }: Props) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay_styles} />
      <div className={styles.modal_styles}>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")!
  );
}
