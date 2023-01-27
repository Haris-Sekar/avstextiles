import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Button,
  TableCell,
  TableBody,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Toast from "../../Toast/Toast";
import Backdrop from "@mui/material/Backdrop";
import {
  addMainArea,
  getAllMainArea,
  updateMainArea,
  deleteMainArea,
} from "../../../action/customer";
import { Skeleton, Typography, TextField, Modal, Box } from "@mui/material";
import AlertBox from "../../AlertBox/AlertBox";

const MainArea = () => {
  const [open, setOpen] = React.useState(false);
  const [openNewMainAreaModel, setOpenNewMainAreaModel] = React.useState(false);
  const [newMainArea, setNewMainArea] = React.useState({ name: "" });
  const handleClose = () => setOpen(false);
  const handleCloseNew = () => setOpenNewMainAreaModel(false);
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
  const [updateRow, setUpdateRow] = useState({ name: "" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMainArea());
  }, [dispatch]);
  const { mainAreas, isLoading } = useSelector(
    (state) => state.customerReducer
  );
  const handleBtnChange = (e) => {
    setOpen(true);
    console.log(e);
    mainAreas.forEach((area) => {
      if (area._id === e.target.id) {
        setUpdateRow(area);
      }
    });
  };
  const updateArea = () => {
    dispatch(updateMainArea(updateRow, setOpen));
  };
  const [openAlert, setOpenAlert] = useState(false);
  const [alertResult, setResultAlert] = useState(false);
  const handleAlert = (e) => {
    console.log(e);
    if (e.target.name === "result" && e.target.value === "yes")
      setResultAlert(true);
    else if (e.target.name === "result" && e.target.value === "no"){
      setResultAlert(false);
      setOpenAlert(false);
    }
  };
  const handleDeleteBtn = (e) => {
    console.log(e.target.id);
    setOpenAlert(true);
    if (alertResult) {
      for (let i = 0; i < mainAreas.length; i++) {
        if (mainAreas[i]._id === e.target.id) delete mainAreas[i];
      }
      dispatch(deleteMainArea(e.target.id));
    }
  };

  const addNewMainArea = () => {
    if (newMainArea.name.length > 0) {
      dispatch(addMainArea(newMainArea, handleCloseNew));
    }
  };
  if (!isLoading) {
    return (
      <>
        {/* <AlertBox
          openAlert={openAlert}
          handleAlert={handleAlert}
          setOpenAlert={setOpenAlert}
          alertTitle="Deleting a Main Area"
          alertDescription="Deleting this main area will remove its associated customer. This cannot be undone."
          checkboxLabel="I understand that once deleted, this main area cannot be recovered."

        /> */}
        <div className="addNewBtn">
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenNewMainAreaModel(true)}
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
                  {mainAreas.length > 0 ? (
                    <TableBody>
                      {mainAreas.map((row) => (
                        <TableRow
                          style={{
                            transition: ".2s ease-in-out",
                          }}
                          key={row._id}
                        >
                          <TableCell align="left">{row.name}</TableCell>
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
                            onClick={() => setOpenNewMainAreaModel(true)}
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
                value={updateRow.name}
                onChange={(e) =>
                  setUpdateRow({ ...updateRow, name: e.target.value })
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
            open={openNewMainAreaModel}
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
                value={newMainArea.name}
                onChange={(e) =>
                  setNewMainArea({ ...newMainArea, name: e.target.value })
                }
                inputProps={{ autoFocus: openNewMainAreaModel }}
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
                onClick={() => setOpenNewMainAreaModel(false)}
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

export default MainArea;
