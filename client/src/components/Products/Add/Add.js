import React, { useState, useEffect } from "react";
import { Paper, TextField, Autocomplete } from "@mui/material";
import "./Add.css";
import Toast from "../../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductGroup, getAllSize } from "../../../action/product";
const Add = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductGroup());
    dispatch(getAllSize());
  }, []);
  var initialState = {
    name: "",
    productGroup: "",
    price: [],
    unit: "",
    pcs: "",
  };
  const productGroupsList = [];
  const sizeList = [];
  const { productGroup, sizes } = useSelector((state) => state.productReducer);
  console.log(productGroup);

  const [product, setProduct] = useState(initialState);
  if (productGroup) {
    productGroup.forEach((ele) => {
      productGroupsList.push(ele.groupName);
    });
  }
  if (sizes) {
    sizes.forEach((ele) => {
      sizeList.push(ele.size);
    });
  }
  const handleForm = (event, productGroup, size) => {
    console.log(size);
    if (size) {
      let price1 = {};
      price1[size] = "";
      setProduct({ ...product, price: price1 });
    } else if (productGroup) {
      setProduct({ ...product, productGroup: productGroup });
    } else {

      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    }
  };
  console.log(product);
  return (
    <div className="addProductContainer">
      <Toast />
      <Paper elevation={5} sx={{ width: "80%" }}>
        <div className="formContainer">
          <TextField
            className="textBox"
            id="outlined-basic"
            sx={{ width: "40%" }}
            required
            name="name"
            label="Product Name"
            variant="outlined"
            value={product.name}
            onChange={(event) => handleForm(event)}
          />
          <Autocomplete
            disablePortal
            className="textBox"
            autoHighlight
            id="auto-highlight"
            options={productGroupsList}
            sx={{ width: "40%" }}
            name="mainArea"
            onChange={(event, mainArea) => handleForm(event, mainArea)}
            renderInput={(params) => (
              <TextField {...params} label="Main Area" />
            )}
          />
          <Paper elevation={5} sx={{ width: "84%" }} className="priceContainer">
            <Autocomplete
              disablePortal
              className="textBox"
              autoHighlight
              id="auto-highlight"
              options={sizeList}
              sx={{ width: "40%" }}
              name="Size"
              onChange={(event, size) => handleForm(event, undefined, size)}
              renderInput={(params) => <TextField {...params} label="Sizes" />}
            />
            <TextField
              className="textBox"
              id="outlined-basic"
              sx={{ width: "40%" }}
              name="Price"
              label="Price"
              variant="outlined"
              value={product.name}
              onChange={(event) => handleForm(event)}
            />
          </Paper>
        </div>
        <div className="btnContainer"></div>
      </Paper>
    </div>
  );
};

export default Add;
