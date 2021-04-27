import React from "react";
import { useMutation } from "@apollo/client";
import Modal from "@material-ui/core/Modal";

import { CREATE_USER, EDIT_USER } from "./mutations";
import { EditDiverForm } from "./EditDiverForm";
import { IUser } from "../../pages/Schedule/schedule";

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
  const [createUserMutation] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      // window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [editUserMutation] = useMutation(EDIT_USER, {
    onCompleted: (data) => {
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCreateUser = (formData: any): void => {
    createUserMutation({ variables: formData });
  };

  const handleEditUser = (formData: any, id?: number): void => {
    editUserMutation({
      variables: {
        id: id,
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
