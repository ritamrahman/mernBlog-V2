import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Status from "./Status";

function RecentPost_Card({ link, title, categories, authorName, avatar, description, views, likes, commentCount }) {
  return (
    <>
      <div className="recentPost_card card">
        <img
          src="https://assets.weforum.org/article/image/P-024s_6OEvTBP4g8SXT-eNv2yWuRkrEtCdS9rJQ-Bg.jpg"
          className="card-img-top"
          alt="..."
        />

        <div className="rc_body card-body">
          {/* title */}

          <h4 className="card-text">
            <Link to={`/post/${link}`}>{title}</Link>
          </h4>

          {/* Category */}
          <span class="badge bg-secondary my-2">{categories}</span>

          {/* author info */}
          <div className="post_Author_div d-flex justify-content-start align-items-center">
            <div className="">
              <AccountCircleIcon />
            </div>
            <p className="card-text px-2">{authorName}</p>
          </div>
          {/* discription */}
          <p className="card-text py-3">{description}</p>

          {/* post status */}
          <Status views={views} likes={likes} commentCount={commentCount} />
        </div>
      </div>
    </>
  );
}

export default RecentPost_Card;
