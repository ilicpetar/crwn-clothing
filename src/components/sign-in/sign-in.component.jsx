import React, { Component } from "react";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";
import { auth, signInWithGoogle } from "./../../firebase/firebase.utils";

class SignIn extends Component {
  state = { email: "", password: "" };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: " ", password: " " });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          {/* <label>Email</label> */}
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          {/* <label>Password</label> */}
          <div className="buttons">
            <CustomButton type="submit">Submit form</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign with google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
