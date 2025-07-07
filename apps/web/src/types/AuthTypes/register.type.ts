export type RegisterRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
};

export type RegisterMultiStepFormProps = {
  currentStep: number;
  userData: RegisterRequest;
  onUserDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
