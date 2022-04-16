import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import format from "date-fns/format";
import MessageBlock from "./subcomponents/MessageBlock";
import UsersInRoom from "./subcomponents/UsersInRoom";

let socket;
const SOCKET_SERVER =
  process.env.REACT_APP_SOCKET_SERVER || "http://localhost:5000";

const Chat = () => {
  const location = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([""]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (inputText.trim().length > 0) {
      const time = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      socket.emit("message event", { name, text: inputText, time });

      setMessages((prevMessages) => [
        ...prevMessages,
        { name, text: inputText.trim(), time },
      ]);

      setInputText("");
    }
  }

  useEffect(() => {
    socket = io(SOCKET_SERVER);

    const parsed = queryString.parse(location.search);
    setName(parsed.name);
    setRoom(parsed.room);

    // console.log(parsed);

    socket.on("connect", () => {
      // emit join event
      socket.emit(
        "join",
        { name: parsed.name, room: parsed.room },
        (response) => {
          // console.log(response);

          if (response.error) {
            alert("name already taken!");
            window.location.href = "/";
          }

          const time = format(new Date(response.time), "yyyy-MM-dd HH:mm:ss");

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              name: response.name,
              text: response.text,
              time,
              annoucement: true,
            },
          ]);

          setUsersInRoom(response.usersInRoom);
        }
      );

      // listen to message broadcast events
      socket.on("message broadcast", (arg) => {
        const time = format(new Date(arg.time), "yyyy-MM-dd HH:mm:ss");

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            name: arg.name,
            text: arg.text,
            time,
            annoucement: arg.annoucement,
          },
        ]);
      });

      // listen to room data events
      socket.on("room data", (arg) => {
        setUsersInRoom(arg);
      });
    });

    // cleanup
    return () => {
      socket.on("disconnect");
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="room-header mt-sm-5 mt-2 pt-1 mx-auto d-flex justify-content-center">
        <img
          className="img-fluid strawberry-icon me-2"
          src="/images/strawberry.png"
          alt="strawberry"
        />
        <h1 className="text-center">{room}</h1>
      </div>
      <div className="room-block-wrap mx-auto row">
        <UsersInRoom users={usersInRoom} myname={name} />
        <div className="chat-block-outer col-md-9 col-sm-8 col-12 ps-0 pe-0 d-flex flex-column justify-content-between">
          <ScrollToBottom className="chat-block px-2 me-1">
            {messages.map((message, i) => (
              <React.Fragment key={i}>
                <MessageBlock
                  myname={name}
                  name={message.name}
                  text={message.text}
                  time={message.time}
                  annoucement={message.annoucement}
                ></MessageBlock>
              </React.Fragment>
            ))}
          </ScrollToBottom>
          <form onSubmit={handleSubmit} className="mb-2 mx-2">
            <div className="mt-2 chat-input mx-auto d-flex">
              <input
                type="text"
                className="form-control "
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="btn btn-primary ms-2 px-3">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
