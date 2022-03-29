import React, { useState, useRef, useEffect } from "react";

import { Section, Add, Form } from "../components";
import { useParams } from "react-router-dom";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import { useDispatch } from "react-redux";

export const AddAllLisiting = () => {

  const dispatch = useDispatch();

  let formData = new FormData();

  const hiddenFileInput = useRef(null);

  const handleFileButton = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  const { id } = useParams();
  // console.log(id);

  const initialValues = { 
    title:"", price: 0, category:"", description: "" , type:"" , description:"", 
      address: "", city: "" }

  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const [ isSubmit, setIsSubmit] = useState(false);

  const [ formValid, setFormValid ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(Object.keys(formErrors).length === 0){
      
      // TODO: Adding action to both update STATE and CALL BE service
      dispatch();
    }
  }

  const handleUpload = async(e)=> {
    const files = e.target.files;

    setFormValues({...formValues, 'fotos':[files[0]] });

    // DOESNT PRINT THIS WITHIN SAME FUNC SCOPE
    console.log(files[0], formValues);
  }

  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors])

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.title){
      errors.title = "Title is required";
    }
    if(values.price === 0 ){
      errors.price = "There has to be a price";
    }
    if(!values.category){
      errors.category = "There has to be a selected category";
    }
    if(!values.type){
      errors.type = "There has to be a selected type";
    }
    if(!values.address){
      errors.address = "There has to be an address";
    }
    if(!values.city){
      errors.city = "There has to be a city";
    }
    if(!values.bathrooms){
      errors.bathrooms = "There has to be bathrooms";
    }
    if(!values.bedrooms){
      errors.bedrooms = "There has to be bedrooms";
    }
    return errors;
  }

  console.log('HERE ARE THE VALUES',formValues);

  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title={id ? "Edit Property" : "Add Property"}>
            <Add>
              <Form onSubmit={ handleSubmit }>
                {/* DESCRIPTION */}
                <Add.Description>
                  <Add.DescriptionHeader>
                    <Add.Title>Description</Add.Title>
                  </Add.DescriptionHeader>
                  <Add.DescriptionContent>
                    <Add.DescriptionContentTop>
                      <Form.FormGroup>
                        <Form.Label>
                          Property Title <span>(required)</span>
                        </Form.Label>
                        <Form.Input 
                          name="title"
                          value={formValues.title}
                          onChange={handleChange}
                        />
                        <p style={{color: "red"}}>{ formErrors.title }</p>
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Property Price <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          name="price"
                          type="number" 
                          value={formValues.price}
                          onChange={handleChange}  
                        />
                        <p style={{color: "red"}}>{ formErrors.price }</p>
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Category <span>(required)</span>
                        </Form.Label>
                        <Form.Select 
                          name="category"
                          onChange={handleChange}
                          >
                          <Form.Option disabled defaultValue>
                            None
                          </Form.Option>
                          <Form.Option>Apartment</Form.Option>
                          <Form.Option>House</Form.Option>
                          <Form.Option>Land</Form.Option>
                        </Form.Select>
                        <p style={{color: "red"}}>{ formErrors.category }</p>
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Listed In <span>(required)</span>
                        </Form.Label>
                        <Form.Select 
                          name="type" 
                          id=""
                          onChange={handleChange}
                          >
                          <Form.Option disabled defaultValue>
                            None
                          </Form.Option>
                          <Form.Option>Rental</Form.Option>
                          <Form.Option>Sales</Form.Option>
                        </Form.Select>
                        <p style={{color: "red"}}>{ formErrors.type }</p>
                      </Form.FormGroup>
                    </Add.DescriptionContentTop>
                    <Add.DescriptionContentBottom>
                      <Form.FormGroup>
                        <Form.Label>
                          Description <span>(required)</span>
                        </Form.Label>
                        <Form.TextArea 
                          name="" 
                          id="" 
                          cols="30" 
                          rows="10"
                          value={formValues.description}
                          onChange={handleChange}
                          >
                        </Form.TextArea>
                      </Form.FormGroup>
                    </Add.DescriptionContentBottom>
                  </Add.DescriptionContent>
                </Add.Description>

                {/* LOCATION  */}

                <Add.Location>
                  <Add.LocationHeader>
                    <Add.Title>Property Location</Add.Title>
                  </Add.LocationHeader>
                  <Add.LocationContent>
                    <Add.LocationContentTop>
                      <Form.FormGroup>
                        <Form.Label>
                          Address <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          name="address"
                          type="text" 
                          value={formValues.address}
                          onChange={handleChange}  
                          />
                      </Form.FormGroup>
                      <p style={{color: "red"}}>{ formErrors.address }</p>
                    </Add.LocationContentTop>
                    <Add.LocationContentBottom>
                      <Form.FormGroup>
                        <Form.Label>
                          Ciudad<span>(required)</span>
                        </Form.Label>
                        <Form.Input 
                          name="city"
                          type="text" 
                          value={formValues.city}
                          onChange={handleChange}    
                        />
                      </Form.FormGroup>
                      <p style={{color: "red"}}>{ formErrors.city }</p>
                    </Add.LocationContentBottom>
                  </Add.LocationContent>
                </Add.Location>

                {/* IMAGES */}

                <Add.Media>
                  <Add.MediaHeader>
                    <Add.Title>Property Images</Add.Title>
                  </Add.MediaHeader>
                  <Add.MediaContent>
                    <Form.FormGroup>
                      <Form.Label>Images</Form.Label>
                      {/* Special input file case */}
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        // style={{ display: "none" }}
                        onChange={handleUpload}
                      />
                      {/* <Form.Input 
                        type="file"
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                        onChange={handleUpload}
                      /> */}
                      {/* <Add.Button onClick={handleFileButton}>Upload Files</Add.Button> */}
                    </Form.FormGroup>
                  </Add.MediaContent>
                </Add.Media>

                {/* DETAILS */}

                <Add.Details>
                  <Add.DetailsHeader>
                    <Add.Title>Property Details</Add.Title>
                  </Add.DetailsHeader>
                  <Add.DetailsContent>
                    <Form.FormGroup>
                      <Form.Label>Bedrooms</Form.Label>
                      <Form.Input 
                        type="number" 
                        name="bedrooms"
                        onChange={handleChange}    
                      />
                      <p style={{color: "red"}}>{ formErrors.bedrooms }</p>
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Label>Bathrooms</Form.Label>
                       <Form.Select 
                        name="bathrooms" 
                        class="form-select"
                        onChange={handleChange}
                      >
                        <Form.Option>1</Form.Option>
                        <Form.Option>2</Form.Option>
                        <Form.Option>3</Form.Option>
                      </Form.Select>
                      <p style={{color: "red"}}>{ formErrors.bathrooms }</p>
                    </Form.FormGroup>
                  </Add.DetailsContent>
                </Add.Details>
                <Add.Footer>
                  <Form.FormGroup class="form-group">
                    <Form.SubmitInput
                      type="submit"
                      value={id ? "Update Property" : "Submit Property"}
                    />
                  </Form.FormGroup>
                  {id && (
                    <Form.FormGroup class="form-group">
                      <Form.SubmitInput type="submit" value="Cancel Update" />
                    </Form.FormGroup>
                  )}

                {/* END OF FORM */}

                </Add.Footer>
              </Form>
            </Add>
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

