import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ImgSize from "../imgsize";
import Pagination from "@mui/material/Pagination";
import Avatar from "../../assets/images/avatar.png";
import { Modal } from "@mui/material";
import Inputtag from "../input";
import styled from "styled-components";
import Button from "../button";

const columns = [
  { id: "username", label: "USERNAME" },
  {
    id: "gmail",
    label: "Gmail",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "password",
    label: "password",
  },
  {
    id: "option",
    label: "Option",
  },
];

const BrandTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleted, setdeleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [brandID, setBrandID] = useState("");
  const [brandUsername, setBrandUsername] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandImage, setBrandImage] = useState("");
  const [brandPassword, setBrandPassword] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const Editproduct = async (row) => {
    setBrandID(row._id)
    setBrandUsername(row.username)
    setBrandEmail(row.email)
    setIsOpen(true);
  };

  const Deleteproduct = async (product_id) => {
    const productid = { _id: product_id };
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/users/deleteuser",
        productid
      );
      toast(result.data);
    } catch (err) {
      console.log(err);
    }
    setdeleted(!deleted);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const update = {
        _id: brandID,
        username: brandUsername,
        email: brandEmail,
    }
      try {
        const res = await axios.post(
            process.env.REACT_APP_API + "/api/users/updatebrand",
            update
        );
        setIsOpen(false)
    } catch (err) {
      console.log(err);
    }
  };

  const allproduct = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/users/alluser"
      );

      setProducts(res.data.filter((item) => item.isBrand === true));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      allproduct();
    }, 1000);
  }, [allproduct]);
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          background: "#131129",
        }}
      >
        <TableContainer sx={{ height: "500px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      backgroundColor: "#1D1932",
                      zIndex: "0",
                      color: "white",
                    }}
                    key={column.id}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 &&
                products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell sx={{ color: "white" }}>
                        {row.username}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{row.email}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <ImgSize url={row.photo ? row.photo : Avatar} />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.password}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <FaRegEdit onClick={() => Editproduct(row)} />
                          <FaRegTrashAlt
                            onClick={() => {
                              Deleteproduct(row._id);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            <Modal
                open={modalIsOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <WrapperInput>
                <InputContent>
                  <Inputtag
                    text="Username"
                    type="text"
                    value={brandUsername}
                    onChange={(e) => {
                      setBrandUsername(e.target.value);
                    }}
                  >
                  </Inputtag>
                </InputContent>
                <InputContent>
                  <Inputtag
                      text="Email"
                      type="text"
                      value={brandEmail}
                      onChange={(e) => {
                        setBrandEmail(e.target.value);
                      }}
                    >
                  </Inputtag>
                </InputContent>
                <InputContent>
                  <Button text="Submit" onClick={handleEdit} />
                  <Button text="Cancel" onClick={() => setIsOpen(false)} />
                </InputContent>
              </WrapperInput>
            </Modal>
          </Table>
        </TableContainer>
        <Pagination
          count={
            products.length % rowsPerPage === 0
              ? Math.floor(products.length / rowsPerPage)
              : Math.floor(products.length / rowsPerPage) + 1
          }
          page={page + 1}
          color="secondary"
          onChange={handleChangePage}
        />
      </Paper>
    </>
  );
};

const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 4px;
  padding: 40px;
  max-width: 400px;
`;

const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export default BrandTable;
