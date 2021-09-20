import React from "react";
import DOMPurify from "dompurify";

const MessageBlock = ({ myname, name, text, time, annoucement }) => {
  const sanitizer = DOMPurify.sanitize;

  // transform text with links to have link tags inside
  function transformLink(str) {
    // links should start with http:// or https:// and have a dot somewhere inside (but should not contain have any spaces or end in a dot)
    let regex = /https?:\/\/[^\s]*[.][^\s]*[^\s^.]/gi;

    const linkArr = str.match(regex) || [];

    linkArr.forEach((item) => {
      str = str.replace(
        item,
        ` <a href="${item}" target="_blank" rel="noopener noreferrer" >${item}</a>`
      );
    });

    return str;
  }

  if (annoucement) {
    return (
      <div className="annoucement">
        <div className="message">{text}</div>
      </div>
    );
  }

  return (
    <div className={`mt-1 message-block ${name === myname ? "mine" : ""}`}>
      <div
        className="message px-2 me-1"
        dangerouslySetInnerHTML={{
          __html: sanitizer(transformLink(text), { ADD_ATTR: ["target"] }),
        }}
      ></div>
      <div className="user">
        {myname !== name ? name : ""} <span className="time">{time}</span>{" "}
      </div>
    </div>
  );
};

export default MessageBlock;
