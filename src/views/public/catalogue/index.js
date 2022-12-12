import Button from "../../../components/button";
import styled from "styled-components";
import CatalogueTable from "../../../components/cataloguetable";
import { CSVLink } from "react-csv";
import * as React from "react";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Inputtag from "../../../components/input";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbUser, TbZoomCheck, TbLockAccess } from "react-icons/tb";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import avatar from "../../../assets/images/noproduct.png";
import csvdownload from "../../../assets/images/excel.png";
import csvdownload2 from "../../../assets/images/excel2.png";
import tempcsv from "../../../assets/files/gifterly-csv-template.csv";
import { Modal } from "@mui/material";
import ImgSize from "../../../components/imgsize";
import Papa from "papaparse";

const Catalogue = () => {
  const [transactionData, setTransactionData] = useState([]);
  const csvLink = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [proname, setProname] = useState("");
  const [storename, setStorename] = useState("");
  const [storename1, setStorename1] = useState("");
  const [access, setAccesstoken] = useState("");
  const [access1, setAccesstoken1] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user, setUserData } = useContext(AuthContext);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [clickshopify, setClickshopify] = useState(false);
  const [csvproduct, setCsvproduct] = useState([]);
  const [fileurl, setFileurl] = useState(null);
  const userId = user.user._id;
  const userStore = user.user.storename;
  const logoimage = user.user.logoimage;
  const history = useHistory();
  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setFileurl(URL.createObjectURL(e.target.files[0]));
  };
  const getTransactionData = async () => {
    setIsOpen2(true);
    const userid = { userid: userId };
    await axios
      .post(process.env.REACT_APP_API + "/api/catalogue/allproduct", userid)
      .then((res) => {
        const result = res.data;
        const temp = [];
        result.map((item) => {
          temp.push({
            sku: item.sku,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
          });
        });
        setTransactionData(temp);
      })
      .catch((e) => console.log(e));
  };

  const productdownload = () => {
    if (transactionData.length === 0) {
      toast("no product");
    } else {
      csvLink.current.link.click();
    }
    setIsOpen2(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image === "") {
      return toast("Please Select Product Image");
    }

    if (sku === "") {
      return toast("Please Enter Your SKU");
    }

    if (proname === "") {
      return toast("Please Enter Your Product Name");
    }

    if (quantity === "") {
      return toast("Please Enter Your SKU");
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const newproduct = new FormData();
    newproduct.append("sku", sku);
    newproduct.append("name", proname);
    newproduct.append("quantity", quantity);
    newproduct.append("userid", userId);
    if (image !== "") {
      newproduct.append("image", image);
    }
    try {
      await axios.post(
        process.env.REACT_APP_API + "/api/catalogue/addproduct",
        newproduct,
        config
      );
      setImage("");
      setProname("");
      setSku("");
      setQuantity("");
      toast("product added");
      setFileurl(null);
      setIsOpen(false);
    } catch (err) {
      toast(err.response.data);
    }
    setClickshopify(!clickshopify);
  };

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvproduct(results.data);
        console.log(results.data);
      },
    });
  };

  const getShopifyData = async () => {
    try {
      if (userStore !== "") {
        await axios
          .post(process.env.REACT_APP_API + "/api/catalogue/addshopify", {
            userid: userId,
            storename: userStore,
            access: user.user.accesstoken,
          })
          .then((res) => console.log(res));
        setClickshopify(!clickshopify);
        setIsOpen3(false);
      } else {
        if (storename === "") {
          return toast("please enter your Shopify Store");
        }
        if (access === "") {
          return toast("please enter your Shopify Store AccessToken");
        }
        await axios
          .post(process.env.REACT_APP_API + "/api/catalogue/addshopify", {
            userid: userId,
            storename: storename,
            access: access,
          })
          .then(async (res) => {
            await axios.put(
              process.env.REACT_APP_API + "/api/users/" + userId,
              {
                userid: userId,
                storename: storename,
                access: access,
              }
            );
            const result = await axios.get(
              process.env.REACT_APP_API + "/api/users/" + user.user?._id
            );
            const token = localStorage.getItem("auth-token");
            setUserData({
              token,
              user: result.data,
            });
            window.location.reload();
          })
          .catch((err) => toast(err.response.data));
      }
    } catch (err) {
      toast(err.response.data);
    }
  };
  
  const getMagentoData = async () => {
    try {
      await axios.post(process.env.REACT_APP_API + "/api/catalogue/addmagento", {
        storename: storename1,
        access: access1,
        userid: userId
      })
      .then((res) => console.log(res));
      setClickshopify(!clickshopify);
      console.log("clickShopify:", clickshopify);
      setIsOpen4(false);
      window.location.reload();
    } catch (err) {
      toast(err.response.data);
    }
  };

  const getcsvfile = async () => {
    if (csvproduct.length !== 0) {
      try {
        const data = { userid: userId, csvproduct: csvproduct };
        await axios
          .post(process.env.REACT_APP_API + "/api/catalogue/addcsvfile", {
            data,
          })
          .then((res) => console.log(res));
      } catch (err) {
        toast(err.response.data);
      }
      setIsOpen2(false);
      setClickshopify(!clickshopify);
    } else {
      toast("Please Select CSV File Or Selected File already Empty");
    }
  };
  const checkShopify = () => {
    if (userStore !== "") {
      getShopifyData();
    } else {
      setIsOpen3(true);
    }
  };
  const checkMagento = () => {
    if (userStore !== "") {
      getMagentoData();
    } else {
      setIsOpen4(true);
    }
  };
  return (
    <Wrapper>
      <WrapperButton>
        <Button
          text="+ Add Product"
          fcolor="black"
          color="white"
          border="1px solid #B224EF"
          onClick={() => {
            if (logoimage !== "") {
              setIsOpen(true);
            } else {
              toast("please upload your logo file");
              history.push("/brand/account");
            }
          }}
        />
      </WrapperButton>
      <CatalogueTable clickshopify={clickshopify} /> 
      <WrapperButton>
        <Button text="CSV" width="150px" onClick={getTransactionData} />
        <Button text="Shopify" width="150px" onClick={checkShopify} />
        <Button text="Magento" width="150px" onClick={checkMagento}></Button>
      </WrapperButton>

      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <Imageupload src={fileurl ? fileurl : avatar} alt="" />
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
              onChange={(e) => {
                setSku(e.target.value);
              }}
            >
              <TbZoomCheck />
            </Inputtag>
            <Inputtag
              text="Quantity"
              type="number"
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

      <Modal
        open={modalIsOpen2}
        onClose={() => setIsOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperModal>
          <InputContent3>
            <CSVLink
              data={transactionData}
              filename="gifterly-csv.csv"
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
            <WrapperInput2>
              <ImgSize
                width="300px"
                height="300px"
                url={csvdownload}
                radius="0px"
                onClick={productdownload}
              />
              <Button
                text="Download"
                fcolor="#56964c"
                color="white"
                fsize="16px"
                width="100%"
                border="1px solid rgb(0 0 0 / 12%)"
                radius="4px"
                onClick={productdownload}
              />
            </WrapperInput2>
            <WrapperInput2>
              <Upload2
                type="file"
                accept=".csv"
                name="image"
                onChange={changeHandler}
              />
              <Button
                text="Upload"
                fcolor="#45b058"
                color="white"
                fsize="16px"
                width="100%"
                border="1px solid rgb(0 0 0 / 12%)"
                radius="4px"
                onClick={getcsvfile}
              />
            </WrapperInput2>
          </InputContent3>
          <InputContent2 href={tempcsv} download="gifterly-csv-template">
            Click here to download an empty product template
          </InputContent2>
        </WrapperModal>
      </Modal>
      <Modal
        open={modalIsOpen3}
        onClose={() => setIsOpen3(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <Inputtag
            text="Shopify Store Name"
            type="text"
            onChange={(e) => {
              setStorename(e.target.value);
            }}
          >
            <TbUser />
          </Inputtag>
          <Inputtag
            text="AccessToken"
            type="text"
            onChange={(e) => {
              setAccesstoken(e.target.value);
            }}
          >
            <TbLockAccess />
          </Inputtag>
          <InputContent>
            <Button text="Submit" onClick={getShopifyData} />
            <Button text="Cancel" onClick={() => setIsOpen3(false)} />
          </InputContent>
        </WrapperInput>
      </Modal>

      <Modal
        open={modalIsOpen4}
        onClose={() => setIsOpen4(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <Inputtag
            text="Magento Store Name"
            type="text"
            onChange={(e) => {
              setStorename1(e.target.value);
            }}
          >
            <TbUser />
          </Inputtag>
          <Inputtag
            text="AccessToken"
            type="text"
            onChange={(e) => {
              setAccesstoken1(e.target.value);
            }}
          >
            <TbLockAccess />
          </Inputtag>
          <InputContent>
            <Button text="Submit" onClick={getMagentoData} />
            <Button text="Cancel" onClick={() => setIsOpen4(false)} />
          </InputContent>
        </WrapperInput>
      </Modal>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin: 20px;
  height: 100%;
`;
const WrapperModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
  border-radius: 4px;
  background: white;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
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
const WrapperInput2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const InputContent3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 0px;
`;
const InputContent2 = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px;
  color: #45b058;
  font-weight: 700;
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.12);
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
const Upload2 = styled.input`
  color: transparent;
  width: 300px;
  height: 300px;
  background-image: url(${csvdownload2});
  background-size: contain;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  ::before {
    color: #6941c6;
    outline: none;
    margin: auto;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;
    font-weight: 600;
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

export default Catalogue;
