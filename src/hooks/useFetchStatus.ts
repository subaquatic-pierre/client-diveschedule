import { useState } from "react";
import { SetState } from "../controllers";

export interface LoadingState<TData> {
  loading: boolean;
  error: string | null;
  data: TData | null;
}

const getInitialState = <TData>(defaultData?: TData): LoadingState<TData> => {
  const initialLoadingState: LoadingState<TData> = {
    loading: true,
    error: null,
    data: defaultData ? defaultData : null,
  };
  return initialLoadingState;
};

export default function useFetchStatus<TData>(
  defaultData?: TData
): [LoadingState<TData>, SetState<LoadingState<TData>>] {
  const [loadingState, setLoadingState] = useState(
    getInitialState<TData>(defaultData)
  );
  return [loadingState, setLoadingState];
}
