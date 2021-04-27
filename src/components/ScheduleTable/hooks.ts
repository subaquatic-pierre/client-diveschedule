import { useMutation } from "@apollo/client";

export const useBookingMutation = (gqlString: any): any => {
  const [mutation, { data, error, loading }] = useMutation(gqlString, {
    onCompleted: (data) => {
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutation, data, error, loading };
};
