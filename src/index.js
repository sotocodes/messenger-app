import React from 'react';
import { render } from 'react-dom';

class Messenger extends React.Component {
  render() {
    return (
      <div className="messenger">
        <div className="messenger__frame">
          <header className="messenger__header">[Header]</header>

          <div className="messenger__members">[Members]</div>

          <div className="messenger__message-list">
            <div className="messenger__message-list__wrapper">
              <div className="messenger__message-list__item">
                <img src="messenger/message-dummy-1.png" alt="Dummy 1" />
              </div>
              <div className="messenger__message-list__item">
                <img src="messenger/message-dummy-2.png" alt="Dummy 2" />
              </div>
              <div className="messenger__message-list__item">
                <img src="messenger/message-dummy-3.png" alt="Dummy 3" />
              </div>
            </div>
          </div>

          <div className="messenger__action-bar">
            <div className="messenger__action-bar-wrapper">
              <input
                className="messenger__action-bar__input"
                type="text"
                title="Message"
              />
              <button
                className="messenger__action-bar__btn btn btn--primary"
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<Messenger />, document.getElementById('messenger'));
