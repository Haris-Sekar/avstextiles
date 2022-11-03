import customerModel from "../models/customer.js";
import _ from "lodash";
export const add = async (req, res) => {
  try {
    const newCustomer = new customerModel(
      _.pick(req.body, [
        "name",
        "email",
        "phone",
        "address",
        "gstNum",
        "mainArea",
      ])
    );
    const lastId = await customerModel.find();
    let cusId = "AVSC0";
    if (lastId.length > 0) {
      cusId = lastId[lastId.length - 1].cusId;
      console.log(cusId);
    }
    cusId = cusId.split(/([0-9]+)/);
    var cusId1 = parseInt(cusId[1]) + 1;
    newCustomer.cusId = "AVSC" + cusId1;
    const validateExistingCustomerEmail = await customerModel.findOne({
      email: req.body.email,
    });
    const validateExistingCustomerPhone = await customerModel.findOne({
      phone: req.body.phone,
    });
    if (validateExistingCustomerEmail && validateExistingCustomerPhone) {
      const response = {
        message: "User with this email and phone number already exist",
        code: 500,
      };
      res.send(response);
      return;
    } else if (validateExistingCustomerEmail) {
      const response = {
        message: "User with this email already exist",
        code: 500,
      };
      res.send(response);
      return;
    } else if (validateExistingCustomerPhone) {
      const response = {
        message: "User with this phone number already exist",
        code: 500,
      };
      res.send(response);
      return;
    } else {
      const result = await newCustomer.save();
      const response = {
        message: "User added successfully",
        result: result,
        code: 200,
      };
      res.send(response);
      return;
    }
  } catch (error) {
    const response = {
      message: error.message,
      code: 500,
    };
    res.send(response);
    return;
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await customerModel.find();
    res.send({
      result: data,
      code: "200",
    });
  } catch (error) {
    const response = {
      message: error.message,
      code: 500,
    };
    res.send(response);
    return;
  }
};
