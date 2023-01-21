import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

const moduleIds = {
  customer: "C0",
  mainArea: "MA0",
  product: "P0",
  size: "S0",
  productGroup: "PG0",
};

export const addDataToCollection = async (module, model, data, dataToPick) => {
  const newModel = new model(_.pick(data, dataToPick));
  const lastId = await model.find().sort({ _id: -1 }).limit(1);
  let modelId = process.env.SHORTNAME + moduleIds[module];
  if (lastId.length > 0) {
    modelId = lastId[lastId.length - 1][module + "Id"];
  }
  modelId = modelId.split(/([0-9]+)/);
  modelId = process.env.SHORTNAME+(parseInt(modelId[1]) + 1);
  newModel[module + "Id"] = modelId;
  const result = newModel.save();
  return result;
};
    

export const getDataFromCollection = async (module,model,userId,byId) => {
    if(byId){
        let result = await model.find({userId: userId});
    }
    else {
        let result = await model.find({userId: userId})
    }
    return result;
}