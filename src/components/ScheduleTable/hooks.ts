import { useMutation } from "@apollo/client";

export const useBookingMutation = (gqlString: any, setAlert: any): any => {
  const [mutation, { data, error, loading }] = useMutation(gqlString, {
    onCompleted: (data) => {
      window.location.reload();
    },
    onError: (error) => {
      setAlert({
        state: true,
        severity: "error",
        message: error.message,
      });
    },
  });
  return { mutation, data, error, loading };
};
