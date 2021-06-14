import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router";
import NProgress from "nprogress";

// formik
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

// material
import {
  Box,
  Grid,
  Card,
  TextField,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useBaseQuery from "../../../hooks/useBaseQuery";
import useBaseMutation from "../../../hooks/useBaseMutation";
import useIsMountedRef from "../../../hooks/useIsMountedRef";

// components
import { UploadAvatar } from "../../upload";

// to be updated
import { buildForm } from "../../../utils/buildFormData";
import { messageController } from "../../../controllers/messages";
import { Profile } from "../../../@types/user";

// graphql
import { CreateUserParams } from "../../../@types/user";
import {
  GET_USER_PROFILE,
  CREATE_USER,
  UPDATE_PROFILE,
  USER_LIST_QUERY,
  profileFragment,
} from "../../../graphql/user";
import { ACTIVITY_DATA, DELETE_BOOKINGS } from "../../../graphql/schedule";

// paths
import { PATH_DASHBOARD } from "../../../routes/paths";
import { profile } from "console";

//
// ----------------------------------------------------------------------

export interface ModelChoiceField {
  value: string;
  label: string;
}

export const equipmentChoices: ModelChoiceField[] = [
  { value: "FK", label: "Full Kit" },
  { value: "TW", label: "Tanks and Weights" },
  { value: "NO", label: "No Equipment" },
];

export const certLevelChoices: ModelChoiceField[] = [
  { value: "OW", label: "Open Water" },
  { value: "AOW", label: "Advanced Open Water" },
  { value: "RD", label: "Rescue Diver" },
  { value: "DEEP", label: "Deep Diver" },
  { value: "TEC50", label: "Technical 50m" },
  { value: "TRIMIX90", label: "Trimix 90m" },
  { value: "DM", label: "Divemaster" },
  { value: "INST", label: "Instructor" },
];

interface IFormData {
  afterSubmit?: string;
  fullName: string;
  email: string;
  equipment: string;
  certLevel: string;
  phoneNumber: string;
}

const initialFormVals: IFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  equipment: "",
  certLevel: "",
};

// ----------------------------------------------------------------------

type AccountGeneralProps = {
  mode?: string;
  userId: string;
};

export default function AccountGeneral({
  mode = "account",
  userId,
}: AccountGeneralProps) {
  const client = useApolloClient();
  const history = useHistory();
  const { setError } = messageController(client);
  const { setSuccess } = messageController(client);
  const [initialValues, setFormVals] = useState<IFormData>(initialFormVals);

  // User profile state
  const [userProfile, setState] = useState<Profile>();
  const { data } = useBaseQuery<Profile>(GET_USER_PROFILE, {
    variables: { id: parseInt(userId) },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.userProfile.fullName) setState(data.userProfile);
  }, [data]);

  const { mutation: createUser } = useBaseMutation(CREATE_USER, {
    onError: (error: any) => {
      if (
        error.message === "UNIQUE constraint failed: users_customuser.email"
      ) {
        setError("User email already exists");
      } else {
        setError(error.message);
      }
    },
    onCompleted: (data: any) => {
      setSuccess("User successfully created");
      if (history)
        history.push(
          PATH_DASHBOARD.user.root + "/edit/" + data.createUser.user.id
        );
      NProgress.done();
    },
  });

  const { mutation: updateProfile } = useBaseMutation(UPDATE_PROFILE, {
    onCompleted: (data: any) => {
      setSuccess("User profile successfully updated");
      NProgress.done();
    },
    refetchQueries: ["ActivityData", "DailyBookingMeta"],
  });

  // Handle formik default and error values
  const isMountedRef = useIsMountedRef();

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik<IFormData>({
    enableReinitialize: true,
    initialValues,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        switch (mode) {
          case "create":
            createUser({ variables: values as CreateUserParams });
            break;
          case "edit":
            updateProfile({
              variables: { ...values, userId } as CreateUserParams,
            });
            break;
          case "account":
            updateProfile({ ...values, userId } as CreateUserParams);
            break;
          default:
            setError("Account create mode not defined");
            break;
        }
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (userProfile) {
      const formData = buildForm<IFormData>(initialValues, userProfile);
      setFormVals(formData);
    }
  }, [userProfile]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <Box
                sx={{
                  my: 10,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <UploadAvatar
                  value={""}
                  onChange={(value) => setFieldValue("photoURL", value)}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      autoFocus
                      {...getFieldProps("fullName")}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...getFieldProps("phoneNumber")}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="certLevel">
                        Certification Level
                      </InputLabel>
                      <Select
                        labelId="certLevel"
                        fullWidth
                        label="Certification Level"
                        {...getFieldProps("certLevel")}
                      >
                        {certLevelChoices.map((choice) => (
                          <MenuItem key={choice.value} value={choice.value}>
                            {choice.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="equipment">Equipment</InputLabel>
                      <Select
                        labelId="equipment"
                        fullWidth
                        label="Certification Level"
                        {...getFieldProps("equipment")}
                      >
                        {equipmentChoices.map((choice) => (
                          <MenuItem key={choice.value} value={choice.value}>
                            {choice.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    pending={isSubmitting}
                  >
                    {mode === "create" ? "Create User" : "Save Changes"}
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
