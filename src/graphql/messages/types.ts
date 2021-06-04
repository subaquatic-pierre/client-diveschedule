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
