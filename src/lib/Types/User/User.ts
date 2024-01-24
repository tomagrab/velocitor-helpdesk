export type UseUserT = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: {
    id: string;
    firstName: string;
    fullName: string;
    lastName: string;
  };
};
