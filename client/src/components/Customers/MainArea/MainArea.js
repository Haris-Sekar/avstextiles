import { Paper,TableContainer,Table,TableHead,TableRow,Button,TableCell,TableBody, Input } from "@mui/material";
import React,{useEffect, useState} from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../Toast/Toast";
import {Skeleton,Typography,TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
const MainArea = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState({id: "",value:true});
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch();
  // }, [dispatch]);
  // const { customers, isLoading } = useSelector(
  //   (state) => state.customerReducer
  // );
  const mainArea = [
    {_id:1,name:"Ammapet"},
    {_id:2,name:"aiasf"},
    {_id:3,name:"Gorimedu"},
    {_id:4,name:"Yercaurd"},
    {_id:5,name:"Kadiayampatti"},
  ];
  const isLoading = false;
  const [updateBtnText,setUpdateBtnText] = useState("Update");

const handleBtnChange = (e) =>{
  console.log(e);
  if(!isDisabled.value && e.target.name === "delete"){
    console.log("delete");
  }
  if(isDisabled.value) {
    setIsDisabled({id:e.target.id,value:false})
    setUpdateBtnText("Cancel")
  }
  else {
    setIsDisabled({id:"",value:true})
    setUpdateBtnText("Delete");
  }

}
  if(!isLoading){
    return (
      <div className="addCustomerContainer">
        <Toast />
        <Paper elevation={5} sx={{ width: "80%",borderRadius:20 }}> 
        <div className="customerTableContainer">
            <TableContainer
              component={Paper}
              elevation={5}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow> 
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Delete</TableCell> 
                  </TableRow>
                </TableHead>
                {mainArea.length > 0 ? (
                  <TableBody>
                    {mainArea.map((row) => (
                      <TableRow
                        style={{ 
                          transition: ".2s ease-in-out",
                        }}
                        key={row._id} 
                      > 
                        <TableCell align="left"><TextField disabled={isDisabled.id === row._id ? isDisabled.value : true} className="textBox" label="Name" variant="outlined" id="outlined-basic" value={row.name} /></TableCell>
                        <TableCell align="left"><Button variant="contained" onClick={handleBtnChange} startIcon={<BorderColorIcon />} id={row._id}>Update</Button></TableCell> 
                        <TableCell align="left"><Button variant="contained" color="error" onClick={handleBtnChange} startIcon={<DeleteIcon />} id={row._id} name={updateBtnText === "Delete" ? 'delete' : 'cancel'}>{updateBtnText}</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody> 
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                        <Typography></Typography>No Main Area found 
                        <br /> 
                        <Button sx={{ m: 3 }} variant="outlined">
                          Add some
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </div>
    );
  }
  else {
    return (
      <div className="customerTableContainer">
        <TableContainer
          component={Paper}
          elevation={5}
          style={{ width: "80%", borderRadius: "20px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Main Area</TableCell>
                <TableCell align="left">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  
};

export default MainArea;
