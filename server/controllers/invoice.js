import _ from "lodash";
import invoiceModel from "../models/invoice.js";
import { moduleIds } from "./commonFunction.js";

export const addInvoice = async (req,res) => {
    try {
        const newInvoice = new invoiceModel(_.pick(req.body,["customerId","invoiceRow","invoiceDiscount","invoiceNetRate"]));
        const lastId = await invoiceModel.find().sort({ _id: -1 }).limit(1);
        let invoiceId = process.env.SHORTNAME + moduleIds.invoice + "0";
        if (lastId.length > 0) {
            invoiceId = lastId[lastId.length - 1].invoiceId;
        }
        invoiceId = invoiceId.split(/([0-9]+)/);
        var newInvoiceId= parseInt(invoiceId[1]) + 1;
        newInvoice.invoiceId = process.env.SHORTNAME + moduleIds.invoice + productId1;
        newInvoice.userId = req.id;
        const result = await newInvoice.save();
        if(result) {
            res.status(201).json({
                code: 201,
                result: result,
                message: "Invoice Added Successfully"
            });
        } else {
            res.status(500).json({
                message: "Something went wrong",
                code: 500,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            code: 500
        });
    }
}