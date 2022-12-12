import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import {
  PUBLIC_ACCOUNT,
  PUBLIC_CAMPAIGN,
  PUBLIC_INFLUENCER,
  PUBLIC_MESSAGE,
  PUBLIC_CAMPAIGNS,
} from "../../configs/router-config";
import InstaConnect from "./sign/connectinsta";
import Message from "./message/home";
import Campaign from "./campaign/campaign";
import Account from "./account/account";
import NoPage from "./404page";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../../components/button";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import Nopagepng from "../../assets/images/404.jpg";
import { Modal } from "@mui/material";
import AccountDetail from "../../components/account/accountdetail";

function CampaignDetail(location) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  let { campaignname } = useParams();
  const [giftlist, setGiftlist] = useState([]);
  const [name, setName] = useState("");
  const [campaignid, setCampaignid] = useState("");
  const [taskoflist, setTaskoflist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [logo, setLogo] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);
  const userId = user.user._id;
  const userCountry = user.user.country;

  const handleClick = async (item) => {
    setIsLoading(true);
    try {
      const inCampaign = {
        gift: item,
        taskoflist: taskoflist,
        name: name,
        status: "Pending Postage",
        userid: userId,
        campaignid: campaignid,
        logoimage: logo,
        email: user.user.email,
        phone: user.user.phone,
        deliveryfirstname: user.user.deliveryfirstname,
        deliverylastname: user.user.deliverylastname,
        deliveryaddress: user.user.deliveryaddress,
        followers: user.user.followers,
        photo: user.user.photo,
        instauser: user.user.instauser,
        reportuser: user.user.reportuser,
      };
      await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/addincampaign",
        inCampaign
      );
      history.push(PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN);
      toast(
        "Your selection has been sent to the brand. You will receive tracking information soon."
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const allcampaign = async () => {
    try {
      const CampaignName = { name: campaignname };
      console.log(CampaignName);
      await axios
        .post(
          process.env.REACT_APP_API + "/api/campaign/incampaign",
          CampaignName
        )
        .then((res) => {
          const data = res.data;
          data.map((items) => {
            setGiftlist(items.gifts);
            setName(items.name);
            setTaskoflist(items.taskoflist);
            setCampaignid(items.userid);
            setLogo(items.logoimage);
            items.country.map((item) => {
              if (item.value === userCountry) {
                setFlag(true);
              }
            });
          });
        });
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    const allincampaign = async () => {
      try {
        const userid = { userid: userId };
        await axios
          .post(
            process.env.REACT_APP_API + "/api/incampaign/allincampaign",
            userid
          )
          .then((res) => {
            if (res.data.length === 0) {
              allcampaign();
            } else {
              res.data.map((item) => {
                if (campaignname !== item.name) {
                  allcampaign();
                } else {
                  toast("Already selected");
                  history.push("/");
                }
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    };

    allincampaign();
  }, []);
  return (
    <>
      {!flag ? (
        <>
          Sorry, this campaign is not currently open to people in {userCountry}
        </>
      ) : user.user.deliveryaddress !== "" ? (
        <Wrapper>
          <Contenttext>{name}</Contenttext>
          <GiftlistContent>
            {giftlist.map((item, key) => (
              <Giftlist key={key}>
                <img src={item.image} alt="" />
                <Contenttext2>SKU : {item.value}</Contenttext2>
                <>{item.name}</>
                {!isLoading ? (
                  <Button text="select" onClick={() => handleClick(item)} />
                ) : (
                  <Button text="select" />
                )}
              </Giftlist>
            ))}
          </GiftlistContent>
        </Wrapper>
      ) : (
        <>
          <Modal
            open={modalIsOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <AccountDetail />
            </WrapperInput>
          </Modal>
        </>
      )}
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  overflow: auto;
  height: 100%;
`;
const Contenttext = styled.div`
  font-size: 40px;
  font-weight: 800;
`;
const Contenttext2 = styled.div`
  font-size: 24px;
  font-weight: 300;
`;
const GiftlistContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;
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
const Giftlist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  img {
    width: 200px;
    height: 100px;
  }
`;

export default function PublicViewsInfluencer() {
  let location = useLocation();
  const { user } = useContext(AuthContext);
  return (
    <>
      {user.user.instauser !== "" ? (
    <Switch location={location}>
      <Route exact path="/">
        <Redirect to={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN} />
      </Route>
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_CAMPAIGN}
        component={Campaign}
      />
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_ACCOUNT}
        component={() => <Account />}
      />
      <Route
        exact
        path={PUBLIC_INFLUENCER + PUBLIC_MESSAGE}
        component={Message}
      />
      <Route
        exact
        path={PUBLIC_CAMPAIGNS + "+=:campaignname"}
        children={<CampaignDetail location={location} />}
      />
      <Route path="/*" component={() => <NoPage src={Nopagepng} />} />
    </Switch>
      ) : (
        <>
          <InstaConnect location={location} />
        </>
      )}
    </>
  );
}
