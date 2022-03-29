import properties from "../dev-data/listing";

export const getData = ({
  selectRoom = null, 
  selectCategories = null, 
  selectTypes = null, 
  selectCounties = null } = {}) => {
    
  let tempProperties = properties;
  console.log(selectRoom
    ,selectCategories
    ,selectTypes
    ,selectCounties)
  console.log('propsss   1', tempProperties);

  if(selectRoom){
    console.log(selectRoom, tempProperties[0].features.bedrooms)
    tempProperties = tempProperties.filter(prop => 
      prop.features.bedrooms >= parseInt(selectRoom)
    );
  }
  console.log('IN BETWEEN', tempProperties);
  if(selectCategories){
    tempProperties = tempProperties.filter(prop => prop.category === selectCategories);
  }
  console.log('IN BETWEEN categories', tempProperties);

  if(selectTypes){
    selectTypes = selectTypes.toLowerCase();
    tempProperties = tempProperties.filter(prop => prop.listedIn === selectTypes);
  }
  console.log('IN BETWEEN types', tempProperties);

  if(selectCounties){
    tempProperties = tempProperties.filter(prop => prop.address.city === selectCounties);
  }
  console.log('propsss    2', tempProperties);

  return tempProperties;
}