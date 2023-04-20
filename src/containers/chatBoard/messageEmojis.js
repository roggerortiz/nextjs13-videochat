import { useChat } from "@/helpers/context/chatContext";
import { useState } from "react";
import { Smile } from "react-feather";
import { Dropdown, DropdownToggle } from "reactstrap";

const MessageEmojis = () => {
  const [emoji, setEmoji] = useState(false);
  const { emojis, messageInput, setMessageInput } = useChat();

  const getEmoji = (emoj) => {
    setMessageInput(`${messageInput}${emoj.emoji}`);
    setEmoji(false);
  };

  return (
    <div className="dot-btn dot-primary mr-3">
      <Dropdown
        isOpen={emoji}
        toggle={() => setEmoji((prevState) => !prevState)}
      >
        <DropdownToggle
          tag="button"
          data-toggle="dropdown"
          aria-expanded={emoji}
          className={`icon-btn btn-outline-primary button-effect toggle-emoji ${emoji ? "active" : ""
            }`}
        >
          <Smile />
        </DropdownToggle>

        <div
          className={`emojis-contain ${emoji ? "open" : ""}`}
          style={{ left: "-50px" }}
        >
          <div className="emojis-sub-contain custom-scroll">
            <ul>
              {emojis.map((item, i) => {
                return (
                  <li key={i} onClick={() => getEmoji(item)}>
                    {item.emoji}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default MessageEmojis;
