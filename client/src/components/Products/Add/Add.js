import React, { useState } from "react";
import { Paper, TextField, Autocomplete, Button } from "@mui/material";
import "./Add.css";
import Toast from "../../Toast/Toast";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
} from "../../../action/product";
import { v4 as uuidv4 } from "uuid";
import InputAdornment from "@mui/material/InputAdornment";
import { formatMoney } from "../../../constants/commonfunction";
import LoupeIcon from "@mui/icons-material/Loupe";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const Add = (props) => {
  const dispatch = useDispatch();
  var initialState = {
    name: "",
    productGroup: "",
    price: [],
    pcs: "",
  };
  
  const productGroupsList = [];
  const sizeList = [];
  // const [sizeList,setSizeList] = useState([]);
  
  const { productGroup, sizes } = useSelector((state) => state.productReducer);
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
    if (size) {
      let price1 = {};
      price1[size] = "";
      setProduct({ ...product, price: price1 });
    } else if (productGroup) {
      setProduct({ ...product, productGroup: productGroup });
    } else if (event.target.name === "pcs") {
      if (parseInt(event.target.value) === 0) {
        toast.error("Pcs cannot be 0(Zero)", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      const input = event.target.value.replace(/\D/g, "");
      setProduct({ ...product, pcs: input });
      validation({ [event.target.name]: event.target.value });
    } else {
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
      validation({ [event.target.name]: event.target.value });
    }
  };
  const priceItemContainerStyle = {
    display: "flex",
    width: "100%",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  };
  let priceInitialState = [{ id: uuidv4(), size: "", price: "" }];
  if(props.product) {
    console.log(props.product);
    Object.assign(initialState,props.product);
    priceInitialState = props.product.price
  }
  const [price, setPrice] = useState(priceInitialState);
  const handlePriceChange = (id, event, size) => {
    var newPrice;
    if (size) {
      newPrice = price.map((i) => {
        if (id === i.id) i.size = size;
        return i;
      });
    } else {
      newPrice = price.map((i) => {
        if (id === i.id) i[event.target.name] = event.target.value;
        return i;
      });
    }
    setPrice(newPrice);
  };

  const handleAddField = () => {
    setPrice([...price, { id: uuidv4(), size: "", price: "" }]);
  };
  

  const submitForm = () => {
    let productGroupId = "";  
    for(var i = 0;i<productGroup.length;i++){
      if(productGroup[i].groupName === product.productGroup){
        productGroupId = productGroup[i]._id;
      }
    }
    console.log(product);
    const formData = product;
    formData.productGroup = productGroupId;
    price.forEach((price)=>{
      price.id = sizes.filter((ele) => ele.size === price.size)[0]._id;
      price = Object.fromEntries(Object.entries(price).filter(([_, v]) => v != null));
    })
    formData.price = price;
    console.log(formData);
    if (validation()) {
      dispatch(
        addProduct(
          formData,
          setPrice,
          setProduct,
          initialState,
          priceInitialState
        )
      );
    } else {
      toast.error("Please Fill the highlighted fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleRemoveField = (id) => {
    console.log(id);
    const prices = [...price];
    console.log(prices.findIndex((value) => value.id === id));
    prices.splice(
      prices.findIndex((value) => value.id === id),
      1
    );
    console.log(prices);
    setPrice(prices);
  };
  const [errors, setErrors] = useState({ ...initialState });
  const validation = (fieldValues = product) => {
    let temp = { ...errors };
    if ("name" in fieldValues) {
      temp.name = fieldValues.name.length === 0 ? "Enter Product Name" : "";
    }
    if ("pcs" in fieldValues) {
      temp.pcs = fieldValues.pcs.length === 0 ? "Enter Number of Pcs" : "";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === product) {
      temp.price = "";
      return Object.values(temp).every((val) => val === "");
    }
  };
  return (
    <div className="addProductContainer">
      <Toast />
      <Paper elevation={5} sx={{ width: "80%" }}>
        <div className="formContainer">
          <TextField
            autoFocus
            className="textBox"
            id="outlined-basic"
            sx={{ width: "40%" }}
            required
            name="name"
            label="Product Name"
            variant="outlined"
            value={product.name}
            onChange={(event) => handleForm(event)}
            error={errors.name !== ""}
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
              <TextField {...params} label="Product Group" />
            )}
          />
          <Button variant="contained">Add New</Button>
          <Paper elevation={5} sx={{ width: "84%" }} className="priceContainer">
            <h1>Price</h1>
            {price.map((ele) => {
              return (
                <div key={ele.id} style={priceItemContainerStyle}>
                  <Autocomplete
                    disablePortal
                    className="textBox"
                    autoHighlight
                    id="auto-highlight"
                    options={sizeList}
                    sx={{ width: "40%" }}
                    name="Size"
                    onChange={(event, size) =>
                      handlePriceChange(ele.id, event, size)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Sizes" />
                    )}
                  />
                  <TextField
                    className="textBox"
                    id="outlined-basic"
                    sx={{ width: "40%" }}
                    name="price"
                    label="Price"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    value={formatMoney(ele.price)}
                    onChange={(event) => handlePriceChange(ele.id, event)}
                  />
                  <Button
                    className="PriceBtn"
                    variant="contained"
                    onClick={() => handleAddField()}
                  >
                    Add
                  </Button>
                  <Button
                    className="PriceBtn"
                    variant="contained"
                    color="error"
                    disabled={price.length === 1}
                    onClick={() => handleRemoveField(ele.id)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </Paper>

          <TextField
            className="textBox"
            id="outlined-basic"
            sx={{ width: "40%" }}
            required
            name="pcs"
            label="Pcs Per Box"
            variant="outlined"
            value={product.pcs}
            onChange={(event) => handleForm(event)}
            error={errors.pcs !== ""}
          />
        </div>
        <div className="btnContainer">
          <Button
            variant="contained"
            onClick={() => submitForm()}
            startIcon={<LoupeIcon />}
            color="success"
          >
            Add Product
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setProduct(initialState);
              setPrice(priceInitialState);
            }}
            startIcon={<RestartAltIcon />}
          >
            Reset all
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Add;
