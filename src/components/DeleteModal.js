import React from "react";
import "../assets/styles/settings.css";
import { MdDelete } from "react-icons/md";

const DeleteModal = ({
  title = "Delete Item",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
  onClose,
  onDelete,
}) => {

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">

        <div className="delete-modal-icon">
          <MdDelete size={35}/>
        </div>

        <h2 className="delete-modal-title">{title}</h2>

        <p className="delete-modal-message">
          {message}
        </p>
        <div className="delete-modal-footer">
          <button
            className="delete-modal-btn delete-modal-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-modal-btn delete-modal-btn-delete"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;