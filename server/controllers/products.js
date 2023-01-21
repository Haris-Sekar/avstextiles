import productModel from "../models/product.js";
import productSizeModel from "../models/size.js";
import productGroupModel from "../models/productGroup.js";
import _ from "lodash";

export const getAll = async (req, res) => {
  try {
    console.log(req.id);
    const products = await productModel
      .find({ userId: req.id })
      .populate({ path: "productGroup", select: "groupName" });
      console.log(products);
    res.status(200).json({
      code: 200,
      message: "All products has been fetched",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const add = async (req, res) => {
  try {
    const product = new productModel(
      _.pick(req.body, ["name", "productGroup", "price", "pcs"])
    );
    const lastId = await productModel.find().sort({ _id: -1 }).limit(1);
    let productId = process.env.SHORTNAME + "P0";
    if (lastId.length > 0) {
      productId = lastId[lastId.length - 1].productId;
      console.log(productId);
    }
    productId = productId.split(/([0-9]+)/);
    var productId1 = parseInt(productId[1]) + 1;
    product.productId = process.env.SHORTNAME + "P" + productId1;
    product.userId = req.id;
    const result = await product.save();
    const products = await productModel.find({ userId: req.id });
    res.status(201).json({
      code: 201,
      message: "Product created successfully",
      products: products,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      { _id: req.body._id, userId: req.id },
      req.body
    );
    const products = await productModel.find({ userId: req.id });
    res.status(200).json({
      code: 200,
      message: "Product Updated Successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await productModel.findByIdAndDelete({
      _id: req.params.id,
      userId: req.id,
    });
    res.status(202).json({
      code: 202,
      message: "Product Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const addSize = async (req, res) => {
  try {
    const checkUnique = await productSizeModel.find({ size: req.body.size });
    console.log(checkUnique);
    if (checkUnique.length > 0) {
      res.status(409).json({
        code: 409,
        message: "Size already exist",
        result: checkUnique,
      });
    } else {
      const size = new productSizeModel(_.pick(req.body, ["size"]));
      size.userId = req.id;
      const lastId = await productSizeModel.find().sort({ _id: -1 }).limit(1);
      let sizeId = process.env.SHORTNAME + "S0";
      if (lastId.length > 0) {
        sizeId = lastId[lastId.length - 1].sizeId;
        console.log(sizeId);
      }
      sizeId = sizeId.split(/([0-9]+)/);
      var sizeId1 = parseInt(sizeId[1]) + 1;
      size.sizeId = process.env.SHORTNAME + "S" + sizeId1;
      const result = await size.save();
      res.status(201).json({
        code: 201,
        message: "Size added successfully",
        result: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const getAllSize = async (req, res) => {
  try {
    const sizes = await productSizeModel.find({ userId: req.id });
    res.status(200).json({
      code: 200,
      message: "fetched successfully",
      sizes: sizes,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const updateSize = async (req, res) => {
  try {
    const updateSize = await productSizeModel.findByIdAndUpdate(
      { _id: req.body._id, userId: req.id },
      req.body
    );
    const sizes = await productSizeModel.find({ userId: req.id });
    res.status(200).json({
      code: 200,
      message: "Size updated successfully",
      sizes: sizes,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const deleteSize = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await productSizeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.id,
    });
    console.log(result);
    res.status(202).json({
      code: 202,
      message: "Size Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const getAllProductGroup = async (req, res) => {
  try {
    const productGroups = await productGroupModel.find({ userId: req.id });
    res.status(200).json({
      code: 200,
      message: "Product Group fetched successfully",
      productGroups: productGroups,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const addProductGroup = async (req, res) => {
  try {
    console.log(req.body);
    const productGroup = new productGroupModel(_.pick(req.body, ["groupName"]));
    const lastId = await productGroupModel.find().sort({ _id: -1 }).limit(1);
    let groupId = process.env.SHORTNAME + "PG0";
    if (lastId.length > 0) {
      groupId = lastId[lastId.length - 1].groupId;
      console.log(groupId);
    }
    groupId = groupId.split(/([0-9]+)/);
    var groupId1 = parseInt(groupId[1]) + 1;
    productGroup.groupId = process.env.SHORTNAME + "PG" + groupId1;
    productGroup.userId = req.id;
    console.log(productGroup);
    const result = await productGroup.save();
    res.status(201).json({
      code: 201,
      message: "Product Group added successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const updateProductGroup = async (req, res) => {
  try {
    const updateProductGroup = await productGroupModel.findByIdAndUpdate(
      { _id: req.body._id, userId: req.id },
      req.body
    );
    const productGroups = await productGroupModel.find();
    res.status(200).json({
      code: 200,
      message: "Product Group updated",
      productGroups: productGroups,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const deleteProductGroup = async (req, res) => {
  try {
    const result = await productGroupModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.id,
    });
    console.log(result);
    if (result === null) {
      res.status(202).json({
        code: 204,
        message: "No product group found",
      });
    } else {
      res.status(202).json({
        code: 202,
        message: "Product Group Delete Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};
