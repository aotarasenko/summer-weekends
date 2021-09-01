import { AuthForm } from "./AuthForm.styled";
import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../api/auth/authenticate";
import { loginUser } from "../../api/auth/actions";
import { useHistory } from "react-router";
import { FlexRow } from "../../styles/generalStyles";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useAuthDispatch();

  const currentUser = useAuthState();

  if (currentUser.isAuth) {
    history.push("/home");
    <Redirect to="/home" />;
  }

  const sendLogin = async (e) => {
    e.preventDefault();
    let payload = JSON.stringify({ user: { email, password } });
    try {
      const res = await loginUser(dispatch, payload);
      if (res) {
        history.push("/home");
        <Redirect to="/home" />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm>
      <fieldset>
        <legend>Login</legend>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="button" onClick={sendLogin}>
          Login
        </button>
      </fieldset>
      <FlexRow flexSpacing="center">
        <span>
          Don`t have an account? <NavLink to="/auth/signup">Create </NavLink>
          Now!
        </span>
      </FlexRow>
    </AuthForm>
  );
};
