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
import styled_com from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import ImgSize from "../imgsize";
import "../../assets/css/campaign.css";
import loading from "../../assets/images/loading1.gif";
import avatar from "../../assets/images/Logo.jpg";
import { CheckboxGroup, Checkbox } from "@createnl/grouped-checkboxes";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import { FcCheckmark } from "react-icons/fc";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Inputtag from "../input";
import Button from "../button";
import InputText from "../inputtext";

const columns = [
  {
    id: "name",
    label: "Campaign",
  },
  {
    id: "logoimage",
    label: "Logo",
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
    id: "information",
    label: "Infomation",
  },
  {
    id: "trakingnumber",
    label: "Tracking Number",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "option",
    label: "Option",
  },
  {
    id: "request",
    label: "Request",
  },
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
  const [onChange, setOnChange] = useState({});
  const [campaign, setCampaign] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userId = user.user._id;
  const [requestTitle, setRequestTitle] = useState("");
  const [requestComment, setRequestComment] = useState("");
  const [listId, setIdData] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handlechange = async (iduser) => {
    if (onChange.length === 0) {
      toast("Please Change Your Task List");
    } else {
      let count = 0;
      onChange.map((item) => {
        if (item.checked === true) {
          count = count + 1;
        }
      });
      let status = "";
      if (count === onChange.length) {
        status = "completion pending";
      }

      try {
        const users = { _id: iduser, taskoflist: onChange, status: status };
        const result = await axios.post(
          process.env.REACT_APP_API + "/api/incampaign/updatelist",
          users
        );
        toast(result.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const handleComment = async (e) => {
    e.preventDefault();
    let status = "";
    try {
      const newComment = {
        _id: listId._id,
        taskoflist: onChange,
        status: status,
        title: requestTitle,
        comment: requestComment,
      };

      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/requestcomment",
        newComment
      )
      toast("Success Request comment");
      setRequestTitle("");
      setRequestComment("");
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const allcampaign = async () => {
    try {
      const userid = { userid: userId };
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/allincampaign",
        userid
      );

      setCampaign(result.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  const Checktrack = async (row) => {
    if (row.orderid !== "") {
      const orderid = {
        orderid: row.orderid,
        _id: row._id,
        campaignid: row.campaignid,
      };
      await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/tracking",
        orderid
      );
    } else {
      allcampaign();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      allcampaign();
    }, 1000);
  }, [allcampaign]);

  useEffect(async () => {
    try {
      const userid = { userid: userId };
      const result = await axios.post(
        process.env.REACT_APP_API + "/api/incampaign/allincampaign",
        userid
      );
      result.data.map((item) => {
        item.taskoflist.map((items) => {
          if (items.checked !== true) {
            if (
              new Date(item.createdAt).getDate() + 30 <
              new Date().getDate()
            ) {
              toast("please submit the work.");
            }
          }
        });
      });
    } catch (err) {
      console.log(err, "err");
    }
  }, []);
  return (
    <>
      {isLoaded && (
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
          <TableContainer sx={{ height: "500px" }}>
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
                          <ImgSize
                            url={row.logoimage ? row.logoimage : avatar}
                            key={i}
                          />
                        </TableCell>
                        <TableCell>
                          <ImgSize url={row.gift[0].image} key={i} />
                        </TableCell>
                        <TableCell>
                          <ol style={{ textAlign: "left" }}>
                            <CheckboxGroup
                              onChange={setOnChange}
                              defaultChecked
                            >
                              {row.taskoflist.map((item, i) => (
                                <li key={i}>
                                  <label changecolor="red">
                                    <Checkbox
                                      text={item.text}
                                      checked={
                                        item.checked ? item.checked : false
                                      }
                                    />
                                    <span>{item.text}</span>
                                  </label>
                                </li>
                              ))}
                            </CheckboxGroup>
                          </ol>
                        </TableCell>
                        <TableCell>{row.information}</TableCell>
                        <TableCell>
                          {row.trakingnumber !== "" ? (
                            <DivContent>{row.trakingnumber}</DivContent>
                          ) : (
                            <>
                              <DivContent2 onClick={() => Checktrack(row)}>
                                show
                              </DivContent2>
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          <DivContent>{row.status}</DivContent>
                        </TableCell>
                        <TableCell>
                          {row.status !== "completed" ? (
                            <DivContent2 onClick={() => handlechange(row._id)}>
                              update
                            </DivContent2>
                          ) : (
                            <FcCheckmark fontSize="25px" />
                          )}
                        </TableCell>
                        <TableCell>
                          {row.status !== "completed" ? (
                            <DivContent2 onClick={() => {
                              setIsOpen(true);
                              setIdData(row);
                              setRequestTitle("");
                              setRequestComment("");
                            }}>
                              request
                            </DivContent2>
                          ) : (
                            <FcCheckmark fontSize="25px" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                      text="Request Title"
                      type="text"
                      value={requestTitle}
                      onChange={(e) => {
                        setRequestTitle(e.target.value);
                      }}
                    >
                    </Inputtag>
                  </InputContent>
                  <TextContent>
                    <InputText
                      text="Request Comment"
                      type="text"
                      value={requestComment}
                      onChange={(e) => {
                        setRequestComment(e.target.value);
                      }}
                    >
                    </InputText>
                  </TextContent>
                  <InputContent>
                    <Button text="Submit" onClick={handleComment} />
                    <Button text="Cancel" onClick={() => setIsOpen(false)} />
                  </InputContent>
                </WrapperInput>
              </Modal>
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
      )}
      {!isLoaded && (
        <Wrapp>
          <ImgSize url={loading} width="300px" height="300px" />
        </Wrapp>
      )}
    </>
  );
}
const Wrapp = styled_com.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivContent = styled_com.div`
  box-shadow: 2px 4px 8px rgba(117, 121, 255, 0.18);
  border-radius: 4px;
  background: linear-gradient(90deg, #b224ef 0%, #7579ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 700;
`;
const DivContent2 = styled_com.div`
  border-radius: 4px;
  background: linear-gradient(90deg, #b224ef 0%, #7579ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 700;
  border: 2px dashed #7b61ff;
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
const InputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const Inputtext = styled.div`
  font-size: 14px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 7px;
  width: 100%;
`;

