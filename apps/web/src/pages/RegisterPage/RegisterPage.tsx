import { useNavigate } from "react-router-dom";
import c from "./RegisterPage.module.css";
import { StepProgressBar } from "../../components/StepProgressBar/StepProgressBar";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../components/icons";
import { RegisterMultiStepForm } from "../../components/RegisterMultiStepForm/RegisterMultiStepForm";
import type { RegisterRequest } from "../../types/AuthTypes";

const registerSteps = [
  "Basic Information",
  "Account & Security",
  "Additional Information",
];

export const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<RegisterRequest>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
  });
  const navigate = useNavigate();
  const isFormComplete = Object.values(userData).every((value) => value !== "");

  const nextStep = () => {
    if (currentStep < registerSteps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={c.login}>
      <div className={c.form}>
        <div className={c.formContainer}>
          <h1>Register</h1>

          <StepProgressBar
            steps={registerSteps}
            currentStep={currentStep - 1}
          />

          <RegisterMultiStepForm
            currentStep={currentStep}
            userData={userData}
            onUserDataChange={onUserDataChange}
          />

          <div className={c.iconsContainer}>
            <ArrowLeftIcon
              className={currentStep === 1 ? c.disabled : ""}
              onClick={previousStep}
            />
            <ArrowRightIcon
              className={currentStep === registerSteps.length ? c.disabled : ""}
              onClick={nextStep}
            />
          </div>

          <button type="submit" className={!isFormComplete ? c.disabled : ""}>
            Register
          </button>
        </div>
      </div>

      <div className={c.welcome}>
        <div className={c.welcomeContainer}>
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </section>
  );
};
