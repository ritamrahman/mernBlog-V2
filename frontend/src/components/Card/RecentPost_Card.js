import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Status from "./Status";

function RecentPost_Card({ title, link }) {
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
            <Link to={`${link}`}>{title}</Link>
          </h4>

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
          <Status />
        </div>
      </div>
    </>
  );
}

export default RecentPost_Card;
