import styled from "styled-components";
import React, { useContext, useState } from "react";
import { TbPhone } from "react-icons/tb";
import Button from "../button";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Inputtag from "../input";
import { toast } from "react-toastify";

const AccountDetail = () => {
  const { user, setUserData } = useContext(AuthContext);
  const [name, setName] = useState(user.user.username);
  const [phone, setPhone] = useState(user.user.phone);
  const [deliveryfirstname, setDeliveryfirstname] = useState(
    user.user.deliveryfirstname
  );
  const [deliverylastname, setDeliverylastname] = useState(
    user.user.deliverylastname
  );
  const [deliveryaddress, setDeliveryaddress] = useState("");
  const [deliverycity, setDeliverycity] = useState("");
  const [deliverystate, setDeliverystate] = useState("");
  const [deliveryzip, setDeliveryzip] = useState("");
  const [deliverycountry, setDeliverycountry] = useState("");
  const [delivery, setDelivery] = useState(user.user.deliveryaddress);
  const userId = user.user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setDelivery(
      deliveryaddress +
        "," +
        deliverycity +
        "," +
        deliverystate +
        "," +
        deliveryzip +
        "," +
        deliverycountry
    );
    const updated_data = new FormData();
    updated_data.append("username", name);
    updated_data.append("phone", phone);
    updated_data.append("deliveryfirstname", deliveryfirstname);
    updated_data.append("deliverylastname", deliverylastname);
    updated_data.append(
      "deliveryaddress",
      deliveryaddress +
        "," +
        deliverycity +
        "," +
        deliverystate +
        "," +
        deliveryzip +
        "," +
        deliverycountry
    );
    if ((user.user.isBrand = false)) {
      updated_data.append("isBrand", user.user.isBrand);
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    toast("success");
  };
  return (
    <Wrappercontentinput>
      <Inputwrapper1>
        <Inputtag
          text="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Full name"
        />
        <Inputtag
          text="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phonenumber"
        >
          <TbPhone />
        </Inputtag>
      </Inputwrapper1>
      <Inputwrapper1>
        <Inputtag
          placeholder="Oliva"
          text="Delivery First Name"
          value={deliveryfirstname}
          onChange={(e) => setDeliveryfirstname(e.target.value)}
        />
        <Inputtag
          placeholder="Lina"
          text="Delivery Last Name"
          value={deliverylastname}
          onChange={(e) => setDeliverylastname(e.target.value)}
        />
      </Inputwrapper1>
      <Inputwrapper1>
        <Inputtag
          placeholder="1 St Mary's St"
          name=""
          text="Delivery Address"
          value={deliveryaddress}
          onChange={(e) => setDeliveryaddress(e.target.value)}
        />
        <Inputtag
          placeholder="Whitchurch"
          text="Delivery City"
          value={deliverycity}
          onChange={(e) => setDeliverycity(e.target.value)}
        />
      </Inputwrapper1>
      <Inputwrapper1>
        <Inputtag
          placeholder="Shropshire"
          text="State/Province/Region"
          value={deliverystate}
          onChange={(e) => setDeliverystate(e.target.value)}
        />
        <Inputtag
          placeholder="SY13 1QU"
          text="Zip Code"
          value={deliveryzip}
          onChange={(e) => setDeliveryzip(e.target.value)}
        />
        <Inputtag
          placeholder="United Kingdom"
          text="Delivery Country"
          value={deliverycountry}
          onChange={(e) => setDeliverycountry(e.target.value)}
        />
      </Inputwrapper1>

      <Inputcontent3>
        <Button
          text="Save Changes"
          width="170px"
          radius="4px"
          onClick={handleSubmit}
        />
        <Button
          text="Cancel"
          color="#ffffff"
          fcolor="#000000"
          radius="4px"
          border="1px solid #B224EF"
          width="170px"
        />
      </Inputcontent3>
    </Wrappercontentinput>
  );
};

const Wrappercontentinput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  background-color: white;
`;

const Inputwrapper1 = styled.div`
  display: flex;
  gap: 10px;
`;

const Inputcontent3 = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export default AccountDetail;
