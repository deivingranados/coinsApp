import React from "react";
import "./market.css";

interface Props {
  listText: any;
}

const ChildrenMarket: React.FC<Props> = ({ listText }) => {
  return (
    <div className="content_cardMarket" key={listText}>
      <div className="box_text_market">
        <label className="title_text">Name:</label>
        <div className="text_coins">{listText.name}</div>
      </div>
      <div className="box_text_market">
        <label className="title_text">Price:</label>
        <div className="text_coins">${listText.price}</div>
      </div>
      <div className="box_text_market">
        <label className="title_text">Price usd:</label>
        <div className="text_coins">${listText.price_usd}</div>
      </div>
      <div className="box_text_market">
        <label className="title_text">Time:</label>
        <div className="text_coins">{listText.time}</div>
      </div>
      <div className="box_text_market">
        <label className="title_text">volume:</label>
        <label className="text_coins">{listText.quote}</label>
      </div>
    </div>
  );
};

export default ChildrenMarket;
