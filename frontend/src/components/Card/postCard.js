import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Status from "./Status";
import { Link } from "react-router-dom";

function postCard({
  images,
  link,
  title,
  categories,
  authorName,
  avatar,
  description,
  views,
  likesCount,
  commentCount,
}) {
  return (
    <>
      <div className="postCard card">
        <img src={images} className="card-img-top" alt="..." />

        <div className="card-body">
          {/* title */}
          <h4 className="card-text py-2">
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
          <p className=" card-text py-3 overflow-hidden">{description}</p>

          {/* post status */}
          <Status views={views} likes={likesCount} commentCount={commentCount} />
        </div>
      </div>
    </>
  );
}

export default postCard;
