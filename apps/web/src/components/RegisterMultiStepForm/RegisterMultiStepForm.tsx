import type { RegisterMultiStepFormProps } from "../../types/AuthTypes";

export const RegisterMultiStepForm = ({
  currentStep,
  userData,
  onUserDataChange,
}: RegisterMultiStepFormProps) => {
  if (currentStep === 1) {
    return (
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={onUserDataChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={onUserDataChange}
        />
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={userData.userName}
          onChange={onUserDataChange}
        />
      </form>
    );
  } else if (currentStep === 2) {
    return (
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={onUserDataChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={onUserDataChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={userData.confirmPassword}
          onChange={onUserDataChange}
        />
      </form>
    );
  }

  return (
    <form>
      <input
        type="text"
        name="phone"
        placeholder="Phone number"
        value={userData.phone}
        onChange={onUserDataChange}
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of birth"
        value={userData.dateOfBirth}
        onChange={onUserDataChange}
      />
    </form>
  );
};
