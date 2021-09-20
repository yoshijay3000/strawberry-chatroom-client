import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Join = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    history.push(`/chat?name=${name.trim()}&room=${room.trim()}`);
  }

  return (
    <div className="container">
      <div className="wrap d-flex justify-content-center align-items-center">
        <div className="join-block p-4">
          <div className="d-flex justify-content-around">
            <img
              className="img-fluid strawberry-icon"
              src="/images/strawberry.png"
              alt="strawberry"
            />
            <h1 className="text-center mb-4">Join a chat room</h1>
          </div>
          <form className="pb-2" onSubmit={handleSubmit}>
            <div className="mb-3 mx-2">
              <input
                type="text"
                className="form-control gray-input"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 mx-2">
              <input
                type="text"
                className="form-control gray-input"
                id="room"
                placeholder="Room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary d-block mx-auto enter-chat ">
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
