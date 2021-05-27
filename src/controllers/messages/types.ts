export type Messages = {
  __typename?: "Messages";
  error?: {
    message: string;
  } | null;
  success?: {
    message: string;
  } | null;
} | null;

export type MessagesCache = {
  messages: Messages;
};

export type MessagesController = {
  setError: (message: string) => void;
  clearError: () => void;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
};
