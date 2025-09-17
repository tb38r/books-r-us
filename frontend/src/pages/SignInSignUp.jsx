import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInSignUp.css";

export default function SignInSignUp({ setUser }) {
  const navigate = useNavigate();

  // Sign-In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");

  // Sign-Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  // Dummy credentials for Sign-In
  const dummyUser = {
    name: "Harpreet",
    email: "harpreet@example.com",
    password: "books123",
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (
      signInEmail === dummyUser.email &&
      signInPassword === dummyUser.password
    ) {
      setSignInMessage("");
      // update app-level user so MyAccount sees it
      setUser({ name: dummyUser.name, email: dummyUser.email });
      navigate("/account");
    } else {
      setSignInMessage("❌ Wrong email or password.");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirm) {
      setSignUpMessage("❌ Passwords do not match.");
      return;
    }
    setSignUpMessage("");
    // update app-level user and navigate
    setUser({ name: signUpName, email: signUpEmail });
    navigate("/account");
  };

  return (
    <div className="auth-wrapper">
      {/* Left: Sign In */}
      <div className="auth-box left">
        <h2>Already got an account?</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {signInMessage && <p className="auth-message">{signInMessage}</p>}
      </div>

      {/* Right: Sign Up */}
      <div className="auth-box right">
        <h2>Don’t have an account yet?</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={signUpName}
            onChange={(e) => setSignUpName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signUpConfirm}
            onChange={(e) => setSignUpConfirm(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {signUpMessage && <p className="auth-message">{signUpMessage}</p>}
      </div>
    </div>
);
}
