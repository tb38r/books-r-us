import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./SignInSignUp.css";

export default function SignInSignUp() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Sign-In state
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInMessage, setSignInMessage] = useState("");

    // Sign-Up state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirm, setSignUpConfirm] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setUser({ email: signInEmail });

                navigate("/account");
            } else {
                const errorData = await res.json();
                setSignInMessage(`❌ ${errorData.error}`);
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setSignInMessage("❌ Error connecting to server.");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();


        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: signUpEmail,
            password: signUpPassword,
        };

        try {


            const createRes = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            //const createdUser = await createRes.json();
            console.log("response from backend ---> ", await createRes);
            if (createRes.status === 200)
                setUser({
                    name: firstName + " " + lastName,
                    id: 1,
                    email: signUpEmail,
                    passWord: "abc",
                    wishList: [],
                    orders: [],
                    date: "12 / 08 / 2025",
                });
            navigate("/account");
        } catch (error) {
            console.error("Sign-up error:", error);
            setSignUpMessage("❌ Failed to create account.");
        }
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
                {signInMessage && (
                    <p className="auth-message">{signInMessage}</p>
                )}
            </div>

            {/* Right: Sign Up */}
            <div className="auth-box right">
                <h2>Don’t have an account yet?</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                {signUpMessage && (
                    <p className="auth-message">{signUpMessage}</p>
                )}
            </div>
        </div>
    );
}
