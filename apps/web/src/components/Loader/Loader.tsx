import c from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={c.loaderContainer}>
      <div className={c.loader}></div>
    </div>
  );
};
