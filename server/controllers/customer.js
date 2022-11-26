import customerModel from "../models/customer.js";
import mainAreaModel from "../models/mainArea.js";
import _ from "lodash";
import { defaultPermissions } from "../consts/permission.js";
export const add = async (req, res) => {
  try {
    const newCustomer = new customerModel(
      _.pick(req.body, [
        "companyName",
        "name",
        "email",
        "phone",
        "address1","address2","city","state","pincode",
        "gstNum",
        "mainArea",
        "balance"
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
    const permissions = defaultPermissions['2'];
    newCustomer.cusId = "AVSC" + cusId1;
    newCustomer.permissions = permissions;
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
      console.log(result);
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

export const update = async (req, res) => {
  try {
    console.log("body", req.body);
    const update = await customerModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    const customer = await customerModel.find();
    console.log(customer);
    res.send({
      code: 200,
      result: customer,
      message: "Updated Successfully",
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

export const deleteCustomer = async (req, res) => {
  try {
    console.log(req.params);
    await customerModel.findByIdAndRemove(req.params.id);
    const response = {
      message: "Customer Deleted Successfully",
      code: 200,
    };
    res.send(response);
    return;
  } catch (error) {
    const response = {
      message: "Something went wrong",
      code: 500,
    };
    res.send(response);
    return;
  }
};

export const addMainArea = async (req, res) => {
  try {
    const newMainArea = new mainAreaModel(_.pick(req.body, ["name"]));
    const duplicateValidation = await mainAreaModel.findOne({
      name: req.body.name,
    });
    if (duplicateValidation) {
      const response = {
        code: 500,
        message: "This area is already added.",
      };
      res.send(response);
      return;
    } else {
      const result = await newMainArea.save();
      const all = await mainAreaModel.find();
      const response = {
        code: 200,
        message: "Area has been added successfully",
        result: all,
      };
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    const response = {
      message: "Something went wrong",
      code: 500,
    };
    res.send(response);
    return;
  }
};

export const getAllMainArea = async (req, res) => {
  try {
    const result = await mainAreaModel.find();
    const response = {
      code: 200,
      message: "fetched successfully",
      result: result,
    };
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    const response = {
      message: "Something went wrong",
      code: 500,
    };
    res.send(response);
    return;
  }
};
