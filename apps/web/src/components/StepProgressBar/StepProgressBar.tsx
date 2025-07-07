import type { StepProgressBarProps } from "../../types";
import c from "./StepProgressBar.module.css";

export const StepProgressBar = ({
  steps,
  currentStep,
}: StepProgressBarProps) => {
  return (
    <div className={c.stepProgressBar}>
      <p className={c.stepName}>{steps[currentStep]}</p>

      <div className={c.progressBar}>
        <div className={c.bar}>
          <div
            className={c.progress}
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        <div className={c.points}>
          {steps.map((step, index) => (
            <div key={index} className={currentStep >= index ? c.active : ""}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
