import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import loading from "../assets/images/loading1.gif";
import styled_com from "styled-components";
import { CheckboxGroup, Checkbox } from "@createnl/grouped-checkboxes";
import ImgSize from "./imgsize";
import Button from "./button";
import { MdOutlineAddTask } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { Box, Modal, TableSortLabel } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";
import Typography from "@mui/material/Typography";
// import SearchIcon from "../assets/images/search.png";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Inputtag from "./input";
import InputText from "./inputtext";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "follower",
    label: "Followers",
  },
  {
    id: "rates",
    label: "Rating",
  },
  {
    id: "campaignname",
    label: "Campaign name",
  },
  {
    id: "sku",
    label: "SKU",
  },
  {
    id: "selectproduct",
    label: "Product Selected",
  },
  {
    id: "taskoflist",
    label: "Task list",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "option",
    label: "Option",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const InfluencerTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useContext(AuthContext);
  const [onChange, setOnChange] = useState({});
  const [tracking, setTracking] = useState("");
  const [titledata, setRequestTitle] = useState("");
  const [commentdata, setRequestComment] = useState("");
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0.001);
  const [rowproducts, setRowproducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [feedbackdescription, setDescription] = useState("");
  const userId = user.user._id;
  const [searchInfl, setInfluencerList] = useState("");
  const [search, setSearchInfl] = useState([]);

  React.useEffect(() => {
    handleSearchSubmit();
  }, []);

  const handleSearchSubmit = async () => {
    const newSearch = {
      searchInfl: searchInfl,
    };
    try {
      const result = await axios
        .post(
          process.env.REACT_APP_API + "/api/incampaign/searchInfl",
          newSearch
        )
        .then((res) => {
          console.log(res.data);
          setProducts(res.data["result_search"]);
          setIsLoaded(true);
        });
        // console.log("HLHLHLLHL: ", result)
      // .then((res) => setSearchInfl(
      //   toast("Campaign added");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const markascomplete = async (data) => {
    const markid = data._id;
    const taskoflist = [];
    data.taskoflist.map((item) => {
      taskoflist.push({ text: item.text, checked: true, disabled: false });
    });
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/updatelist",
        {
          _id: markid,
          taskoflist: taskoflist,
          status: "completed",
        }
      );
      toast(result.data);
      setIsOpen3(false);
    } catch (err) {
      console.log(err);
    }
  };

  const toggole = (row) => {
    setRowproducts(row);
    setRequestTitle(row.title);
    setRequestComment(row.comment);
    setIsOpen(true);
    setIsOpen3(true);
  };

  const feedback = (data) => {
    setIsOpen3(false);
    setIsOpen2(true);
  };

  const description = async (row) => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/updaterating",
        {
          _id: row._id,
          rating: rating,
          description: feedbackdescription,
        }
      );
      await axios.put(process.env.REACT_APP_API + "/api/users/" + row.userid, {
        rates: rating,
      });
      toast(result.data);
      setIsOpen2(false);
    } catch (err) {
      console.log(err);
    }
  };

  const reportuser = async (row) => {
    try {
      const reportuser = row.reportuser + 1;
      await axios.put(process.env.REACT_APP_API + "/api/users/" + row.userid, {
        reportuser: reportuser,
      });
      toast("Report Success");
      setIsOpen3(false);
    } catch (err) {
      console.log(err);
    }
  };

  const viewdelivery = () => {
    setIsOpen(!modalIsOpen);
  };
  const viewComment = () => {
    try{
      setIsOpen4(true);
      setIsOpen3(false);
      // const result = await axios.get(process.env.REACT_APP_API + "/api/incampaign/getcomment")
      // {

      // }
    } catch (err){
      console.log(err);
    }
  };
  const addtracking = async (changeid) => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/changetracking",
        {
          userid: changeid,
          tracking: tracking,
        }
      );
      toast(result.data);
      setTracking("");
      setIsOpen3(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deletelist = async (id) => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/deletelist",
        { _id: id }
      );
      toast(result.data);
      setIsOpen3(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const changeRating = (e) => {
    setRating(e);
  };

  const changetracking = (e) => {
    setTracking(e.target.value);
  };
  const sendorder = async (shopifyproduct) => {
    const shopifyproducts = shopifyproduct;
    try {
      const shopifyproduct = {
        email: user.email,
        phone: user.phone,
        storename: user.storename,
        accesstoken: user.accesstoken,
        shopifyproduct: shopifyproducts,
      };
      await axios
        .post(
          process.env.REACT_APP_API + "/api/incampaign/shopifyorder",
          shopifyproduct
        )
        .then((res) => console.log("shopifyProduct:", res));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleSearchSubmit();
  //   }, 2000);
  // }, [handleSearchSubmit()]);

  return (
    <Wrapper>
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
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              style={{
                background: "linear-gradient(90deg, #b224ef 0%, #7579ff 100%)",
              }}
            >
              <Toolbar>
                <Typography sx={{ flex: "1 1" }} variant="h5">
                  Influencer
                </Typography>
                <Search>
                  <StyledInputBase
                    placeholder="Search…"
                    value={searchInfl}
                    inputProps={{ "aria-label": "search" }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter" || e.keyCode === 13) {
                        handleSearchSubmit();
                      }
                    }}
                    onChange={(e) => setInfluencerList(e.target.value)}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>
          <Modal
            open={modalIsOpen2}
            onClose={() => setIsOpen2(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <StarRatings
                rating={rating}
                starRatedColor="rgb(255,230,0)"
                changeRating={changeRating}
                starHoverColor="rgb(255,230,0)"
                numberOfStars={5}
                name="rating"
              />
              <InputDescription
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputContent>
                <Button
                  text="Submit"
                  onClick={() => description(rowproducts)}
                />
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
            <WrapperInput>
              <Textdiv onClick={() => deletelist(rowproducts._id)}>
                Reject Application
              </Textdiv>

              <Textdiv onClick={viewdelivery}>View delivery address</Textdiv>
              {!modalIsOpen && <>{rowproducts.deliveryaddress}</>}

              {rowproducts.length !== 0 &&
                (rowproducts.gift[0].variantid === "" ? (
                  <Wrapp>
                    <InputTrack
                      type="text"
                      placeholder="tracking number"
                      onChange={changetracking}
                    />
                    <MdOutlineAddTask
                      size="20px"
                      onClick={() => addtracking(rowproducts._id)}
                    />
                  </Wrapp>
                ) : (
                  <Button
                    text="Send Shopify"
                    fcolor="black"
                    color="white"
                    onClick={() => sendorder(rowproducts)}
                    border=" 1px solid #d2d4d7"
                    radius="4px"
                    width="100%"
                  />
                ))}

              <Textdiv onClick={() => reportuser(rowproducts)}>
                Report Influencer
              </Textdiv>

              <Textdiv onClick={() => markascomplete(rowproducts)}>
                Mark As Complete
              </Textdiv>
              
              <Textdiv onClick={() => viewComment()}>
                View Ruquest Comment
              </Textdiv>

              <Textdiv>Contact Influencer</Textdiv>

              {rowproducts.rates === 0 && (
                <Textdiv onClick={() => feedback(rowproducts)}>
                  Give Feedback
                </Textdiv>
              )}
            </WrapperInput>
          </Modal>
          <Modal
            open={modalIsOpen4}
            onClose={() => setIsOpen4(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <WrapperInput>
              <InputContent>
                <Inputtag
                  text="Request Title"
                  type="text"
                  value={titledata}
                >
                </Inputtag>
              </InputContent>
              <TextContent>
                <InputText
                  text="Request Comment"
                  type="text"
                  value={commentdata}
                >
                </InputText>
              </TextContent>
              <InputContent>
                <Button text="Cancel" onClick={() => setIsOpen4(false)} />
              </InputContent>
            </WrapperInput>
          </Modal>
          <TableContainer sx={{ height: "600px" }}>
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
                      <TableCell>{row.influencername}</TableCell>
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
                          starDimension="30px"
                          starSpacing="1px"
                          name="rating"
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.gift[0].value}</TableCell>
                      <TableCell>
                        <ImgSize url={row.gift[0].image} />
                      </TableCell>
                      <TableCell>
                        <ol style={{ textAlign: "left" }}>
                          <CheckboxGroup onChange={setOnChange}>
                            {row.taskoflist.map((item, i) => (
                              <li key={i}>
                                <label>
                                  <Checkbox
                                    text={item.text}
                                    checked={
                                      item.checked ? item.checked : false
                                    }
                                    disabled={true}
                                  />
                                  <span>{item.text}</span>
                                </label>
                              </li>
                            ))}
                          </CheckboxGroup>
                        </ol>
                      </TableCell>
                      <TableCell>
                        <div style={{ textTransform: "uppercase" }}>
                          {row.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <HiDotsHorizontal onClick={() => toggole(row)} />
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
      {!isLoaded && (
        <Wrapper>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapper>
      )}
    </Wrapper>
  );
};
const Wrapper = styled_com.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Textdiv = styled_com.div`
  border: 1px solid #d2d4d7;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  width: 100%;
`;
const WrapperInput = styled_com.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin: 10% 40%;
  padding: 50px;
  background-color: white;
`;
const Wrapp = styled_com.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  border: 1px solid #d2d4d7;
  border-radius: 4px;
  width: 100%;
`;

const InputDescription = styled_com.textarea`
  border: 1px solid #d2d4d7;
  padding: 10px;
  outline: none;
  width: 500px;
  height: 150px;
`;
const InputContent = styled_com.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const InputTrack = styled_com.input`
  border: 0px;
  outline: 0px;
  font-size: 16px;
  text-align: center;
`;

const TextContent = styled_com.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 7px;
  width: 100%;
`;

export default InfluencerTable;
