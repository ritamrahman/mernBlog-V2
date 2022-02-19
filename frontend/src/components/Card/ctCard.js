import React from "react";

function ctCard({ name }) {
  return (
    <>
      <div className="ctCard card bg-dark text-white">
        <img
          src="https://assets.weforum.org/article/image/P-024s_6OEvTBP4g8SXT-eNv2yWuRkrEtCdS9rJQ-Bg.jpg"
          className="card-img"
          alt="..."
        />
        <div className="ctCard_overly_div card-img-overlay d-flex justify-content-center align-items-center">
          <h5 className="card-title">{name}</h5>
        </div>
      </div>
    </>
  );
}

export default ctCard;
