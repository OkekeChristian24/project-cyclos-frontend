import React, { useState, useRef } from "react";

export default function Autocomplete(props) {
  const initList = props.list;
  const [list, setList] = useState(initList);
  const [listVisible, setListVisible] = useState(false);
  const [value, setValue] = useState("");
  const input = useRef(null);

  const onChange = (event) => {
    const eValue = event.target.value.toLowerCase();

    const result = initList.filter((listItem) => {
      return listItem.text.toLowerCase().includes(eValue);
    });
    setValue(eValue);
    setList(result);
  };
  const onFocus = () => {
    setListVisible(true);
  };
  const onBlur = () => {
    setListVisible(false);
  };
  const setNewValue = (text) => {
    setValue(text);
    input.current.focus();
  };
  return (
    <div className="autocomplete">
      <div className="autocomplete__input">
        <input
          ref={input}
          autoComplete="none"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          placeholder={props.placeholder}
          type="text"
        />
        <svg
          width="19"
          height="11"
          viewBox="0 0 19 11"
          fill="none
        "
        >
          <path
            d="M1 0.999999L9.22357 9.88125C9.2937 9.95678 9.39432 10 9.5 10C9.60568 10 9.7063 9.95678 9.77643 9.88125L18 1"
            stroke=""
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div className={`autocomplete__list ${listVisible ? "visible" : ""}`}>
        <ul>
          {list.length <= 0 ? (
            <li>&nbsp;</li>
          ) : (
            list.map((item, index) => (
              <ListItem key={index} text={item.text} onClick={setNewValue} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
export const ListItem = ({ text, onClick }) => {
  return (
    <li onMouseDown={() => onClick(text)}>
      <span>{text}</span>
    </li>
  );
};
