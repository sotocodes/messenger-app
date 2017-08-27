import React from 'react';
import { render } from 'react-dom';

import Arrow from './icons/arrow.svg';
import Plus from './icons/plus.svg';
import User1 from './users/1.jpg';
import User2 from './users/2.jpg';
import User3 from './users/3.jpg';
import User4 from './users/4.jpg';

class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.loadMessages = this.loadMessages.bind(this);
  }

  componentDidMount() {
    this.loadMessages();
  }

  render() {
    return (
      <div className="messenger">
        <div className="messenger__frame">
          <header className="messenger__header">
            <div className="messenger__header__top">
              <div className="messenger__header__back-icon">
                <img src={Arrow} alt="back" />
              </div>
              <h1 className="messenger__header__group-title">
                Julia's Groupchate
              </h1>
            </div>
            <small className="messenger__header__bottom">3 People Online</small>
          </header>

          <div className="messenger__members">
            <img
              className="messenger__members__photo messenger__members__photo--blue"
              src={User1}
              alt=""
            />
            <img
              className="messenger__members__photo messenger__members__photo--gold"
              src={User2}
              alt=""
            />
            <img
              className="messenger__members__photo messenger__members__photo--pink"
              src={User3}
              alt=""
            />
            <img
              className="messenger__members__photo messenger__members__photo--gray"
              src={User4}
              alt=""
            />
            <div className="messenger__members__add-member">
              <img src={Plus} alt="add member" />
            </div>
          </div>

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
                ref={inputField => (this.inputField = inputField)}
                className="messenger__action-bar__input"
                type="text"
                title="Message"
              />
              <button
                onClick={this.sendMessage.bind(this)}
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

  sendMessage() {
    console.log('send message: ', this.inputField.value);

    if (this.inputField.value !== '') {
      fetch(
        'https://new.visit-x.net/rest/v1/recruiting/messenger/channel/1234',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: this.inputField.value }),
        },
      )
        .then(() => {
          this.inputField.value = '';
          this.loadMessages();
        })
        .catch(error => console.error(error));
    }
  }

  loadMessages() {
    fetch('https://new.visit-x.net/rest/v1/recruiting/messenger/channel/1234')
      .then(res => res.json())
      .then(json =>
        this.setState({
          messages: json.data.messages,
        }),
      );
  }
}

render(<Messenger />, document.getElementById('messenger'));
