import React from 'react';
import { render } from 'react-dom';

import ArrowIcon from './icons/arrow.svg';
import PlusIcon from './icons/plus.svg';
import SubmitIcon from './icons/submit.svg';
import SmileyIcon from './icons/smiley.svg';

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
                <img src={ArrowIcon} alt="back" />
              </div>
              <h1 className="messenger__header__group-title">
                Julia's Groupchate
              </h1>
            </div>
            <small className="messenger__header__bottom">3 People Online</small>
          </header>

          <div className="messenger__members">
            {this.state.messages.map(msg =>
              <img
                key={msg.id}
                src={`./users/${this.userId(msg)}.jpg`}
                className={`messenger__members__photo messenger__members__photo--${this.userId(
                  msg,
                )}`}
              />,
            )}
            <div className="messenger__members__add-member">
              <img src={PlusIcon} alt="add member" />
            </div>
          </div>

          <div className="messenger__message-list">
            <div className="messenger__message-list__wrapper">
              {this.state.messages.map(msg =>
                <div key={msg.id} className="messenger__message-list__item">
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img
                        src={`./users/${this.userId(msg)}.jpg`}
                        className={`messenger__members__photo messenger__members__photo--${this.userId(
                          msg,
                        )}`}
                      />
                    </div>
                    <div
                      className={`messenger__message-list__item-text messenger__message-list__item-text--${this.userId(
                        msg,
                      )}`}
                    >
                      <div className="messenger__message-list__item__info">
                        <span>
                          {msg.user.name}
                        </span>
                        <span>
                          {this.milisecondsToHHMM(msg.sentAt)}
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
          </div>

          <div className="messenger__action-bar">
            <div className="messenger__action-bar-wrapper">
              <div className="messenger__action-bar__input-wrapper">
                <input
                  ref={inputField => (this.inputField = inputField)}
                  className="messenger__action-bar__input"
                  type="text"
                  title="Message"
                />
                <img
                  src={SmileyIcon}
                  className="messenger__action-bar__smiley-btn"
                />
              </div>
              <button
                onClick={this.sendMessage.bind(this)}
                className="messenger__action-bar__btn btn btn--primary"
                type="button"
              >
                <img src={SubmitIcon} />
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

  milisecondsToHHMM(miliseconds) {
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
  }

  userId(msg) {
    if (msg.user.name.toLowerCase() === 'you') return 'you';
    else return msg.user.id;
  }
}

render(<Messenger />, document.getElementById('messenger'));
