import React from 'react';
import { render } from 'react-dom';

class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    fetch('https://new.visit-x.net/rest/v1/recruiting/messenger/channel/1234')
      .then(res => res.json())
      .then(json =>
        this.setState({
          messages: json.data.messages,
        }),
      );
  }

  render() {
    return (
      <div className="messenger">
        <div className="messenger__frame">
          <header className="messenger__header">[Header]</header>

          <div className="messenger__members">[Members]</div>

          <div className="messenger__message-list">
            <div className="messenger__message-list__wrapper">
              {this.state.messages.map(msg =>
                <div key={msg.id} className="messenger__message-list__item">
                  <div>
                    <span>
                      {msg.user.name}
                    </span>
                    <span>
                      {msg.sentAt}
                    </span>
                  </div>
                  <div>
                    {msg.text}
                  </div>
                </div>,
              )}
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
