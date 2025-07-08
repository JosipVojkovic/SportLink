import { useNavigate } from "react-router-dom";
import c from "./RegisterPage.module.css";
import { StepProgressBar } from "../../components/StepProgressBar/StepProgressBar";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../components/icons";
import { RegisterMultiStepForm } from "../../components/RegisterMultiStepForm/RegisterMultiStepForm";
import type { RegisterFormData } from "../../types/AuthTypes";
import {
  isPasswordMatching,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "../../utils";
import { useRegister } from "../../api";
import { Loader } from "../../components/Loader/Loader";

const registerSteps = [
  "Basic Information",
  "Account & Security",
  "Additional Information",
];

export const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
  });
  const [validationMessage, setValidationMessage] = useState<string>("");
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister(() => navigate("/login"));

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!userData.firstName || !userData.lastName || !userData.userName) {
        setValidationMessage("Please fill in all fields before continuing.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!userData.email || !userData.password || !userData.confirmPassword) {
        setValidationMessage("Please fill in all fields before continuing.");
        return false;
      } else if (!isValidEmail(userData.email)) {
        setValidationMessage("Invalid email format.");
        return false;
      } else if (!isValidPassword(userData.password)) {
        setValidationMessage(
          "Password must be strong (e.g. 6+ characters, one number, one letter)."
        );
        return false;
      } else if (
        !isPasswordMatching(userData.password, userData.confirmPassword)
      ) {
        setValidationMessage("Passwords do not match.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!userData.dateOfBirth) {
        setValidationMessage(
          "Please fill in Date of birth field before registering."
        );
        return false;
      } else if (userData.phone && !isValidPhoneNumber(userData.phone)) {
        setValidationMessage("Phone number must be valid and start with '+'");
        return false;
      }
    }

    setValidationMessage("");
    return true;
  };

  const nextStep = () => {
    if (currentStep < registerSteps.length) {
      if (!validateCurrentStep()) return;
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setValidationMessage("");
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

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    const { confirmPassword, ...cleanData } = userData;

    await mutateAsync(cleanData);
  };

  return (
    <>
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
                className={
                  currentStep === registerSteps.length ? c.disabled : ""
                }
                onClick={nextStep}
              />
            </div>

            <button
              className={currentStep !== registerSteps.length ? c.disabled : ""}
              onClick={handleSubmit}
            >
              Register
            </button>

            {validationMessage && <p>{validationMessage}</p>}
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

      {isPending && <Loader />}
    </>
  );
};
