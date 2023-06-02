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
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Toast from "../../Toast/Toast";
import Backdrop from "@mui/material/Backdrop";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  getAllSize,
  addSize,
  updateSize,
  deleteSize,
} from "../../../action/product";
import { Skeleton, Typography, TextField, Modal, Box } from "@mui/material";
import { sortSize } from "../../../constants/commonfunction";
import AlertBox from "../../AlertBox/AlertBox";
import { alertMessages } from "../../../constants/consts";
const Size = () => {
  const [open, setOpen] = React.useState(false);
  const [openNewSizeModel, setOpenNewSizeModel] = React.useState(false);
  const [newSize, setNewSize] = React.useState({ size: "" });
  const handleClose = () => setOpen(false);
  const handleCloseNew = () => setOpenNewSizeModel(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertQuestion, setAlertQuestion] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
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

  let { sizes, isLoading, btnLoad } = useSelector(
    (state) => state.productReducer
  );

  sizes = sortSize(sizes);

  const handleBtnChange = (e) => {
    setOpen(true);
    sizes.forEach((area) => {
      if (area._id === e.target.id) {
        setUpdateRow(area);
      }
    });
  };


  const handleUpdateSizeBtn = () => {
    sizes.forEach((ele) => {
      if (ele._id === updateRow._id) {
        ele.size = updateRow.size;
      }
    });
    const formData = { data: updateRow };
    dispatch(updateSize(formData, setOpen));
  };
  const [deleteLoad, setDeleteLoad] = useState(-1);
  const [alertObject, setAlertObject] = useState();
  const handleDeleteBtn = (e) => {
    setAlertOpen(true);
    setAlertQuestion(alertMessages.delete.getModelQuestion("size"));
    setAlertDescription(alertMessages.delete.getSizeDescription);
    setAlertObject(e.currentTarget);
  };

  const deleteSizeCallback = (e) => {
    sizes.forEach((size, index, object) => {
      if (size._id === e.id) {
        object.splice(index, 1);
      }
    });
    setDeleteLoad(e.id);
    dispatch(deleteSize(e.id));
  };
  const addNewSize = () => {
    if (newSize.size.length > 0) {
      dispatch(addSize(newSize, handleCloseNew));
    }
  };

  if (!isLoading) {
    return (
      <>
        <AlertBox
          open={alertOpen}
          setOpen={setAlertOpen}
          callback={deleteSizeCallback}
          alertObject={alertObject}
          question={alertQuestion}
          description={alertDescription}
          noText="Cancle"
          yesText="Confirm"
        />
        <div className="addNewBtn">
          <Button color="success" variant="contained" onClick={() => setOpenNewSizeModel(true)}>
            Add New Size
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
                  {sizes && sizes.length > 0 ? (
                    <TableBody>
                      {sizes.map((row) => (
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
                            <LoadingButton
                              size="small"
                              onClick={(e) => handleDeleteBtn(e)}
                              endIcon={<DeleteIcon />}
                              loading={btnLoad && deleteLoad === row._id}
                              loadingPosition="end"
                              id={row._id}
                              variant="contained"
                              color="error"
                            >
                              <span>Delete</span>
                            </LoadingButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                          <Typography></Typography>No Size found
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
              <LoadingButton
                size="small"
                onClick={handleUpdateSizeBtn}
                endIcon={<BorderColorIcon />}
                loading={btnLoad}
                loadingPosition="end"
                variant="contained"
              >
                <span>Update</span>
              </LoadingButton>
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
                label="Size"
                variant="outlined"
                id="outlined-basic"
                value={newSize.name}
                onChange={(e) =>
                  setNewSize({ ...newSize, size: e.target.value })
                }
                inputProps={{ autoFocus: openNewSizeModel }}
              />

              <LoadingButton
                size="small"
                onClick={addNewSize}
                startIcon={<AddCircleIcon />}
                loading={btnLoad}
                loadingPosition="start"
                variant="contained"
              >
                <span>Add</span>
              </LoadingButton>
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
