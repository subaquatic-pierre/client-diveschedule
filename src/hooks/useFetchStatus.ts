import { useState } from "react";
import { SetState } from "../controllers";

export interface LoadingState<TData> {
  loading: boolean;
  error: {
    message: string;
  } | null;
  data: TData | null;
}

const getInitialState = <TData>(): LoadingState<TData> => {
  const initialLoadingState: LoadingState<TData> = {
    loading: false,
    error: null,
    data: null,
  };
  return initialLoadingState;
};

export default function useFetchStatus<TData>(): [
  LoadingState<TData>,
  SetState<LoadingState<TData>>
] {
  const [loadingState, setLoadingState] = useState(getInitialState<TData>());
  return [loadingState, setLoadingState];
}
