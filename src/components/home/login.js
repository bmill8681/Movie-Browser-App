import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Text, PrimaryButton, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import style from "./home.module.css";

/**
 * Home Component contains a search bar to initiate movie browsing.
 * Filters search results based on input into search bar.
 *
 * @param {*} props
 */
const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fetching, setFetching] = useState(false);

    const postLogin = () => {

        const data = { email, password };
        console.log(JSON.stringify(data))
        const url = "https://movie-browser-api.herokuapp.com/api/login";
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                mode: "cors"
            }
        }

        setFetching(true);
        fetch(url, opts)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.jwt) {
                    localStorage.setItem('JWT', data.jwt);
                    props.setAuthorized(true);
                } else {
                    console.log('here');
                    setErrorMessage("Invalid email or password.. use the placeholder text");
                }
                setFetching(false);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage("Invalid email or password.. use the placeholder text");
                setFetching(false);
            })

    }
    return (
        <main className={style.OuterWrapper}>
            <section style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr 1fr",
                width: "475px",
                padding: "25px",
                background: "rgba(0,0,0,0.95)",
                borderRadius: "10px",
                border: "2px solid teal",
                boxShadow: "0px 0px 20px rgba(0,0,0,0.75)"
            }}>
                <TextField label="Email" placeholder="use: al@ace.ca" required onChange={(e, value) => setEmail(value)} value={email} />
                <TextField type="password" label="Password" placeholder="use: mypassword" required onChange={(e, value) => setPassword(value)} value={password} />
                <section>
                    <Text style={{ color: "red", display: "fled", alignItems: "center" }}>{errorMessage}</Text>
                    <PrimaryButton
                        styles={{ root: { margin: "10px", float: "right" } }}
                        disabled={fetching || email.trim() === "" || password.trim() === ""}
                        onClick={() => postLogin()}>{fetching ? <Spinner size={SpinnerSize.small} /> : "Login"}
                    </PrimaryButton>
                </section>

            </section>
        </main>
    );
};

export default Login;
