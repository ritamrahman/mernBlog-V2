import React from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function Status({ width, paddingX, paddingY, marginX, marginY }) {
  return (
    <>
      <div
        className={`
          post_stat
          ${width ? `w-${width}` : "100"}
          ${paddingX ? `px-${paddingX}` : ""}
          ${paddingY ? `py-${paddingY}` : ""}
          ${marginX ? `mx-${marginX}` : ""}
          ${marginY ? `my-${marginY}` : ""}
            d-flex justify-content-between align-items-center`}
      >
        {/* Like */}
        <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
          <FavoriteBorderOutlinedIcon /> <p className=" mb-0 px-2">7K</p>
        </div>
        {/* views */}
        <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
          <RemoveRedEyeOutlinedIcon /> <p className=" mb-0 px-2">9987</p>
        </div>
        {/* Comment */}
        <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
          <ChatBubbleOutlineOutlinedIcon /> <p className=" mb-0 px-2">540</p>
        </div>
      </div>
    </>
  );
}

export default Status;
