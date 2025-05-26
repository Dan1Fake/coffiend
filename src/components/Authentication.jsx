import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication(props) {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authError, setAuthError] = useState("");
    const { signup, login } = useAuth();
    const { setShowModal } = props;

    async function handleAuthenticate() {
        if (!email || !email.includes("@") || !password || password.length < 6 || isAuthenticating) {
            return;
        }
        try {
            setIsAuthenticating(true);
            setAuthError(null);

            if (isRegistration) {
                // register a user
                await signup(email, password);
            } else {
                // login a user
                await login(email, password);
            }
            setShowModal(false);
        } catch (error) {
            setAuthError(error.message);
            return;
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
            <p>{isRegistration ? "Create an account!" : "Sign in to your account!"}</p>
            <input
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
                placeholder="Email"
            />
            <input
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                placeholder="********"
                type="password"
            />
            <div>
                <button onClick={handleAuthenticate}>{isAuthenticating ? "Authenticating..." : "Submit"}</button>
                <span style={{ color: "#ed4337" }}>{authError && (" ❌Invalid-Credentials")}</span>
            </div>

            <hr />
            <div className="register-content">
                <p>{isRegistration ? "Already have an account?" : "Don't have an account?"}</p>
                <button
                    onClick={() => {
                        setIsRegistration(!isRegistration);
                    }}
                >
                    {isRegistration ? "Sign in" : "Sign up"}
                </button>
            </div>
        </>
    );
}
