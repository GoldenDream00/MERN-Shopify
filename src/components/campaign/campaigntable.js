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
import ReactCountryFlag from "react-country-flag";
import NoPage from "../../views/public/404page";
import nodata from "../../assets/images/nodata.webp";
import styled from "styled-components";
import Button from "../button";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import Inputtag from "../input";
import { MultiSelect } from "react-multi-select-component";
import ImgSize from "../imgsize";
import loading from "../../assets/images/loading1.gif";
import { MdOutlineCampaign } from "react-icons/md";
import { WithContext as ReactTags } from "react-tag-input";
import "../../assets/css/campaign.css";
import { Autocomplete, Checkbox, Modal, TextField } from "@mui/material";
import { PUBLIC_CAMPAIGNS } from "../../configs/router-config";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import StarRatings from "react-star-ratings";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "gift",
    label: "Gift",
  },
  {
    id: "taskoflist",
    label: "Task list",
  },
  {
    id: "country",
    label: "Country",
  },
  {
    id: "url",
    label: "Campaign Url",
  },
  {
    id: "option",
    label: "Option",
  },
];

const modalcolumns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "followers",
    label: "Followers",
  },
  {
    id: "rating",
    label: "Rating",
  },
];

const ratingNumber = [
  { label: '5'},
  { label: '4'},
  { label: '3'},
  { label: '2'},
  { label: '1'},
  { label: '0'},
];

function TableName() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(90deg, #b224ef 0%, #7579ff 100%)",
        }}
      >
        <Toolbar>
          <Typography sx={{ flex: "1 1" }} variant="h5">
            Campaign
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function CampaignTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [campaign, setCampaign] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [campaignname, setCampaignname] = useState("");
  const [gift, setGift] = useState([]);
  const [taskoflist, setTaskoflist] = useState([]);
  const [country, setCountry] = useState([]);
  const { user } = useContext(AuthContext);
  const [productadd, setProductadd] = useState([]);
  const [giftlist, setGiftlist] = useState([]);
  const [infludata, setInfluData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [campaignid, setCampaignid] = useState("");
  const userId = user.user._id;
  const userLogo = user.user.logoimage;
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleDelete = (i) => {
    setTaskoflist(taskoflist.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTaskoflist([...taskoflist, tag]);
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const Initfunc = () => {
    setCampaignname("");
    setGift([]);
    setTaskoflist([]);
    setCountry([]);
    setIsOpen(false);
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = taskoflist.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTaskoflist(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const allcampaign = async () => {
    try {
      const userid = { userid: userId };
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/campaign/allproduct",
        userid
      );
      setCampaign(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const allproduct = async () => {
    try {
      setIsLoading(true);
      const userid = { userid: userId };
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/catalogue/allproduct",
        userid
      );
      if (res.data.length === 0) {
        return toast("Create Products");
      } else {
        setProducts(res.data);
        const dropDownValue = res.data.map((response) => ({
          value: response.sku,
          label: (
            <Wrapp2>
              <span>{response.sku}</span>
              <img
                src={response.image}
                alt=""
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Wrapp2>
          ),
          name: response.name,
          image: response.image,
          variantid: response.variantid,
        }));
        setGiftlist(dropDownValue);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCampaign = {
      campaignname: campaignname,
      gift: gift,
      taskoflist: taskoflist,
      country: country,
      userid: userId,
      url:
        "https://gifterly.herokuapp.com" +
        PUBLIC_CAMPAIGNS +
        "+=" +
        campaignname,
      logoimage: userLogo,
    };
    try {
      await axios
        .post(
          process.env.REACT_APP_API + "/api/campaign/addproduct",
          newCampaign
        )
        .then((res) => setProductadd(res.data));
      toast("Campaign added");
      setCampaignname("");
      setGift([]);
      setTaskoflist([]);
      setCountry([]);
      setIsOpen(false);
    } catch (err) {
      toast(err.response.data);
    }
  };

  const Editproduct = async (row) => {
    setCampaignname(row.name);
    setGift(row.gifts);
    setTaskoflist(row.taskoflist);
    setCountry(row.country);
    setCampaignid(row._id);
    setIsOpen2(true);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const newcampaign = {
      campaignname: campaignname,
      gift: gift,
      taskoflist: taskoflist,
      country: country,
      _id: campaignid,
      url:
        "https://gifterly.herokuapp.com" +
        PUBLIC_CAMPAIGNS +
        "/" +
        campaignname,
    };

    try {
      const CampaignName = { name: campaignname };
      await axios
        .post(
          process.env.REACT_APP_API + "/api/campaign/incampaign",
          CampaignName
        )
        .then(async (res) => {
          if (res.data.length !== 0) {
            if (res.data[0]._id !== campaignid) {
              return toast("Campaign name already exist");
            } else {
              await axios
                .post(
                  process.env.REACT_APP_API + "/api/campaign/updatecampaign",
                  newcampaign
                )
                .then()
                .catch((err) => console.log(err));
              toast("Campaign change");
              setdeleted(!deleted);
              setIsOpen2(false);
            }
          } else {
            await axios
              .post(
                process.env.REACT_APP_API + "/api/campaign/updatecampaign",
                newcampaign
              )
              .then()
              .catch((err) => console.log(err));
            toast("Campaign change");
            setdeleted(!deleted);
            setIsOpen2(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const Deleteproduct = async (product_id) => {
    const productid = { _id: product_id };
    try {
      await axios.post(
        process.env.REACT_APP_API + "/api/campaign/deletecampaign",
        productid
      );
    } catch (err) {
      console.log(err);
    }
    setdeleted(!deleted);
  };

const handleSubmit3 = async (influInfo) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API + "/api/mail/sendinvite",
        infludata
      );
      toast(res);
      setIsOpen3(false);
    } catch (err) {
      console.log(err);
    }
  };

  const InviteInflu = async (userinfo) => {
    try {
      setIsOpen3(true);

      const res = await axios.post(
        process.env.REACT_APP_API + "/api/users/alluser"
      );

      setInfluData(res.data.filter((item) =>  item.isBrand === false));
    } catch (err) {
      console.log(err);
    }
  };

  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const changeRatingNumber = async () => {
    try {
      const result = await axios
        .post(
          process.env.REACT_APP_API + "/api/campaign/searchRate",
          value
        )

        setInfluData(result.data.filter((item) =>  item.isBrand === false));

    } catch (err) {
      console.log(err)
    }
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      allproduct();
      allcampaign();
    }, 1000);
  }, []);

  useEffect(() => {
    allcampaign();
    changeRatingNumber();
  }, [productadd, deleted, value]);

  return (
    <>
      {!isLoading ? (
        <Wrapp>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapp>
      ) : products.length > 0 ? (
        <Wrapper>
          <Modal
            open={modalIsOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <InputContent>
                <Inputtag
                  text="Campaign name"
                  type="text"
                  value={campaignname}
                  onChange={(e) => {
                    setCampaignname(e.target.value);
                  }}
                >
                  <MdOutlineCampaign />
                </Inputtag>
              </InputContent>
              <TextContent>
                <Inputtext>
                  Please select the countries you can send gifts to.
                </Inputtext>
                <MultiSelect
                  options={countrylist}
                  value={country}
                  onChange={setCountry}
                  labelledBy="Select"
                  className="multiselect"
                />
              </TextContent>
              <TextContent>
                <Inputtext>
                  Please select gifts that are available for this campaign.{" "}
                </Inputtext>
                <MultiSelect
                  options={giftlist}
                  value={gift}
                  onChange={setGift}
                  labelledBy="Select"
                  className="multiselect"
                  valueRenderer={(selected, _options) => {
                    return selected.length
                      ? selected.map(({ label }) => <>{label}</>)
                      : "No Items Selected";
                  }}
                />
              </TextContent>
              <TextContent>
                <Inputtext>
                  Please make a list of tasks that you want the influencers to
                  perform. Separate each task by a comma. For example 'Make an
                  Instagram post on your account wearing the clothing and tag
                  @wulf.fit and #wulf and #bodybuilding, Make an Instagram reel
                  wearing the clothing and tag @wulf.fit
                </Inputtext>
                <ReactTags
                  tags={taskoflist}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="bottom"
                  placeholder="Please enter your plan list"
                  autocomplete
                />
              </TextContent>
              <InputContent>
                <Button text="Submit" onClick={handleSubmit} />
                <Button text="Cancel" onClick={Initfunc} />
              </InputContent>
            </WrapperInput>
          </Modal>
          <Modal
            open={modalIsOpen2}
            onClose={() => setIsOpen2(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <InputContent>
                <Inputtag
                  text="Campaign name"
                  type="text"
                  value={campaignname}
                  onChange={(e) => {
                    setCampaignname(e.target.value);
                  }}
                >
                  <MdOutlineCampaign />
                </Inputtag>
              </InputContent>
              <TextContent>
                <Inputtext>
                  Please select the countries you can send gifts to.
                </Inputtext>
                <MultiSelect
                  options={countrylist}
                  value={country}
                  onChange={setCountry}
                  labelledBy="Select"
                  className="multiselect"
                />
              </TextContent>
              <TextContent>
                <Inputtext>
                  Please select gifts that are available for this campaign.{" "}
                </Inputtext>
                <MultiSelect
                  options={giftlist}
                  value={gift}
                  onChange={setGift}
                  labelledBy="Select"
                  className="multiselect"
                  valueRenderer={(selected, _options) => {
                    return selected.length
                      ? selected.map(({ value, image }) => (
                          <Wrapp2>
                            <span>{value}</span>
                            <img
                              src={image}
                              alt=""
                              style={{
                                width: "30px",
                                height: "30px",
                              }}
                            />
                          </Wrapp2>
                        ))
                      : "No Items Selected";
                  }}
                />
              </TextContent>
              <TextContent>
                <Inputtext>
                  Please make a list of tasks that you want the influencers to
                  perform.
                </Inputtext>
                <ReactTags
                  tags={taskoflist}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="bottom"
                  placeholder="Please input your plan list"
                  autocomplete
                />
              </TextContent>
              <InputContent>
                <Button text="Submit" onClick={handleSubmit2} />
                <Button text="Cancel" onClick={() => setIsOpen2(false)} />
              </InputContent>
            </WrapperInput>
          </Modal>
          <Modal
            open={modalIsOpen3}
            onClose={() => setIsOpen3(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInvite>
              <ModalTitleWrapper>
                <TitleWrapper>
                  Invite Influencer
                </TitleWrapper>
                <SubTitleWrapper>
                  Please select the influencers you would like to invite
                </SubTitleWrapper>
              </ModalTitleWrapper>
              <ModalTitleWrapper>
                <SubTitleWrapper>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={ratingNumber}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Rating Number" />}
                  />
                </SubTitleWrapper>
              </ModalTitleWrapper>
              <TableContainer sx={{ height: "400px"}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          // indeterminate={numSelected > 0 && numSelected < rowCount}
                          // checked={rowCount > 0 && numSelected === rowCount}
                          // onChange={onSelectAllClick}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                      </TableCell>
                      {modalcolumns.map((column, i) => (
                        <TableCell
                          sx={{
                            background: "rgba(235, 240, 240, 0.5)",
                            zIndex: "0",
                          }}
                          key={i}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ color: "black" }}>
                    {infludata.length > 0 &&
                      infludata
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, i) => {
                          const isItemSelected = isSelected(row.influencername);
                          const labelId = `enhanced-table-checkbox-${i}`;
                          return (
                            <TableRow
                             hover 
                             role="checkbox" 
                             tabIndex={-1} 
                             selected={isItemSelected} 
                             onClick={(event) => handleClick(event, row.influencername)}     
                             aria-checked={isItemSelected}     
                             key={row.influencername}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                {row.influencername}
                              </TableCell>
                              <TableCell>
                                <ImgSize url={row.influencerimage} />
                              </TableCell>
                              <TableCell>{row.follower}</TableCell>
                              <TableCell>
                                <StarRatings
                                  rating={row.rates}
                                  starRatedColor="rgb(255,230,0)"
                                  starHoverColor="rgb(255,230,0)"
                                  numberOfStars={5}
                                  starDimension="25px"
                                  starSpacing="1px"
                                  name="rating"
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={
                  campaign.length % rowsPerPage === 0
                    ? Math.floor(campaign.length / rowsPerPage)
                    : Math.floor(campaign.length / rowsPerPage) + 1
                }
                page={page + 1}
                color="secondary"
                onChange={handleChangePage}
              />
              <InputContent>
                <Button text="Submit" onClick={() => handleSubmit3(infludata)} />
                <Button text="Cancel" onClick={() => setIsOpen3(false)} />
              </InputContent>
            </WrapperInvite>
          </Modal>
          <WrapperButton>
            <Button
              text="+ Create"
              onClick={() => {
                setIsOpen(true);
                setCampaignname("");
                setGift([]);
                setTaskoflist([]);
                setCountry([]);
              }}
            />
          </WrapperButton>
          <Paper
            sx={{
              display: "flex",
              width: "100%",
              overflow: "hidden",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TableName />
            <TableContainer sx={{ height: "600px"}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, i) => (
                      <TableCell
                        sx={{
                          background: "rgba(235, 240, 240, 0.5)",
                          zIndex: "0",
                        }}
                        key={i}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaign
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            {row.gifts.map((item, i) => (
                              <ImgSize url={item.image} key={i} />
                            ))}
                          </TableCell>
                          <TableCell>
                            {row.taskoflist.map((item, i) => (
                              <div key={i}>
                                {i + 1} : <span>{item.text}</span>
                              </div>
                            ))}
                          </TableCell>
                          <TableCell>
                            {row.country.map((item, key) => (
                              <ReactCountryFlag
                                countryCode={item.value}
                                svg
                                style={{
                                  width: "3em",
                                  height: "3em",
                                  padding: "5px",
                                }}
                                title={item.value}
                                key={key}
                              />
                            ))}
                          </TableCell>
                          <TableCell
                            sx={{ maxWidth: "50px", wordWrap: "break-word" }}
                          >
                            {row.url}
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                              }}
                            >
                              <FaRegEdit style={{cursor: "pointer"}} onClick={() => Editproduct(row)} />
                              <FaRegTrashAlt
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                  Deleteproduct(row._id);
                                }}
                              />
                              <PersonAddIcon 
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                  InviteInflu(row);
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={
                campaign.length % rowsPerPage === 0
                  ? Math.floor(campaign.length / rowsPerPage)
                  : Math.floor(campaign.length / rowsPerPage) + 1
              }
              page={page + 1}
              color="secondary"
              onChange={handleChangePage}
            />
          </Paper>
        </Wrapper>
      ) : (
        <Wrapper2>
          <NoPage src={nodata} />
          <Inputtext2>
            Please go to Catalogue tab and add some products before creating
            your first campaign
          </Inputtext2>
        </Wrapper2>
      )}
    </>
  );
}

const countrylist = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Italy", value: "IT" },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
const ModalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  font-size: 30px;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  font-size: 15px;
`;
const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
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

const WrapperInvite = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 4px;
  padding: 40px;
`;

const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;
const Wrapp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Inputtext = styled.div`
  font-size: 14px;
`;
const Inputtext2 = styled.div`
  font-size: 20px;
  color: #0245af;
  text-align: center;
  font-weight: 600;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 7px;
  width: 100%;
`;
const Wrapp2 = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 2px;
`;
