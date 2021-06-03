import React from "react";

import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";

import { ActivityDetail, IUser } from "../../../@types/schedule";
import { UserSearchInput } from "../UserSearchInput";
import {
  EDIT_DIVE_TRIP_DETAIL,
  CREATE_DIVE_TRIP_DETAIL,
} from "../../../controllers/schedule/queries";
import { buildFormData } from "../utils";
import { useBaseMutation } from "../../../hooks/baseMutation";

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
    marginTop: theme.spacing(2),
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
  [key: string]: any;
  id?: number;
  activityType?: string;
  date?: string;
  diveSite1?: string;
  diveSite2?: string;
  diveGuides: IUser[];
}

interface IEditTripDetailFormProps {
  diveTripDetail?: ActivityDetail;
  handleClose: any;
}

export const EditTripDetailForm: React.FC<IEditTripDetailFormProps> = ({
  diveTripDetail,
  handleClose,
}: any) => {
  const initialFormData = buildFormData(diveTripDetail);
  const [addGuide, setAddGuide] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [formData, setFormData] = React.useState<IFormData>(
    initialFormData as any
  );
  const { mutation: submitEditTripDetail } = useBaseMutation(
    EDIT_DIVE_TRIP_DETAIL
  );
  const { mutation: submitCreateTripDetail } = useBaseMutation(
    CREATE_DIVE_TRIP_DETAIL
  );

  const classes = useStyles();

  const handleFormChange = (event: any) => {
    setFormData((oldState: IFormData) => ({
      ...oldState,
      [event.target.name]: event.target.value,
    }));
  };

  const isValidData = (data: IFormData) => {
    for (const prop in data) {
      if (prop === "bookingId") continue;
      if (prop === "time") continue;
      if (prop === "instructorName") continue;
      if (data[prop] === "") {
        return false;
      }
    }
    return true;
  };

  const isEditTrip = () => diveTripDetail.id !== -1;

  const getGuideIds = (): number[] => {
    const diveGuideIds: number[] = [];
    formData.diveGuides.forEach((guide: IUser) => {
      diveGuideIds.push(guide.id);
    });
    return diveGuideIds;
  };

  const handleSaveTripDetail = () => {
    console.log(formData);
    const vars = {
      date: formData.date,
      diveGuides: getGuideIds(),
      diveSite1: formData.diveSite1,
      diveSite2: formData.diveSite2,
      id: formData.id,
      time: formData.time,
      activityType: formData.activityType,
    };
    console.log(vars);
    if (isEditTrip()) {
      submitEditTripDetail({ variables: vars });
    } else {
      submitCreateTripDetail({
        variables: vars,
      });
    }
  };

  const handleRemoveDiveGuide = (event: any, id: number): void => {
    setFormData((oldData) => ({
      ...oldData,
      diveGuides: oldData.diveGuides?.filter((user: IUser) => user.id !== id),
    }));
  };

  const handleAddDiveGuide = () => {
    if (user !== null) {
      setFormData((oldData) => ({
        ...oldData,
        diveGuides: [...(oldData.diveGuides as []), user],
      }));
      setUser(null);
    }
    setAddGuide(false);
  };

  return (
    <>
      <Grid container>
        <Typography className={classes.heading} variant="h5">
          Edit Trip Detail
        </Typography>
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="dive-site-1">Dive Site 1</InputLabel>
              <Select
                labelId="dive-site-1"
                id="dive-site-1"
                value={formData.diveSite1}
                name="diveSite1"
                onChange={(event) => {
                  handleFormChange(event);
                }}
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
              <InputLabel id="dive-site-2">Dive Site 2</InputLabel>
              <Select
                labelId="dive-site-2"
                id="dive-site-2"
                value={formData.diveSite2}
                name="diveSite2"
                onChange={(event) => {
                  handleFormChange(event);
                }}
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
            <List
              subheader={<ListSubheader>Dive Guides</ListSubheader>}
              className={classes.root}
            >
              {formData.diveGuides &&
                formData.diveGuides.map((guide: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={guide.profile.fullName} />
                    <ListItemSecondaryAction
                      onClick={(event) =>
                        handleRemoveDiveGuide(event, guide.id)
                      }
                    >
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              {!addGuide ? (
                <ListItem>
                  <Button onClick={() => setAddGuide(true)} variant="contained">
                    Add Guide
                  </Button>
                </ListItem>
              ) : (
                <Grid
                  container
                  direction="row"
                  className={classes.addDiverContainer}
                >
                  <Grid item>
                    <Tooltip title="Cancel">
                      <CancelIcon
                        className={classes.icon}
                        onClick={() => setAddGuide(false)}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid className={classes.searchInput}>
                    <FormControl fullWidth>
                      <UserSearchInput
                        size="small"
                        setObject={setUser as any}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Done">
                      <DoneIcon
                        className={classes.iconRight}
                        onClick={handleAddDiveGuide}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
            </List>
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveTripDetail}
        >
          Confirm
        </Button>
      </Grid>
    </>
  );
};
