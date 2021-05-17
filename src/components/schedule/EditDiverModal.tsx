import React from "react";
import Modal from "@material-ui/core/Modal";

import { useBaseMutation } from "../../hooks";
import { CREATE_USER, EDIT_USER } from "./mutations";
import { EditDiverForm } from "./EditDiverForm";
import { IUser } from "../../views/Schedule/schedule";

interface IEditFormModalProps {
  open: boolean;
  diverData?: IUser;
  handleClose: () => void;
}

export const EditDiverModal: React.FC<IEditFormModalProps> = ({
  open,
  handleClose,
  diverData,
}) => {
  const [editingDiverForm, setEditingDiverForm] = React.useState(false);
  const { mutation: createUserMutation } = useBaseMutation(CREATE_USER);

  const { mutation: editUserMutation } = useBaseMutation(EDIT_USER);

  const handleCreateUser = (formData: any): void => {
    createUserMutation({ variables: formData });
  };

  const handleEditUser = (formData: any, id?: number): void => {
    editUserMutation({
      variables: {
        id,
        ...formData,
      },
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={editingDiverForm ? () => {} : handleClose}
        aria-labelledby="edit-form-modal"
        aria-describedby="modal-for-form"
      >
        <EditDiverForm
          diverData={diverData}
          sendFormData={diverData ? handleEditUser : handleCreateUser}
          setEditingForm={setEditingDiverForm}
          closeModal={handleClose}
        />
      </Modal>
    </div>
  );
};
