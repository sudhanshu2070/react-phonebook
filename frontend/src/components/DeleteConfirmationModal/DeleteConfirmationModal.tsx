import React from 'react';
import './DeleteConfirmationModal.css';

interface DeleteConfirmationModalProps {
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ contactName, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete the contact: <strong>{contactName}</strong>?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Yes, Delete</button>
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;