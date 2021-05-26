import { useState } from "react";
import { SetState } from "../@types/controllers";

export type LoadingState = {
  loading: boolean;
  error: {
    message: string;
  } | null;
  data: any | null;
};

const initialLoadingState: LoadingState = {
  loading: false,
  error: null,
  data: null,
};

export default function useFetchStatus(): [LoadingState, SetState<any>] {
  const [loadingState, setLoadingState] = useState(initialLoadingState);
  return [loadingState, setLoadingState];
}
