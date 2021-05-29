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
import { userController } from "../../../controllers/user";
import {
  buildFormData,
  emptyFormVals,
  FormState,
} from "../../../utils/buildAccountFormData";
import { authController } from "../../../controllers/auth";
import useAuth from "../../../hooks/useAuth";
import { messagesController } from "../../../controllers/messages";
import { RegisterParams } from "../../../controllers/auth";
import useFetchStatus from "../../../hooks/useFetchStatus";
import LoadingScreen from "../../LoadingScreen";
import { User } from "../../../@types/user";
//
// ----------------------------------------------------------------------

type AccountGeneralProps = {
  mode?: string;
  userIdProp?: string;
};

const updateProfile = (data: any) => {
  console.log(data);
};

export default function AccountGeneral({
  mode = "account",
  userIdProp,
}: AccountGeneralProps) {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  // Handle formik default and error values
  const [formState, setFormState] = useState(emptyFormVals);
  const isMountedRef = useIsMountedRef();

  // Get logged in user details or User ID prop for edit user view
  const [userId, setUserId] = useState(userIdProp);
  const { user: authUser, isAuthenticated } = useAuth();

  const [{ data: user, loading, error }, setState] = useFetchStatus<User>();

  // Controllers
  const { getUserProfile } = userController(client);
  const { setError } = messagesController(client);
  const { register } = authController(client);

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
  });

  const formik = useFormik<FormState>({
    enableReinitialize: true,
    initialValues: formState,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        switch (mode) {
          case "create":
            // await register({ ...values });
            await register({} as RegisterParams);
            enqueueSnackbar("Update success", { variant: "success" });
            break;
          default:
            await updateProfile({ ...values });
            enqueueSnackbar("Update success", { variant: "success" });
            break;
        }
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: "Error" });
          enqueueSnackbar(error.message, { variant: "error" });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    values,
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
    if (user) {
      const formData = buildFormData(user, setError);
      setFormState(formData);
    }
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    setError(error);
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
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={mode !== "create"}
                      label="Email Address"
                      {...getFieldProps("email")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...getFieldProps("phoneNumber")}
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
                        {...getFieldProps("certificationLevel")}
                      >
                        <MenuItem value="openWater">Open Water</MenuItem>
                        <MenuItem value="advancedOpenWater">
                          Advanced Open Water
                        </MenuItem>
                        <MenuItem value="deepSpecialty">
                          Deep Specialty
                        </MenuItem>
                        <MenuItem value="rescueDiver">Rescue Diver</MenuItem>
                        <MenuItem value="diveMaster">Dive Master</MenuItem>
                        <MenuItem value="instructor">Instructor</MenuItem>
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
                        <MenuItem value="fullEquipment">
                          Full Equipment
                        </MenuItem>
                        <MenuItem value="tanksAndWeights">
                          Tanks and Weights
                        </MenuItem>
                        <MenuItem value="noEquipment">No Equipment</MenuItem>
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
