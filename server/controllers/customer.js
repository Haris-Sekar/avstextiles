import customerModel from "../models/customer.js";
import mainAreaModel from "../models/mainArea.js";
import _ from "lodash";
import { defaultPermissions } from "../const/permission.js";

export const add = async (req, res) => {
  try {
    const newCustomer = new customerModel(
      _.pick(req.body, [
        "companyName",
        "name",
        "email",
        "phone",
        "address1",
        "address2",
        "city",
        "state",
        "pincode",
        "gstNum",
        "mainArea",
        "balance",
      ])
    );
    const lastId = await customerModel.find().sort({ _id: -1 }).limit(1);
    let cusId = process.env.SHORTNAME + "C0";
    if (lastId.length > 0) {
      cusId = lastId[lastId.length - 1].cusId;
      console.log(cusId);
    }
    cusId = cusId.split(/([0-9]+)/);
    var cusId1 = parseInt(cusId[1]) + 1;
    const permissions = defaultPermissions["2"];
    newCustomer.cusId = process.env.SHORTNAME + "C" + cusId1;
    newCustomer.permissions = permissions;
    newCustomer.userId = req.id;
    if (newCustomer.balance === null) newCustomer.balance = 0;
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
        message: "Customer added successfully",
        result: result,
        code: 200,
      };
      res.status(200).json(response);
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

export const getCustomer = async (req, res) => {
  try {
    if (req.body.id) {
      const ids = req.body.id.split(" ");
      const data = await customerModel.find({ _id: ids });
      res.status(200).json({
        result: data,
        code: 200,
      });
    } else {
      const data = await customerModel.find({ userId: req.id });
      res.status(200).json({
        result: data,
        code: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

export const bulkUpdate = async (req, res) => {
  try {
    const toBeUpdatedData = req.body.data;
    let update;
    toBeUpdatedData.forEach(async (data) => {
      update = await customerModel.findByIdAndUpdate(
        { _id: data._id, cusId: req.id },
        data
      );
    });
    const customer = await customerModel.find();
    res.status(200).json({
      code: 200,
      result: customer,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      code: 500,
    });
    return;
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    console.log(req.query);
    await customerModel.findByIdAndRemove(req.query.id);
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
      userId: req.id,
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
      newMainArea.userId = req.id;
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

export const updateMainArea = async (req, res) => {
  try {
    const result = await mainAreaModel.findOneAndUpdate(
      { _id: req.body._id, userId: req.id },
      req.body
    );
    console.log(result);
    const mainArea = await mainAreaModel.find({ userId: req.id });
    res.status(200).json({
      code: 200,
      result: mainArea,
      message: "Main area Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const deleteMainArea = async (req, res) => {
  try {
    console.log(req);
    const result = await mainAreaModel.findOneAndDelete({userId: req.id,_id: req.query.id});
    console.log(result);
    res
      .status(200)
      .json({ message: "Main Area Deleted Successfully", code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};
