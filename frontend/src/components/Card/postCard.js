import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function postCard({ title }) {
  return (
    <>
      <div className="postCard card">
        <img
          src="https://assets.weforum.org/article/image/P-024s_6OEvTBP4g8SXT-eNv2yWuRkrEtCdS9rJQ-Bg.jpg"
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          {/* title */}
          <h4 className="card-text py-2">{title}</h4>
          {/* author info */}
          <div className="post_Author_div d-flex justify-content-start align-items-center">
            <div className="">
              <AccountCircleIcon />
            </div>
            <p className="card-text px-2">Ritam Rahman</p>
          </div>
          {/* discription */}
          <p className="card-text py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex dolorum, magni necessitatibus tempora,
          </p>

          {/* post status */}
          <div className="post_stat w-100 d-flex justify-content-between align-items-center">
            {/* views */}
            <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
              <RemoveRedEyeOutlinedIcon /> <p className=" mb-0 px-2">9987</p>
            </div>
            {/* views */}
            <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
              <FavoriteBorderOutlinedIcon /> <p className=" mb-0 px-2">7K</p>
            </div>
            {/* views */}
            <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
              <ChatBubbleOutlineOutlinedIcon /> <p className=" mb-0 px-2">540</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default postCard;
