import React from 'react';

import PlusIcon from '../icons/plus.svg';

const Members = props =>
  <div className="messenger__members">
    {props.messages.map(msg =>
      <img
        key={msg.id}
        src={`./users/${props.userId(msg)}.jpg`}
        className={`messenger__members__photo messenger__members__photo--${props.userId(
          msg,
        )}`}
      />,
    )}
    <div className="messenger__members__add-member">
      <img src={PlusIcon} alt="add member" />
    </div>
  </div>;

export default Members;
