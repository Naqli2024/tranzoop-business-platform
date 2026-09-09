import React, { useState } from "react";
import loginImage from "../../assets/images/login.jpeg";
import "../../assets/styles/auth.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import  Loader from "../../components/Loader";
 
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await dispatch(login(formData)).unwrap();
      toast.success(result.message);
      navigate("/admin");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        {loading && <Loader isLoading={loading} />}
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
              BIZOOP
            </span>
            <span className="login-eyebrow">
              WELCOME BACK
            </span>
          </div>
          <div className="login-heading">
            <h1>Sign in to your account</h1>
            <p>
              Access your BIZOOP workspace and manage
              your business operations.
            </p>
          </div>
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="login-field">
              <label htmlFor="identifier">
                Email address
              </label>
              <div className="login-input-wrapper">
                <input
                  id="identifier"
                  type="email"
                  name="identifier"
                  value={formData.identifier}
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
                  onClick={() =>
                    console.log("Forgot password")
                  }
                >
                  Forgot password?
                </button>
              </div>
 
              <div className="login-input-wrapper">
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
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
                >
                  {showPassword ? (
                    <VscEyeClosed size={20} />
                  ) : (
                    <VscEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
    <div/>
    </div>
  );
};
export default LoginPage;