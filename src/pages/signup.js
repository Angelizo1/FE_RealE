import React, { Fragment, useState } from "react";
import { HeaderContainer, FooterContainer } from "../containers";
import { Signup, Form } from "../components";
import validator from "validator";

const Signupp = () => {

  const initialValues = { name: "", email: "", password: "", cpassword: ""};

  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if(Object.keys(formErrors).length === 0 ){
      delete formValues.cpassword;
      //TODO: Add action for BE and update state
    }
  }

  const validate = (values) => {
    let errors = {};
    if(values.name.trim().length === 0){
      errors.name = "The name is required";
    }
    if(!validator.isEmail(values.email)){
      errors.email = "The email is not valid";
    }
    if(values.password.length < 5){
      errors.password = "The password must be at least 6 characters";
    }
    if(values.password !== values.cpassword){
      errors.cpassword = "The passwords don't match";
    }
    return errors;
  }

  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <Signup>
        <Signup.Container>
          <Signup.Content>
            <Signup.Header>
              <Signup.Title>Signup</Signup.Title>
            </Signup.Header>
            <Signup.InnerContent>
              <Form onSubmit={handleSubmit}>
                <Form.FormGroup>
                  <Form.Label>Name</Form.Label>
                  <Form.Input 
                    type="text" 
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}  
                  />
                  <p style={{color: "red"}}>{ formErrors.title }</p>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input 
                    type="text" 
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}  
                  />
                  <p style={{color: "red"}}>{ formErrors.email }</p>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input 
                    type="text" 
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}    
                  />
                  <p style={{color: "red"}}>{ formErrors.password }</p>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Input 
                    type="text" 
                    name="cpassword"
                    value={formValues.cpassword}
                    onChange={handleChange}    
                  />
                  <p style={{color: "red"}}>{ formErrors.cpassword }</p>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.SubmitInput 
                    type="submit" 
                    value="Signup" 
                  />
                </Form.FormGroup>
              </Form>
            </Signup.InnerContent>
            <Signup.Footer>
              <Signup.Text>
                Already Have Account ?{" "}
                <Signup.Anchor to="/login">Login</Signup.Anchor>
              </Signup.Text>
            </Signup.Footer>
          </Signup.Content>
        </Signup.Container>
      </Signup>
      <FooterContainer />
    </Fragment>
  );
};

export default Signupp;
