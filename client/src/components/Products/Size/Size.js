import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Button,
    TableCell,
    TableBody,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import BorderColorIcon from "@mui/icons-material/BorderColor";
  import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
  import { useDispatch, useSelector } from "react-redux";
  import DeleteIcon from "@mui/icons-material/Delete";
  import Toast from "../../Toast/Toast";
  import Backdrop from "@mui/material/Backdrop";
  import { getAllSize,addSize,updateSize, deleteSize } from "../../../action/product";
  import { Skeleton, Typography, TextField, Modal, Box } from "@mui/material";
  
  const Size = () => {
    const [open, setOpen] = React.useState(false);
    const [openNewSizeModel, setOpenNewSizeModel] = React.useState(false);
    const [newSize, setNewSize ] = React.useState({ size: "" });
    const handleClose = () => setOpen(false);
    const handleCloseNew = () => setOpenNewSizeModel(false);
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "fit-content",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: "20px",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: 3,
    };
    const [updateRow, setUpdateRow] = useState({ size: "" });
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllSize());
    }, [dispatch]);
  
    const {size, isLoading} = useSelector(
      (state) =>state.productReducer
    )
  
    console.log(size);
    const handleBtnChange = (e) => {
      setOpen(true);
      console.log(e);
      size.forEach((area) => {
        if (area._id === e.target.id) {
          setUpdateRow(area);
        }
      });
    };
    const updateArea = () => {
      console.log(updateRow);
      size.forEach((ele) => {
        if(ele._id === updateRow._id){
          ele.size = updateRow.size;
        } 
      });
      dispatch(updateSize(updateRow, setOpen));
    };
  
    const handleDeleteBtn = (e) => {
      console.log(e.target.id);
      for (let i = 0; i < size.length; i++) {
        if (size[i]._id === e.target.id) delete size[i];
      }
      dispatch(deleteSize(e.target.id));
    };
  
    const addNewMainArea = () => {
      if (newSize.size.length > 0) {
        dispatch(addSize(newSize, handleCloseNew));
      }
    };
  
    if (!isLoading) {
      return (
        <>
          <div className="addNewBtn">
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenNewSizeModel(true)}
            >
              Add New
            </Button>
          </div>
          <div className="addCustomerContainer">
            <Toast />
            <Paper elevation={5} sx={{ width: "80%", borderRadius: 20 }}>
              <div className="customerTableContainer">
                <TableContainer component={Paper} elevation={5}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    {size && size.length > 0 ? (
                      <TableBody>
                        {size.map((row) => (
                          <TableRow
                            style={{
                              transition: ".2s ease-in-out",
                            }}
                            key={row._id}
                          >
                            <TableCell align="left">{row.size}</TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                onClick={handleBtnChange}
                                startIcon={<BorderColorIcon />}
                                id={row._id}
                              >
                                Update
                              </Button>
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => handleDeleteBtn(e)}
                                startIcon={<DeleteIcon />}
                                id={row._id}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                            <Typography></Typography>No Main Area found
                            <br />
                            <Button
                              sx={{ m: 3 }}
                              variant="outlined"
                              onClick={() => setOpenNewSizeModel(true)}
                            >
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              sx={{ borderColor: "white" }}
            >
              <Box sx={style}>
                <TextField
                  className="textBox"
                  label="Name"
                  variant="outlined"
                  id="outlined-basic"
                  value={updateRow.size}
                  onChange={(e) =>
                    setUpdateRow({ ...updateRow, size: e.target.value })
                  }
                  inputProps={{ autoFocus: open }}
                />
                <Button
                  variant="contained"
                  onClick={updateArea}
                  startIcon={<BorderColorIcon />}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpen(false)}
                  startIcon={<CancelRoundedIcon />}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
            <Modal
              open={openNewSizeModel}
              onClose={handleCloseNew}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              sx={{ borderColor: "white" }}
            >
              <Box sx={style}>
                <TextField
                  className="textBox"
                  label="Name"
                  variant="outlined"
                  id="outlined-basic"
                  value={newSize.name}
                  onChange={(e) =>
                    setNewSize({ ...newSize, size: e.target.value })
                  }
                  inputProps={{ autoFocus: openNewSizeModel }}
                />
                <Button
                  variant="contained"
                  onClick={addNewMainArea}
                  startIcon={<BorderColorIcon />}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenNewSizeModel(false)}
                  startIcon={<CancelRoundedIcon />}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </div>
        </>
      );
    } else {
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  };
  
  export default Size;
  