import React, { useState,useEffect } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Paper,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import "./Add.css";
import Toast from "../../Toast/Toast";
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getAllMainArea,
} from "../../../action/customer";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { stateAndCity } from "../../../constants/StateAndCity";
import { formatMoney } from "../../../constants/commonfunction";
const Add = (props) => {
  
  const { isLoading,mainAreas } = useSelector(
    (state) => state.customerReducer
  );
  const state = Object.keys(stateAndCity);
  var initialState = {
    companyName: "",
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    gstNumber: "",
    mainArea: "",
    state: "",
    city: "",
    pincode: "",
    balance: "",
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Edit");
  const [errors, setErrors] = useState({ ...initialState });
  if (props.details) {
    initialState = props.details;
  }

  const [customer, setCustomer] = useState(initialState);

  const [city, setCity] = useState(customer.state.length > 0 ? stateAndCity[customer.state] : []);
  var mainAreaList = [];
  const handleForm = (event, mainArea) => {
    if (event.target.name === "state") {
      setCity(stateAndCity[event.target.value]);
    }
    if (mainArea) {
      setCustomer({ ...customer, mainArea: mainArea });
    } else {
      if (
        event.target.name === "phone" ||
        event.target.name === "pincode" ||
        event.target.name === "balance"
      ) {
        if (!event.target.value.match(/^[0-9]+$/) != null) {
          setCustomer({ ...customer, [event.target.name]: event.target.value });
        }
      } else
        setCustomer({ ...customer, [event.target.name]: event.target.value });
      validation({ [event.target.name]: event.target.value });
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  
  
  if(isLoading){
    mainAreaList = ["Please Wait"]
  }
  else {
    mainAreas.forEach(element => {
      mainAreaList.push(element.name)
    });
  }
  
  const validation = (fieldValues = customer) => {
    let temp = { ...errors };
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );

    if ("companyName" in fieldValues)
      temp.companyName =
        fieldValues.companyName.length === 0 ? "Enter Company Name" : "";

    if ("email" in fieldValues)
      temp.email = !emailRegex.test(fieldValues.email) ? "Invalid Email" : "";

    if ("phone" in fieldValues) {
      if (fieldValues.phone.length !== 10) temp.phone = "Invalid phone number";
      else temp.phone = "";
    }
    if ("address1" in fieldValues)
      temp.address1 =
        fieldValues.address1.length === 0 ? "Enter valid address" : "";
    if ("pincode" in fieldValues)
      temp.pincode =
        fieldValues.pincode.length !== 6 ? "Enter a valid pincode" : "";
    setErrors({
      ...temp,
    });
    if (fieldValues === customer) {
      return Object.values(temp).every((val) => val === "");
    }
  };
  const submitForm = () => {
    if (validation()) {
      dispatch(addCustomer(customer, navigate));
    }
  };
  const handleBtnChange = () => {
    setIsDisabled(false);
    setBtnText("Update");
    if (btnText === "Update" && validation()) {
      dispatch(updateCustomer({data:[customer]},navigate, props.closeModal));
    }
  };
  const handleCancelChange = () => {
    setIsDisabled(true);
    setBtnText("Edit");
    setCustomer(props.details);
  };
  const handleDeleteCustomer = () => {
    dispatch(deleteCustomer(props.details._id, props.closeModal));
  };
  return (
    <div className="addCustomerContainer">
      <Toast />
      <Paper elevation={5} sx={{ width: "80%" }}>
        <div className="formContainer">
          {props.details ? (
            <TextField
              className="textBox"
              value={props.details.cusId}
              id="outlined-basic"
              label="Customer Id"
              disabled
              variant="outlined"
              sx={{ width: "84%" }}
            />
          ) : (
            <></>
          )}
          <TextField
            disabled={props.details ? isDisabled : !isDisabled}
            className="textBox"
            id="outlined-basic"
            onChange={(event) => handleForm(event)}
            sx={{ width: "84%" }}
            required
            name="companyName"
            label="Company Name"
            variant="outlined"
            value={customer.companyName}
            error={errors.companyName !== ""}
          />
          <TextField
            disabled={props.details ? isDisabled : !isDisabled}
            className="textBox"
            id="outlined-basic"
            onChange={(event) => handleForm(event)}
            sx={{ width: "40%" }}
            name="name"
            label="Name"
            variant="outlined"
            value={customer.name}
            error={errors.name !== ""}
          />
          <TextField
            className="textBox"
            id="outlined-basic"
            disabled={props.details ? isDisabled : !isDisabled}
            onChange={(event) => handleForm(event)}
            sx={{ width: "40%" }}
            label="Email"
            variant="outlined"
            value={customer.email}
            name="email"
            error={errors.email !== ""}
          />
          <TextField
            className="textBox"
            id="outlined-basic"
            sx={{ width: "40%" }}
            label="Phone"
            required
            type="phone"
            disabled={props.details ? isDisabled : !isDisabled}
            onChange={(event) => handleForm(event)}
            variant="outlined"
            value={customer.phone}
            name="phone"
            error={errors.phone !== ""}
          />
          <TextField
            className="textBox"
            id="filled-textarea"
            value={customer.address1}
            sx={{ width: "40%" }}
            label="Address Line 1"
            onChange={(event) => handleForm(event)}
            multiline
            required
            disabled={props.details ? isDisabled : !isDisabled}
            variant="outlined"
            name="address1"
            error={errors.address1 !== ""}
          />
          <TextField
            className="textBox"
            id="filled-textarea"
            value={customer.address2}
            sx={{ width: "40%" }}
            label="Address Line 2"
            onChange={(event) => handleForm(event)}
            multiline
            disabled={props.details ? isDisabled : !isDisabled}
            variant="outlined"
            name="address2"
            error={errors.address2 !== ""}
          />

            
          <FormControl disabled={props.details ? isDisabled : !isDisabled} sx={{ width: "40%" }} className="textBox">
            <InputLabel id="demo-simple-select-standard-label">
              State
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={customer.state}
              onChange={(event) => handleForm(event)}
              label="State"
              name="state"
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {state.map((ele) => (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl disabled={props.details ? isDisabled : !isDisabled} sx={{ width: "40%" }} className="textBox">
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={customer.city}
              onChange={(event) => handleForm(event)}
              label="City"
              name="city"
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {city.map((ele) => (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="textBox"
            id="filled-textarea"
            value={customer.pincode}
            sx={{ width: "40%" }}
            label="Pincode"
            onChange={(event) => handleForm(event)}
            multiline
            required
            disabled={props.details ? isDisabled : !isDisabled}
            variant="outlined"
            name="pincode"
            error={errors.pincode !== ""}
          />

          <TextField
            className="textBox"
            value={customer.gstNumber}
            id="outlined-basic"
            label="GST Number"
            disabled={props.details ? isDisabled : !isDisabled}
            onChange={(event) => handleForm(event)}
            sx={{ width: "40%" }}
            name="gstNumber"
            variant="outlined"
            error={errors.gstNumber !== ""}
          />

          {props.details ? (
            <>
              <Autocomplete
                disablePortal
                className="textBox"
                autoHighlight
                id="auto-highlight"
                options={mainAreaList}
                sx={{ width: "40%" }}
                disabled={props.details ? isDisabled : !isDisabled}
                name="mainArea"
                onChange={(event, mainArea) => handleForm(event, mainArea)}
                defaultValue={props.details.mainArea}
                renderInput={(params) => (
                  <TextField {...params} label="Main Area" name="mainArea" />
                )}
              />
            </>
          ) : (
            <Autocomplete
              disablePortal
              className="textBox"
              autoHighlight
              id="auto-highlight"
              options={mainAreaList}
              sx={{ width: "40%" }}
              name="mainArea"
              onChange={(event, mainArea) => handleForm(event, mainArea)}
              renderInput={(params) => (
                <TextField {...params} label="Main Area" />
              )}
            />
          )}

          <TextField
            label="Balance"
            id="outlined-start-adornment"
            sx={{ width: "84%" }}
            className="textBox"
            value={formatMoney(customer.balance)}
            name="balance"
            onChange={(event) => handleForm(event)}
            disabled={props.details ? isDisabled : !isDisabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />
        </div>
        <div className="btnContainer">
          {props.details ? (
            <>
              <Button
                variant="contained"
                onClick={handleBtnChange}
                startIcon={<BorderColorIcon />}
              >
                {btnText}
              </Button>
              {!isDisabled ? (
                <Button
                  variant="contained"
                  startIcon={<CancelRoundedIcon />}
                  onClick={handleCancelChange}
                  color="error"
                >
                  Cancel
                </Button>
              ) : (
                <></>
              )}

              <Button
                variant="contained"
                color="error"
                startIcon={<PersonRemoveIcon />}
                onClick={handleDeleteCustomer}
              >
                Delete Customer
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => submitForm()}
                startIcon={<GroupAddIcon />}
                color="success"
              >
                Add Customer
              </Button>
              <Button
                variant="contained"
                onClick={() => setCustomer(initialState)}
                startIcon={<RestartAltIcon />}
              >
                Reset all
              </Button>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Add;
