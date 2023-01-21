import React from 'react'
import Add from './Add';
import { getAllMainArea } from '../../../action/customer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const AddContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMainArea());
      }, []);
  return (
    <Add />
  )
}

export default AddContainer;