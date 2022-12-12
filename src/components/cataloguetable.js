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
import ImgSize from "./imgsize";
import { AuthContext } from "../Context/AuthContext";
import loading from "../assets/images/loading1.gif";
import styled from "styled-components";
import { Modal } from "@mui/material";
import { TbUser, TbZoomCheck } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import Inputtag from "./input";
import Button from "./button";
import Pagination from "@mui/material/Pagination";

const columns = [
  { id: "sku", label: "SKU" },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "option",
    label: "Option",
  },
];

const CatalogueTable = ({ clickshopify }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleted, setdeleted] = useState(false);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sku, setSku] = useState("");
  const [cataloguid, setCataloguid] = useState("");
  const [image, setImage] = useState("");
  const [proname, setProname] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fileurl, setFileurl] = useState(null);
  const userId = user.user._id;

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const newproduct = new FormData();
    newproduct.append("sku", sku);
    newproduct.append("name", proname);
    newproduct.append("quantity", quantity);
    newproduct.append("_id", cataloguid);
    newproduct.append("image", image);

    const skus = { sku: sku };
    await axios
      .post(process.env.REACT_APP_API + "/api/catalogue/allsku", skus)
      .then(async (res) => {
        if (res.data.length !== 0) {
          console.log(res.data[0]._id, cataloguid);
          if (res.data[0]._id !== cataloguid) {
            return toast("SKU already exist");
          } else {
            try {
              await axios.post(
                process.env.REACT_APP_API + "/api/catalogue/updateproduct",
                newproduct,
                config
              );
              toast("product change");
              setdeleted(!deleted);
              setIsOpen(false);
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          try {
            await axios.post(
              process.env.REACT_APP_API + "/api/catalogue/updateproduct",
              newproduct,
              config
            );
            toast("product change");
            setdeleted(!deleted);
            setIsOpen(false);
          } catch (err) {
            console.log(err);
          }
        }
      });
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setFileurl(URL.createObjectURL(e.target.files[0]));
  };

  const Editproduct = async (row) => {
    setSku(row.sku);
    setImage(row.image);
    setProname(row.name);
    setQuantity(row.quantity);
    setCataloguid(row._id);
    setIsOpen(true);
    setFileurl(null);
  };

  const Deleteproduct = async (product_id) => {
    const productid = { _id: product_id };
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/catalogue/deleteproduct",
        productid
      );
      toast(result.data);
    } catch (err) {
      console.log(err);
    }
    setdeleted(!deleted);
  };

  const allproduct = async () => {
    try {
      const userid = { userid: userId };
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/catalogue/allproduct",
        userid
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      allproduct();
    }, 2000);
  }, [allproduct]);

  return (
    <>
      {!isLoaded && (
        <Wrapp>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapp>
      )}
      {isLoaded && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Modal
            open={modalIsOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <Imageupload src={fileurl ? fileurl : image} alt="" />
              <Upload
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                name="image"
                onChange={handleChange}
              />
              <InputContent>
                <Inputtag
                  text="SKU"
                  type="text"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}
                >
                  <TbZoomCheck />
                </Inputtag>
                <Inputtag
                  text="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  <MdProductionQuantityLimits />
                </Inputtag>
              </InputContent>
              <Inputtag
                text="Name"
                type="text"
                value={proname}
                onChange={(e) => {
                  setProname(e.target.value);
                }}
              >
                <TbUser />
              </Inputtag>
              <InputContent>
                <Button text="Submit" onClick={handleSubmit} />
                <Button text="Cancel" onClick={() => setIsOpen(false)} />
              </InputContent>
            </WrapperInput>
          </Modal>
          <TableContainer sx={{ height: "500px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        backgroundColor: "rgba(235, 240, 240, 0.5)",
                        zIndex: "0",
                      }}
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>{row.sku}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <ImgSize url={row.image} />
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
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
      )}
    </>
  );
};
const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
  background: white;
  border-radius: 4px;
  max-width: 400px;
`;
const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;
const Upload = styled.input`
  color: transparent;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: "your product image";
    color: #6941c6;
    display: inline-block;
    padding: 10px 22px;
    outline: none;
    margin: auto;
    width: fit-content;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;
    font-weight: 600;
    background: #ffffff;
    border: 1px dashed #eaecf0;
    border-radius: 8px;
    outline: none;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  :focus {
    outline: none !important;
  }
  :active::before {
    transform: scale(0.9) translate(0px, 2px);
    box-shadow: inset 4px 4px 5px 0px rgba(0, 0, 0, 0.2);
  }
`;

const Imageupload = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

export default CatalogueTable;
