import * as Yup from "yup";

// formik
import { Form, FormikProvider, useFormik } from "formik";

// material
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";

// graphql
import { RESET_PASSWORD_MUTATION } from "../../../graphql/auth";

// utils
import { emailError } from "../../../utils/helpError";
import useBaseMutation from "../../../hooks/useBaseMutation";

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  afterSubmit?: string;
};

type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export default function ResetPasswordForm({
  onSent,
  onGetEmail,
}: ResetPasswordFormProps) {
  const { mutation: resetPassword } = useBaseMutation(RESET_PASSWORD_MUTATION);
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: "demo@minimals.cc",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email);
        if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.email);
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          {...getFieldProps("email")}
          type="email"
          label="Email address"
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit || "").error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit || "").helperText
          }
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          pending={isSubmitting}
        >
          Reset Password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
