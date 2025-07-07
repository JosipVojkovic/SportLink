import { Link, useNavigate } from "react-router-dom";
import c from "./LoginPage.module.css";
import { useState } from "react";
import type { LoginRequest } from "../../types/AuthTypes";
import { useLogin } from "../../api";
import { Loader } from "../../components/Loader/Loader";

export const LoginPage: React.FC = () => {
  const [userData, setUserData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin(() => navigate("/"));

  const onUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync(userData);
  };

  return (
    <>
      <section className={c.login}>
        <div className={c.welcome}>
          <div className={c.welcomeContainer}>
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>

        <div className={c.form}>
          <div className={c.formContainer}>
            <h1>Login</h1>
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

              <Link to="/forgot-password">Forgot Password?</Link>

              <button type="submit" onClick={onSubmit}>
                Login
              </button>
            </form>
          </div>
        </div>
      </section>

      {isPending && <Loader />}
    </>
  );
};
