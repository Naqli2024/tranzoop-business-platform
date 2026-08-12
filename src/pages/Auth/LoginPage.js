import React, { useContext, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import loginImage from "../../assets/images/login.jpeg";
import "../../assets/styles/auth.css";

const LoginPage = () => {
  const { theme } = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login:", formData);
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <img
          src={loginImage}
          alt=""
          className="login-background-image"
        />
        <div className="login-background-overlay" />
      </div>
      <main className="login-wrapper">
        <section className="login-card">
          <div className="login-card-glow" />
          <div className="login-logo">
            <span className="login-logo-text">
              TRANZOOP
            </span>
            <span className="login-eyebrow">
              WELCOME BACK
            </span>
          </div>
          <div className="login-heading">
            <h1>
              Sign in to your account
            </h1>
            <p>
              Access your Tranzoop workspace and manage
              your business operations.
            </p>
          </div>
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="login-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="login-input-wrapper">

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>
            </div>
            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => console.log("Forgot password")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="login-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="login-submit"
            >
                Sign in
            </button>
          </form>
          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
            >
              Create account
            </button>

          </div>

        </section>

      </main>
    </div>
  );
};

export default LoginPage;