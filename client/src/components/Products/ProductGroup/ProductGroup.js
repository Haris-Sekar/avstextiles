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
import { getAllProductGroup,addProductGroup, updateProductGroup, deleteProductGroup } from "../../../action/product";
import { Skeleton, Typography, TextField, Modal, Box } from "@mui/material";
import { alertMessages } from "../../../constants/consts";
import AlertBox from "../../AlertBox/AlertBox";

const ProductGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [openNewMainAreaModel, setOpenNewMainAreaModel] = React.useState(false);
  const [newProductGroup, setNewProductGroup] = React.useState({ groupName: "" });
  const handleClose = () => setOpen(false);
  const handleCloseNew = () => setOpenNewMainAreaModel(false);
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
  const [updateRow, setUpdateRow] = useState({ groupName: "" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductGroup());
  }, [dispatch]);

  const {productGroup, isLoading,btnLoad} = useSelector(
    (state) =>state.productReducer
  )

  const handleBtnChange = (e) => {
    setOpen(true);
    productGroup.forEach((area) => {
      if (area._id === e.target.id) {
        setUpdateRow(area);
      }
    });
  };
  const updateArea = () => {
    productGroup.forEach((ele) => {
      if(ele._id === updateRow._id){
        ele.groupName = updateRow.groupName;
      } 
    });
    dispatch(updateProductGroup(updateRow, setOpen));
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
    productGroup.forEach((group, index, object) => {
      if (group._id === e.id) {
        object.splice(index, 1);
      }
    });
    setDeleteLoad(e.id);
    dispatch(deleteProductGroup(e.id));
  };


  const addNewProductGroup = () => {
    if (newProductGroup.groupName.length > 0) {
      dispatch(addProductGroup(newProductGroup, handleCloseNew));
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
                  {productGroup && productGroup.length > 0 ? (
                    <TableBody>
                      {productGroup.map((row) => (
                        <TableRow
                          style={{
                            transition: ".2s ease-in-out",
                          }}
                          key={row._id}
                        >
                          <TableCell align="left">{row.groupName}</TableCell>
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
                          <Typography></Typography>No product group found
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
                value={updateRow.groupName}
                onChange={(e) =>
                  setUpdateRow({ ...updateRow, groupName: e.target.value })
                }
                inputProps={{ autoFocus: open }}
              />
              <LoadingButton
                size="small"
                onClick={updateArea}
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
                value={newProductGroup.name}
                onChange={(e) =>
                  setNewProductGroup({ ...newProductGroup, groupName: e.target.value })
                }
                inputProps={{ autoFocus: openNewMainAreaModel }}
              />
              <LoadingButton
                size="small"
                onClick={addNewProductGroup}
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

export default ProductGroup;

