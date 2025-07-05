import { Link, useNavigate } from "react-router-dom";
import c from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={c.login}>
      <div className={c.welcome}>
        <h1>Hello, Welcome!</h1>
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
      <div className={c.form}>
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <Link to="/forgot-password">Forgot Password?</Link>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};
