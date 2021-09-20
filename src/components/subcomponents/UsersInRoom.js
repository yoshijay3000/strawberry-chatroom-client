import React from "react";

const UsersInRoom = ({ users, myname }) => {
  return (
    <div className="col-md-3 col-sm-4 col-12 px-0 mb-sm-0 mb-2">
      <div className="users-in-rooms p-1 d-flex flex-column">
        <h5 className="fw-bold">
          {users.length} {users.length > 1 ? "people" : "person"} online:{" "}
        </h5>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li
              key={user}
              className={`ind-user list-group-item bg-transparent ${
                user === myname ? "fw-bold" : ""
              }`}
            >
              &nbsp;&nbsp;{user} {user === myname ? "(you)" : ""}
            </li>
          ))}
        </ul>
        <a className="btn btn-outline-light d-block mt-auto mb-1 mx-1" href="/">
          Leave
        </a>
      </div>
    </div>
  );
};

export default UsersInRoom;
