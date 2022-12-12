import styled from "styled-components";
import React, { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { TbPhone } from "react-icons/tb";
import Button from "../button";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Inputtag from "../input";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import ImgSize from "../imgsize";
import { Modal } from "@mui/material";
import SubscriptionTotal from "../payment";
import Logo from "../../assets/images/Logo.jpg";
import Background from "../../assets/images/Image.png";

const Brandaccount = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [fileurl, setFileurl] = useState(null);
  const { user, setUserData } = useContext(AuthContext);
  const [name, setName] = useState(user.user.username);
  const [phone, setPhone] = useState(user.user.phone);
  const [country, setCountry] = useState(user.user.country);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const subpackage = user.user.ispackage;
  const userId = user.user._id;
  const userLogo = user.user.logoimage;
  const handleChange = (file) => {
    setFile(file);
    setFileurl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const updated_data = new FormData();
    updated_data.append("username", name);
    updated_data.append("phone", phone);
    updated_data.append("country", country);

    if (file !== "") {
      updated_data.append("logoimage", file);
    }

    try {
      await axios.put(
        process.env.REACT_APP_API + "/api/users/" + userId,
        updated_data,
        config
      );
      const result = await axios.get(
        process.env.REACT_APP_API + "/api/users/" + userId
      );
      const token = localStorage.getItem("auth-token");
      setUserData({
        token,
        user: result.data,
      });
      setLoading(false);
      toast("success");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Wrapperimage />
      <Wrappercontentinput>
        <Inputwrapper1>
          <Inputtag
            text="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
          <Inputtag
            text="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
          >
            <TbPhone />
          </Inputtag>
        </Inputwrapper1>
        <Inputcontent2>
          <Inputlabel>Country</Inputlabel>
          <ReactFlagsSelect
            selected={country}
            onSelect={(code) => setCountry(code)}
          />
        </Inputcontent2>
        <Inputcontent2>
          <Inputlabel>
            Current Package :{subpackage === "" && "No Package"}
            {subpackage === "1" && "Basic Package"}
            {subpackage === "2" && "second package"}
            {subpackage === "3" && "third"}
          </Inputlabel>
          <Button
            text="Change Package or Payment Method"
            radius="4px"
            width="300px"
            onClick={() => setIsOpen(true)}
            padding="10px 20px"
          />
          <Modal
            open={modalIsOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <SubscriptionTotal ispackage={subpackage} />
            </>
          </Modal>
        </Inputcontent2>
        <Inputcontent2>
          <Inputlabel> Logo Upload</Inputlabel>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            children={
              <div className="Fileupload">
                <ImgSize
                  url={fileurl ? fileurl : userLogo ? userLogo : Logo}
                  width="80px"
                  alt=""
                  height="80px"
                />
                Click to upload or drag and drop (SVG, PNG, JPG or GIF)
              </div>
            }
          />
        </Inputcontent2>
        <Inputcontent3>
          <Button
            text="Cancel"
            color="#ffffff"
            fcolor="#000000"
            radius="4px"
            border="1px solid #B224EF;"
            width="170px"
          />
          {!loading ? (
            <Button
              text="Save Changes"
              width="170px"
              radius="4px"
              onClick={handleSubmit}
            />
          ) : (
            <Button
              text="Save Changes"
              width="170px"
              radius="4px"
              color="#757575"
              disable={true}
            />
          )}
        </Inputcontent3>
      </Wrappercontentinput>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  width: 100%;
  overflow: auto;
  height: 100%;
`;

const Inputwrapper1 = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Inputcontent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Inputcontent2 = styled(Inputcontent)`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`;
const Inputlabel = styled.div`
  font-size: 14px;
`;
const Wrapperimage = styled.div`
  background-image: url(${Background});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 150px;
  width: 100%;
`;

const Wrappercontentinput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  width: 70%;
`;
const Inputcontent3 = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;
export default Brandaccount;
