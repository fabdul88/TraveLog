import React from 'react';
import { deleteLogEntry } from '../ReactMap/api';

const Modal = ({ entry, setModal, onClose }) => {
  return (
    <>
      <div>
        <p style={{ color: 'white ' }}>
          Delete {entry.title} from your entries?
        </p>

        <button
          onClick={() => {
            deleteLogEntry(entry);
            setModal(false);
            onClose();
          }}
        >
          Delete
        </button>

        <button
          onClick={() => {
            setModal(false);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default Modal;
