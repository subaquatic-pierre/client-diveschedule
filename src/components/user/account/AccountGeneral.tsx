import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useApolloClient } from "@apollo/client";
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
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../upload";
import { CreateUserParams, UserController } from "../../../controllers/user";
import {
  buildFormData,
  emptyFormVals,
  FormState,
} from "../../../utils/buildAccountFormData";
import useAuth from "../../../hooks/useAuth";
import { messagesController } from "../../../controllers/messages";
import useFetchStatus from "../../../hooks/useFetchStatus";
import LoadingScreen from "../../LoadingScreen";
import { Profile } from "../../../@types/user";
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

type AccountGeneralProps = {
  mode?: string;
  userIdProp?: string;
};

export default function AccountGeneral({
  mode = "account",
  userIdProp,
}: AccountGeneralProps) {
  const client = useApolloClient();

  // Handle formik default and error values
  const [formState, setFormState] = useState(emptyFormVals);
  const isMountedRef = useIsMountedRef();

  // Get logged in user details or User ID prop for edit user view
  const [userId, setUserId] = useState(userIdProp);
  const { user: authUser, isAuthenticated } = useAuth();

  const [{ data: userProfile, loading }, setState] = useFetchStatus<Profile>();

  // Controllers
  const {
    getUserProfile,
    createUser,
    updateProfile,
  } = UserController.getControls(client);
  const { setError } = messagesController(client);

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik<FormState>({
    enableReinitialize: true,
    initialValues: formState,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        switch (mode) {
          case "create":
            await createUser({ ...values } as CreateUserParams, setState);
            break;
          case "edit":
            await updateProfile(
              { ...values, userId } as CreateUserParams,
              setState
            );
            break;
          case "account":
            await updateProfile(
              { ...values, userId } as CreateUserParams,
              setState
            );
            break;
          default:
            setError("Account create mode not defined");
            break;
        }
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: "Error" });
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

  // Get user info for authenticated user
  useEffect(() => {
    if (mode === "account") {
      if (isAuthenticated) {
        setUserId(authUser.id);
      }
    }
  }, [authUser, isAuthenticated]);

  // Get user info on initial page load
  useEffect(() => {
    if (userId) getUserProfile(userId, setState);
  }, [userId]);

  useEffect(() => {
    if (userProfile) {
      const formData = buildFormData(userProfile, setError);
      setFormState(formData);
    }
  }, [userProfile]);

  if (loading) {
    return <LoadingScreen />;
  }

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
                    {mode === "create" ? "Create User" : "Update profile"}
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
