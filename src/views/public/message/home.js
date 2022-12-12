import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../assets/css/HomeCSS/Home.css";
import "../../../assets/css/HomeCSS/Sidebar.css";
import "../../../assets/css/HomeCSS/ChatRoom.css";
import Message from "../../../components/messages/Message.js";
import AddAmigo from "../../../components/messages/AddAmigo.js";
import ProfilePage from "../../../components/messages/ProfilePage";
import SidebarChat from "../../../components/messages/SidebarChat.js";
import EmptyChatRoom from "../../../components/messages/EmptyChatRoom";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Picker } from "emoji-mart";
import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "emoji-mart/css/emoji-mart.css";
import noavatar from "../../../assets/images/noavatar.jpg";

function Home() {
  const [chatroomtiles, setChatroomtiles] = useState([]);
  const [currentchat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [amigo, setAmigo] = useState();
  const [open, setOpen] = useState(false);
  const { user, count ,setCount } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const msgBoxRef = useRef(null);
  const socket = useRef();
  const userId = user.user._id;

  /* Making Messages Realtime */
  const API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    socket.current = io(API_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [API_URL]);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId, chatroomtiles, currentchat, socket]);

  useEffect(() => {
    const getChatroomtiles = async () => {
      try {
        const res = await axios.get(API_URL + "/api/chatrooms/" + userId);
        setChatroomtiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatroomtiles();
  }, [userId, API_URL]);

  /* Fetching the Chat Tile user details */

  useEffect(() => {
    const amigoId = currentchat?.members.find((m) => m !== userId);
    const getAmigodetails = async () => {
      try {
        const response = await axios.get(API_URL + "/api/users/" + amigoId);
        setAmigo(response.data);
      } catch (err) {}
    };
    getAmigodetails();
  }, [userId, currentchat, API_URL]);
  /* Fetching ChatRoom Messages */

  /* Scroll to the recent message */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  /* Emoji Picker */

  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage(newMessage + emoji);
  };
  const [pick, setPick] = useState(false);
  const openPicker = () => {
    setPick(!pick);
  };

  /* Posting a Message */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendingMessage = {
      chatroomId: currentchat._id,
      senderId: userId,
      text: newMessage,
    };

    const receiverId = currentchat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios.post(
        API_URL + "/api/messages/",
        sendingMessage
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    setPick(false);
  };

  /* AddChat Toggle Setup */

  const [addtoggle, setAddtoggle] = useState(false);
  const addchatToggler = () => {
    addtoggle === false ? setAddtoggle(true) : setAddtoggle(false);
  };

  /* Profile Page Toggle Setup */

  const [profiletoggle, setProfiletoggle] = useState(false);
  const profiletoggler = () => {
    profiletoggle === false ? setProfiletoggle(true) : setProfiletoggle(false);
  };

  const ChatroomContent = () => {
    const [counter ,setCounter] = useState(0);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/messages/" + currentchat?._id
        );
        response.data.map((item)=>{
          if(item.read == false){
        setCounter(counter+1)         
        console.log("111")
      }
        })
      } catch (err) {
        console.log(err);
      }
    };
   getMessages(); 
  }, [currentchat, API_URL]);
    const alerthandle = async()=>{
      await axios.post(
          API_URL + "/api/messages/read",
          {
            senderId: userId,
          },
        );
        setCount(count-counter);
  }
    const msgScrollTrigger = async(e) => {
    const currentPosition = msgBoxRef.current.scrollHeight - (msgBoxRef.current.scrollTop + msgBoxRef.current.offsetHeight);

    if(currentPosition === 0) {
       alerthandle();
    }
    console.log("COUNT STATE: ", count);
  }

    return     <div className="chatroom">
          {currentchat ? (
            <>
              <div className="chatroom-header">
                <div className="chatroom-chatinfo">
                  <img
                    className="amigo-profilepic"
                    src={amigo?.photo ? amigo?.photo : noavatar}
                    alt=""
                  />

                  <div className="chatroom-chatinfo-right">
                    <div className="chatroom-chatinfo-name">
                      <p>{amigo?.username}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="chatroom-messages-container"
                ref={msgBoxRef}
                onClick={() => {
                  setPick(false);
                }}
                onScroll={() => msgScrollTrigger()}
              >

                {
                  messages.map((message, key) => (
                    <div key={key}  ref={scrollRef}>
                      <Message
                        message={message}
                        own={message?.senderId === userId}
                        key={key}
                      />
                    </div>
                  ))
                }

              </div>
              <div
                className={pick ? "emoji-picker-open" : "emoji-picker-close"}
              >
                <Picker onSelect={addEmoji} emojiSize={25} />
              </div>
              <div className="chatroom-footer">
                <div className="chatroom-footer-lefticons">
                  <IconButton onClick={openPicker}>
                    <InsertEmoticonIcon />
                  </IconButton>
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                </div>
                <form>
                  <input
                    className="message-input"
                    type="text"
                    name="message-input"
                    placeholder="Type a message"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    onClick={alerthandle}
                    value={newMessage}
                    required
                  />
                  <button
                    className="input-button"
                    onClick={newMessage ? handleSubmit : null}
                  >
                    {" "}
                    Send a Message{" "}
                  </button>
                </form>
                <div
                  className="chatroom-footer-righticon"
                  onClick={newMessage ? handleSubmit : null}
                >
                  <IconButton>
                    <SendIcon className="send-icon" />
                  </IconButton>
                </div>
              </div>
            </>
          ) : (
            <EmptyChatRoom />
          )}
        </div>
  }


  return (
    <div className="home">
      {/* Chat Adding Card */}
      <AddAmigo
        addchattoggler={() => {
          addchatToggler();
        }}
        addchattoggle={addtoggle}
      />

      {/* Profile Page Card - Update */}
      <ProfilePage
        toggler={() => {
          profiletoggler();
        }}
        togglestate={profiletoggle}
      />

      {/* Sidebar Open Menu */}
      {open ? (
        ""
      ) : (
        <div
          className="menu-open"
          onClick={() => {
            setOpen(true);
          }}
        >
          <IconButton>
            <MenuIcon style={{ fontSize: 35, color: "#316af3" }} />
          </IconButton>
        </div>
      )}

      {/* Add Chat Icon */}
      <div className="add-chatroom-icon" onClick={addchatToggler}>
        <IconButton>
          <PersonAddIcon />
        </IconButton>
      </div>

      {/* Sidebar, ChatRoom */}
      <div className="home-components">
        {/* Sidebar */}
        <div className={open ? "sidebar active" : "sidebar"}>
          <div className="sidebar-search">
            <div className="sidebar-search-container">
              <SearchIcon className="sidebar-searchicon" />
              <input
                type="text"
                name="chat-search"
                placeholder="Search a Chat"
              />
            </div>
          </div>

          {/* Chatroom tiles */}
          <div className="sidebar-chatoptions">
            {chatroomtiles.map((chatroomtile) => (
              <div
                key={chatroomtile?._id}
                onClick={() => {
                  setCurrentchat(chatroomtile);
                  setOpen(false);
                }}
              >
                <SidebarChat
                  chatroomtile={chatroomtile}
                  currentUser={user.user}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chatroom */}
       <ChatroomContent />
      </div>
    </div>
  );
}

export default Home;
