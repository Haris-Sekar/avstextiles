import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProductGroup, getAllSize } from "../../../action/product";
import Add from "./Add";

const AddContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductGroup());
    dispatch(getAllSize());
  }, []);
  return (<Add />);
};

export default AddContainer;
