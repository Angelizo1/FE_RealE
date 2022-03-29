import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useNavigate  } from "react-router-dom";

import { getPropertyList, getSortedPropertyList, getStructureData } from "../redux/actions/propertiesAction";

import { FormWrapper, Form } from "../components";

import { priceFormat } from "../helpers/helper_functions";

import { getData } from "../helpers/helper_data";

import { useHistory } from "react-router-dom";


const AdvancedSearchContainer = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  // const navigate = useNavigate();

  const { structureData } = useSelector((state)=> state.propertyStructureData);
  const { properties } = useSelector((state) => state.propertyList);

  // console.log('THESE ARE THE PROPERTIES',properties);

  // Que visaje el + que lleva esto
  const price = properties.map(
    (property) => +property.price.split(",").join("")
  );

  const priced = structureData.prices || [];

  const maxPrice = Math.max.apply(null, price),
    minPrice = Math.min.apply(null, price);

  const maxPriced = Math.max.apply(null, priced),
    minPriced = Math.min.apply(null, priced);

  const categories = [
    ...new Set(properties.map((property) => property.category)),
  ];

  // QUE VISAJE LO DEL TIEMPO de carga
  const categoriesd = structureData.categories || [];

  const listedIn = [
    ...new Set(properties.map((property) => property.listedIn)),
  ];

  const listedInd = structureData.types || [];

  const counties = [
    ...new Set(properties.map((property) => property.address.county)),
  ];

  const countiesd = structureData.counties|| [];

  const rooms = [
    ...new Set(properties.map((property) => property.features.bedrooms)),
  ].sort((a, b) => a - b);

  const roomsd = structureData.bedrooms || [];

  const [priceRange, setPriceRange] = useState(0);

  const [selectRoom, setSelectRoom] = useState('');

  const [selectCategories, setSelectCategories] = useState('');

  const [selectTypes, setSelectTypes] = useState('');

  const [selectCounties, setSelectCounties] = useState('');

  const submitSearch = (e) => {
    e.preventDefault(); 

    const sortedProps = getData({selectRoom, selectCategories, selectTypes, selectCounties});

    dispatch(getPropertyList({data: sortedProps}));
    
    history.push('/listing');
    
  }

  /* This was here originally, Gotta work around it */
  /* APPARENTLY IS NEEDED FOR WHENEVER I WANT TO GO BACK THERE HAS TO BE OPTIONS */

  useEffect(() => {
    dispatch(getStructureData());
    // dispatch(getPropertyList());
  }, [dispatch]);
  // }, [dispatch]);

  // console.log(categories,listedIn,counties,rooms);
  // console.log('Look',price, maxPrice, minPrice);
  // console.log(categoriesd,listedInd,countiesd,roomsd);

  return (
    <FormWrapper>
      <FormWrapper.Header>
        <FormWrapper.Title>Advanced Search</FormWrapper.Title>
      </FormWrapper.Header>
      <FormWrapper.Content>
        <Form>
          <Form.FormGroup>
            <Form.Select onChange={(e)=> setSelectTypes(e.target.value)}>
              <Form.Option defaultValue>Types</Form.Option>
              {listedInd.map((type) => (
                <Form.Option 
                  key={type}
                >{type}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select onChange={(e)=> setSelectCounties(e.target.value)}>
              <Form.Option defaultValue>Counties</Form.Option>
              {countiesd.map((county) => (
                <Form.Option key={county}
                  >{county}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select onChange={(e)=> setSelectCategories(e.target.value)}>
              <Form.Option defaultValue>Categories</Form.Option>
              {categoriesd.map((category) => (
                <Form.Option 
                  key={category}
                  >{category}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select onChange={(e)=> setSelectRoom(e.target.value)}>
              <Form.Option defaultValue>Bed Rooms</Form.Option>
              {roomsd.map((room) => (
                <Form.Option 
                  key={Math.random(room)}
                  value={room}
                  >
                    {room}
                </Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Span>
              {" "}
              Price range: Ksh {priceFormat(+priceRange)} to Ksh{" "}
              {priceFormat(maxPriced)}
            </Form.Span>
            <Form.RangeInput
              type="range"
              min={minPriced}
              max={maxPriced}
              value={priceRange}
              // onChange={({ target: { value } }) => console.log(value) }
              onChange={({ target: { value } }) => setPriceRange(value) }
            />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Input type="text" placeholder="Search Term" />
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.SubmitInput 
              type="submit" 
              value="Search" 
              onClick={submitSearch} />
          </Form.FormGroup>
        </Form>
      </FormWrapper.Content>
    </FormWrapper>
  );
};

export default AdvancedSearchContainer;
