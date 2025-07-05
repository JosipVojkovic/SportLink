import { Link, useNavigate } from "react-router-dom";
import c from "./RegisterPage.module.css";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={c.login}>
      <div className={c.form}>
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Username" />

          <button type="submit">Next</button>
        </form>
      </div>

      <div className={c.welcome}>
        <h1>Welcome Back!</h1>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </section>
  );
};
