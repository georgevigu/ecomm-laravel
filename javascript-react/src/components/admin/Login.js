import Header from "../Header";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/");
        }
    }, []);

    async function login() {
        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });

        if (result.status === 200) {
            result = await result.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/");
        } else {
            result = await result.json();
            setErrorMessage(result.message || "Invalid email or password");
        }
    }

    return (
        <div>
            <Header />
            <h1>Login Page</h1>
            <div className="col-sm-6 offset-sm-3">
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />
                <br />
                <button onClick={login} className="btn btn-primary">
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
