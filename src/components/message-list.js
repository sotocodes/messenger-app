import React from 'react';

const MessageList = props =>
  <div className="messenger__message-list">
    <div className="messenger__message-list__wrapper">
      {props.messages.map(msg =>
        <div key={msg.id} className="messenger__message-list__item">
          <div style={{ display: 'flex' }}>
            <div>
              <img
                src={`./users/${props.userId(msg)}.jpg`}
                className={`messenger__members__photo messenger__members__photo--${props.userId(
                  msg,
                )}`}
              />
            </div>
            <div
              className={`messenger__message-list__item-text messenger__message-list__item-text--${props.userId(
                msg,
              )}`}
            >
              <div className="messenger__message-list__item__info">
                <span>
                  {msg.user.name}
                </span>
                <span>
                  {milisecondsToHHMM(msg.sentAt)}
                </span>
              </div>
              <div className="messenger__message-list__item__msg">
                {msg.text}
              </div>
            </div>
          </div>
        </div>,
      )}
    </div>
  </div>;

const milisecondsToHHMM = miliseconds => {
  let date = new Date(miliseconds);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let dayOrNight = 'am';

  if (hh > 12) {
    hh = hh % 12;
    dayOrNight = 'pm';
  }
  // These lines ensure you have two-digits
  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;

  return `${hh}:${mm} ${dayOrNight}`;
};

export default MessageList;
