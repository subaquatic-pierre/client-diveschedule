import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

import { formatDate } from "../../../utils/formatDate";
import { ActivityDetail } from "../../../@types/schedule";
import { User } from "../../../@types/user";
import { UserSearchInput } from "../UserSearchInput";
import {
  EDIT_ACTIVITY_DETAIL,
  CREATE_ACTIVITY_DETAIL,
  ACTIVITY_DATA,
} from "../../../graphql/schedule";
import { ActivityMeta } from "../../../views/schedule/Schedule";

// -----------------------------------
import { buildForm } from "../../../utils/buildFormData";
import useBaseMutation from "../../../hooks/useBaseMutation";
import { useApolloClient } from "@apollo/client";
import { messageController } from "../../../controllers/messages";

const siteOptions = [
  "Artificial Reef",
  "Dibba Rock",
  "Cauliflower Reef",
  "The Nursery",
  "Inchcape 1",
  "Inchcape Deep",
  "Snoopy Island",
  "Snoopy Deep",
  "Deep Sand",
  "Snoopy 50",
  "3 Rocks",
  "Car Cemetary",
  "Shark Island",
  "Coral Gardens",
  "Hole in the Wall",
  "Inchcape 2",
  "Martini Rock",
  "Other",
];

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
  },
  formContainer: {
    "& . input": {
      margin: theme.spacing(2),
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  heading: { marginBottom: theme.spacing(2) },
  addDiverContainer: {
    marginTop: theme.spacing(1),
  },
  searchInput: {
    flexGrow: 1,
  },
  icon: {
    "&:hover": {
      cursor: "pointer",
    },
    marginTop: "5px",
    marginRight: "5px",
  },
  iconRight: {
    "&:hover": {
      cursor: "pointer",
    },
    marginTop: "5px",
    marginRight: "5px",
    marginLeft: "5px",
  },
}));

export interface IFormData {
  afterSubmit?: any;
  id?: string;
  activityType?: string;
  date?: string;
  diveSite1?: string;
  diveSite2?: string;
  diveGuides: User[];
}

const initialFormData: IFormData = {
  id: "",
  activityType: "",
  date: "",
  diveSite1: "",
  diveSite2: "",
  diveGuides: [],
};

const getDiveGuideIds = (diveGuides: User[]): number[] => {
  const ids = [];
  try {
    diveGuides.forEach((guide) => {
      ids.push(guide.id);
    });
  } catch (error) {
    return ids;
  }
  return ids;
};

interface IProps {
  diveTripDetail?: ActivityDetail;
  handleClose: () => void;
}

export const ActivityDetailForm: React.FC<IProps> = ({
  diveTripDetail,
  handleClose,
}: any) => {
  const client = useApolloClient();
  const { setSuccess } = messageController(client);
  const classes = useStyles();
  const refetchMeta = useContext(ActivityMeta);
  const [user, setUser] = React.useState<User | null>(null);
  const [addingDiveGuide, setAddingDiveGuide] = React.useState(false);
  const [formValues, setFormValues] = useState<IFormData>(initialFormData);

  useEffect(() => {
    const newData = {
      ...diveTripDetail,
      date: formatDate(diveTripDetail.day.date, "server"),
    };
    const formData = buildForm<IFormData>(initialFormData, newData);
    setFormValues(formData);
  }, [diveTripDetail]);

  const { mutation: editActivityDetail } = useBaseMutation(
    EDIT_ACTIVITY_DETAIL,
    {
      onCompleted: (data: any) => {
        refetchMeta();
        client.writeQuery({
          query: ACTIVITY_DATA,
          data: {
            activityData: {
              ...diveTripDetail,
              ...formValues,
            },
          },
        });
        setSuccess("Activity successfully edited");
      },
    }
  );

  const { mutation: createActivityDetail } = useBaseMutation(
    CREATE_ACTIVITY_DETAIL,
    {
      onCompleted: (data: any) => {
        refetchMeta();
        setSuccess("Activity successfully created");
      },
    }
  );

  const isEditTrip = diveTripDetail.id !== -1;

  const handleDiveSiteChange = (event: any) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSaveClick = () => {
    const diveGuides = getDiveGuideIds(formValues.diveGuides);
    if (isEditTrip) {
      editActivityDetail({ variables: { ...formValues, diveGuides } });
    } else {
      createActivityDetail({ variables: { ...formValues, diveGuides } });
    }
    handleClose();
  };

  const handleRemoveDiveGuide = (id: number): void => {
    const newGuides = formValues.diveGuides.filter(
      (user) => user.id !== id.toString()
    );
    setFormValues((oldValues) => ({
      ...oldValues,
      diveGuides: newGuides,
    }));
  };

  const handleAddDiveGuide = () => {
    const newGuides = [...formValues.diveGuides, user];
    setFormValues((oldValues) => ({
      ...oldValues,
      diveGuides: newGuides,
    }));
    setAddingDiveGuide(false);
  };

  useEffect(() => {
    if (user) handleAddDiveGuide();
  }, [user]);

  return (
    <>
      <Grid container>
        <Typography className={classes.heading} variant="h5">
          Edit Trip Detail
        </Typography>
        <Grid item container spacing={3}>
          {/* Dive site selection section */}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="diveSite1">Dive Site 1</InputLabel>
              <Select
                labelId="diveSite1"
                label="Dive Site 1"
                value={formValues.diveSite1}
                name="diveSite1"
                onChange={(event) => handleDiveSiteChange(event)}
              >
                {siteOptions.map((site: string, index: number) => (
                  <MenuItem key={index} value={site}>
                    {site}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="diveSite2">Dive Site 2</InputLabel>
              <Select
                labelId="diveSite2"
                label="Dive Site 2"
                value={formValues.diveSite2}
                name="diveSite2"
                onChange={(event) => handleDiveSiteChange(event)}
              >
                {siteOptions.map((site: string, index: number) => (
                  <MenuItem key={index} value={site}>
                    {site}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Dive guide list section */}
          <Grid item xs={12}>
            {formValues.diveGuides.length > 0 && (
              <List
                subheader={<ListSubheader>Dive Guides</ListSubheader>}
                className={classes.root}
              >
                {formValues &&
                  formValues.diveGuides &&
                  formValues.diveGuides.map((guide: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={guide.profile.fullName} />
                      <ListItemSecondaryAction
                        onClick={() => handleRemoveDiveGuide(guide.id)}
                      >
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            )}
            {addingDiveGuide && (
              <List>
                <ListItem key="addingDiver">
                  <Grid className={classes.searchInput}>
                    <FormControl fullWidth>
                      <UserSearchInput
                        autoFocus
                        size="small"
                        setObject={setUser as any}
                      />
                    </FormControl>
                  </Grid>
                </ListItem>
              </List>
            )}
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </Grid>
      {/* Button section */}
      <Grid item container justifyContent="flex-end">
        <Box sx={{ mt: 3 }}>
          {!addingDiveGuide ? (
            <Button
              onClick={() => setAddingDiveGuide(true)}
              variant="contained"
            >
              Add Guide
            </Button>
          ) : (
            <Button
              onClick={() => setAddingDiveGuide(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          )}
          <Button
            sx={{ ml: 2, color: "white" }}
            type="submit"
            color="success"
            variant="contained"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </>
  );
};
