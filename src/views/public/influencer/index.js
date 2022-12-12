import Button from "../../../components/button";
import styled from "styled-components";
import InfluencerTable from "../../../components/influencer";
import InputTag from "../../../components/input";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Modal } from "@mui/material";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import ButtonGroup from "../../../components/radiogroup";
import SubscriptionTotal from "../../../components/payment";

const Inflencers = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState("");
  const [followers, setFollowers] = useState("");
  const [influencernum, setInfluencernum] = useState("");
  const [followurl, setFollowurl] = useState("");
  const [gender, setGender] = useState("Man");
  const [tags, setTags] = useState([]);
  const [tags2, setTags2] = useState([]);
  const [tags3, setTags3] = useState([]);
  const [country, setCountry] = useState([]);
  const subpackage = user.user.ispackage;

  const RadioOptions = [
    { name: "Man", value: "Man", default: true },
    { name: "Woman", value: "Woman" },
    { name: "Any", value: "Any" },
  ];

  const countrylist = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "Italy", value: "IT" },
  ];

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = setTags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };
  const handleAddition2 = (tag) => {
    setTags2([...tags2, tag]);
  };
  const handleDelete2 = (i) => {
    setTags2(tags2.filter((tag, index) => index !== i));
  };
  const handleDrag2 = (tag, currPos, newPos) => {
    const newTags = setTags2.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags2(newTags);
  };

  const handleAddition3 = (tag) => {
    setTags3([...tags3, tag]);
  };
  const handleDelete3 = (i) => {
    setTags3(tags2.filter((tag, index) => index !== i));
  };
  const handleDrag3 = (tag, currPos, newPos) => {
    const newTags = setTags3.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags3(newTags);
  };
  const handlechangegender = (e) => {
    setGender(e.target.id);
  };
  const handleCheckPackage = () => {
    if (subpackage === "") {
      toast(
        <div onClick={withpayment}>
          You don't have package Click here to choose your package if you wish
          to send
        </div>
      );
    } else {
      setIsOpen(true);
      setCountry([]);
      setTags([]);
      setTags2([]);
      setTags3([]);
      setFollowurl([]);
    }
  };

  const withpayment = () => {
    setIsOpen2(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subpackage === "1") {
        if (influencernum > 1000) {
          return toast(
            <div onClick={withpayment}>
              Your current package only allows outreach to 1000 influencers.
              Click here to upgrade your subscription if you wish to send to
              more
            </div>
          );
        }
      }
      if (subpackage === "2") {
        if (influencernum > 10000) {
          return toast(
            <div onClick={withpayment}>
              Your current package only allows outreach to 10000 influencers.
              Click here to upgrade your subscription if you wish to send to
              more
            </div>
          );
        }
      }
      if (subpackage === "3") {
        if (influencernum > 100000) {
          return toast(
            <div onClick={withpayment}>
              Your current package only allows outreach to 100000 influencers.
              Click here to upgrade your subscription if you wish to send to
              more
            </div>
          );
        }
      }
      const influencer = {
        userid: user.user._id,
        email: user.user.email,
        rating: rating,
        tags: tags,
        tags2: tags2,
        tags3: tags3,
        followers: followers,
        influencernum: influencernum,
        followurl: followurl,
        country: country,
        gender: gender,
      };
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/mail/send",
        influencer
      );
      toast(res.data);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <WrapperButton>
        <Button text="OutReach" onClick={handleCheckPackage} />
        <Button text="PackShip" />
      </WrapperButton>
      <InfluencerTable />
      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperInput>
          <GroupRow>
            <InputTag
              text="Please enter the number of Influencers you would like to reach out to"
              type="number"
              onChange={(e) => setInfluencernum(e.target.value)}
            />
            <InputTag
              text="What is the minimum number of followers an influencer must have? "
              type="number"
              onChange={(e) => setFollowers(e.target.value)}
            />
          </GroupRow>
          <GroupRow>
            <InputTag
              text="Campaign Url"
              type="text"
              onChange={(e) => setFollowurl(e.target.value)}
            />
            <Inputlabel>
              <>Which countries should your influencers be in?</>
              <MultiSelect
                options={countrylist}
                value={country}
                onChange={setCountry}
                labelledBy="Select"
                className="multiselect"
              />
            </Inputlabel>
          </GroupRow>
          <GroupRow>
            <InputTag
              text="What is the minimum engagement rate the influencer must have. We suggest around 1.1% to remove most fake accounts."
              type="text"
              onChange={(e) => setRating(e.target.value)}
            />
            <ButtonGroup
              onChange={handlechangegender}
              options={RadioOptions}
              name="man"
            />
          </GroupRow>
          <GroupRow>
            <Inputlabel>
              <>
                Please list up to 10 Instagram accounts that your target
                influencers might follow.
              </>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
              />
            </Inputlabel>
            <Inputlabel>
              <>
                Please list up to 10 Instagram tags that your target influencers
                might use in their posts.
              </>
              <ReactTags
                tags={tags2}
                delimiters={delimiters}
                handleDelete={handleDelete2}
                handleAddition={handleAddition2}
                handleDrag={handleDrag2}
                inputFieldPosition="bottom"
                autocomplete
              />
            </Inputlabel>
          </GroupRow>
          <Inputlabel>
            <>
              Please list up to 10 Instagram accounts that your target
              influencers might tag in their posts.
            </>
            <ReactTags
              tags={tags3}
              delimiters={delimiters}
              handleDelete={handleDelete3}
              handleAddition={handleAddition3}
              handleDrag={handleDrag3}
              inputFieldPosition="bottom"
              autocomplete
            />
          </Inputlabel>

          <WrapperButton>
            <Button text="Submit" onClick={handleSubmit} />
            <Button text="Cancel" onClick={() => setIsOpen(false)} />
          </WrapperButton>
        </WrapperInput>
      </Modal>
      <Modal
        open={modalIsOpen2}
        onClose={() => setIsOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <SubscriptionTotal ispackage={subpackage} />
        </>
      </Modal>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const GroupRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 4px;
  max-width: 600px;
`;
const Inputlabel = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
export default Inflencers;
