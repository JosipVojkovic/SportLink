export type RegisterRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
};

export interface RegisterFormData extends RegisterRequest {
  confirmPassword: string;
}

export type RegisterResponse = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  role: string;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type RegisterMultiStepFormProps = {
  currentStep: number;
  userData: RegisterFormData;
  onUserDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
