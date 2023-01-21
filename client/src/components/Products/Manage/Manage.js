import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct,getAllProductGroup,getAllSize } from "../../../action/product";
import Backdrop from "@mui/material/Backdrop";
import "./Manage.css";
import Add from "../Add/Add";
import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  Skeleton,
  Modal,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast/Toast";

const Manage = () => {
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "800px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  const { product, isLoading } = useSelector((state) => state.productReducer);
  const showProfile = (details) => {
    dispatch(getAllProductGroup());
    dispatch(getAllSize());
    setOpen(true);
    setSelectedRow(details);
  };
  if (!isLoading) {
    return (
      <>
        <Toast />
        <div className="customerTableContainer">
          <TableContainer
            component={Paper}
            elevation={5}
            style={{ width: "80%", borderRadius: "20px" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Product Group</TableCell>
                  <TableCell align="left">Pcs</TableCell>
                </TableRow>
              </TableHead>
              {product.length > 0 ? (
                <TableBody>
                  {product.map((row) => (
                    <TableRow
                      onClick={() => showProfile(row)}
                      style={{
                        cursor: "pointer",
                        transition: ".2s ease-in-out",
                      }}
                      key={row.productId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { background: "#edf2f4" },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.productId}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {row.productGroup.groupName}
                      </TableCell>
                      <TableCell align="left">{row.pcs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      <Typography></Typography>No Product found
                      <br />
                      <Button
                        sx={{ m: 3 }}
                        variant="outlined"
                        onClick={() => navigate("/products/Add")}
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
            <Add closeModal={handleClose} product={selectedRow} />
          </Box>
        </Modal>
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
                <TableCell>ID</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Product Group</TableCell>
                <TableCell align="left">Pcs</TableCell>
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default Manage;
