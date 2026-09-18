import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/UnauthorizedDialog.css";

const UnauthorizedDialog = ({ open }) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleLoginAgain = () => {
    navigate("/login");
  };

  return (
    <div className="unauthorized-overlay">
      <div className="unauthorized-dialog">
        <div className="unauthorized-content">
          <div className="unauthorized-code">401</div>

          <div className="unauthorized-message">
            Unauthorized
          </div>
        </div>

        <div className="unauthorized-footer">
          <button
            type="button"
            className="unauthorized-login-link"
            onClick={handleLoginAgain}
          >
            ⬅️ Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedDialog;