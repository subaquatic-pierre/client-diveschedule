export type MessagesController = {
  setError: (message: string) => void;
  clearError: () => void;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
};

export type SettingsController = {
  handleToggleTheme: () => void;
  handleChangeTheme: (event: any) => void;
  handleChangeDirection: (event: any) => void;
};
