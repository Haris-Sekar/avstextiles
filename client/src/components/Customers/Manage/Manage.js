import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../../action/customer";
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
import { formatMoney } from "../../../constants/commonfunction";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast/Toast";

const Manage = (props) => {
  if(props.toast){
    Toast(props.type,props.toast);
  }
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
    dispatch(getAllCustomer());
  }, [dispatch]);
  const { customers, isLoading } = useSelector(
    (state) => state.customerReducer
  );
  const showProfile = (details) => {
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Main Area</TableCell>
                  <TableCell align="left">Balance</TableCell>
                </TableRow>
              </TableHead>
              {customers.length > 0 ? (
                <TableBody>
                  {customers.map((row) => (
                    <TableRow
                      onClick={() => showProfile(row)}
                      style={{
                        cursor: "pointer",
                        transition: ".2s ease-in-out",
                      }}
                      key={row.cusId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { background: "#edf2f4" },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.cusId}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.mainArea}</TableCell>
                      <TableCell align="left">
                        {(row.balance) ? formatMoney(row.balance.toString()) : formatMoney('0')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      <Typography></Typography>No Customers found
                      <br />
                      <Button
                        sx={{ m: 3 }}
                        variant="outlined"
                        onClick={() => navigate("/customers/AddCustomer")}
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
            <Add closeModal={handleClose} details={selectedRow} />
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

export default Manage;
