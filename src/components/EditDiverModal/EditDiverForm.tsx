import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";

import { Grid, TextField, Typography, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { IUser } from "../../pages/Schedule/schedule";

const MODAL_HEIGHT = 700;
const MODAL_WIDTH = 700;

const getModalStyle = () => {
  const modalTop = window.innerHeight / 2 - MODAL_HEIGHT / 2;
  const modalLeft = window.innerWidth / 2 - MODAL_WIDTH / 2;

  return {
    top: `${modalTop}px`,
    left: `${modalLeft}px`
  };
};

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "200px"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    paper: {
      position: "absolute",
      width: MODAL_WIDTH,
      minHeight: MODAL_HEIGHT,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 3)
    },
    formContainer: {
      padding: theme.spacing(2)
    },
    buttonContainer: {
      "& .MuiButton-root": {
        margin: theme.spacing(1)
      }
    }
  });

interface IProps extends WithStyles<typeof styles> {
  setEditingForm: (value: boolean) => void;
  closeModal: () => void;
  sendFormData: (data: any, id?: number) => void;
  diverData?: IUser;
}

interface IFormData {
  equipment: string;
  fullName: string;
  certificationLevel: string;
  email?: string;
}

interface IState {
  formData: IFormData;
  modalStyle: any;
}

class Form extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const initialData = this.props.diverData;
    this.state = {
      formData: {
        equipment: initialData ? initialData.profile.equipment : "",
        fullName: initialData ? initialData.profile.fullName : "",
        certificationLevel: initialData
          ? initialData.profile.certificationLevel
          : "",
        email: initialData ? initialData.email : ""
      },
      modalStyle: getModalStyle()
    };
  }

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setEditingForm } = this.props;
    this.setState((oldState: any) => ({
      ...oldState,
      formData: {
        ...oldState.formData,
        [event.target.name]: event.target.value
      }
    }));
    setEditingForm(true);
  };

  handleCertLevelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState((oldState: any) => ({
      ...oldState,
      formData: {
        ...oldState.formData,
        certificationLevel: event.target.value
      }
    }));
  };

  handleEquipmentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState((oldState: any) => ({
      ...oldState,
      formData: {
        ...oldState.formData,
        equipment: event.target.value
      }
    }));
  };

  handleConfirmButtonClick = () => {
    const { formData } = this.state;
    const { setEditingForm, closeModal, sendFormData, diverData } = this.props;
    if (diverData) {
      sendFormData(formData, diverData.id);
    } else {
      if (formData.email === "") {
        delete formData.email;
      }
      sendFormData(formData);
    }
    setEditingForm(false);
    closeModal();
  };

  handleCancelButtonClick = () => {
    const { setEditingForm, closeModal } = this.props;
    setEditingForm(false);
    closeModal();
  };

  render() {
    const { formData, modalStyle } = this.state;
    const { classes } = this.props;
    return (
      <div style={modalStyle} className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">Edit Diver Form</Typography>
          </Grid>
          <Grid container className={classes.formContainer}>
            <Grid xs={12} item container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  inputProps={{ autoFocus: true }}
                  variant="outlined"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFormChange(event)
                  }
                  name="fullName"
                >
                  {formData.fullName}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={formData.email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFormChange(event)
                  }
                  name="email"
                >
                  {formData.email}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="certification-level-input-label">
                    Certification Level
                  </InputLabel>
                  <Select
                    labelId="certification-level-input-label"
                    id="certification-level-input"
                    value={formData.certificationLevel}
                    name="certificationLevel"
                    onChange={this.handleCertLevelChange}
                  >
                    <MenuItem value="OW">Open Water</MenuItem>
                    <MenuItem value="RD">Rescue Diver</MenuItem>
                    <MenuItem value="AOW">Advanced Open Water</MenuItem>
                    <MenuItem value="DM">Divemaster or above</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="equipment-input-label">Equipment</InputLabel>
                  <Select
                    labelId="equipment-level-input-label"
                    id="equipment-level-input"
                    value={formData.equipment}
                    name="equipment"
                    onChange={this.handleEquipmentChange}
                  >
                    <MenuItem value="FK">Full Kit</MenuItem>
                    <MenuItem value="TW">Tanks and Weights</MenuItem>
                    <MenuItem value="NO">None</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleConfirmButtonClick}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCancelButtonClick}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const EditDiverForm = withStyles(styles, { withTheme: true })(Form);

export { EditDiverForm };
