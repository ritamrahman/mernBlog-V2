import React from "react";
import AuthorPopularCard from "../Card/AuthorPopularCard";
import Carousel from "../carousel";
import RecentPost_Card from "../Card/RecentPost_Card";
import Status from "../Card/Status";
import LeftSide from "../Layout/LeftSide";
import Comment from "../Comment/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSinglePost, likeUnlikePost } from "../../Redux/actions/postsAction";

function PostDetails({ match }) {
  const dispatch = useDispatch();

  const { postDetails } = useSelector((state) => state.singlePost);

  useEffect(() => {
    dispatch(getSinglePost(match.params.id));
  }, [dispatch]);

  // Like/Unlike Function
  const likeUnlike = () => {
    console.log(match.params);
    try {
      dispatch(likeUnlikePost(match.params.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center">
        {/* left side  */}
        <LeftSide marginX="auto" marginY="4" width="75">
          {/* post */}
          <div className="postDetails_LeftSide px-5 py-3">
            <div className="postDetails_Head d-flex flex-column">
              <h2 className="py-3">{postDetails.title}</h2>
              {/* Status */}
              <div className="d-flex my-3 align-items-center">
                {/* author info */}
                <div className="post_Author_div d-flex justify-content-start align-items-center">
                  <div className="">
                    <AccountCircleIcon />
                  </div>
                  <p className="card-text px-2">Ritam</p>
                </div>
                <span className="px-4">Posted on 3 min ago</span>
                {/* views */}
                <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
                  <RemoveRedEyeOutlinedIcon /> <p className=" mb-0 px-2">{postDetails.postViews}</p>
                </div>
              </div>
            </div>

            <p>{postDetails.description}</p>

            {/* Like */}
            <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
              <FavoriteBorderOutlinedIcon onClick={likeUnlike} /> <p className=" mb-0 px-2">{postDetails.likesCount}</p>
            </div>
          </div>
        </LeftSide>
        {/* Author popular posts */}
        <div className=" authorPopular mx-5 my-5 w-75">
          <h2 className="py-5">Some Popular Posts Of This Author</h2>
          <div className="row w-100">
            <div className="col-lg-6 col-12 d-flex w-100 flex-wrap">
              {new Array(4).fill("").map((post, index) => {
                return <AuthorPopularCard key={index} title={index} />;
              })}
            </div>
          </div>
        </div>

        {/* releted posts */}
        <div className=" reletedPost mx-5 my-5 w-75">
          <h2 className="py-1">You may like also</h2>
          <Carousel>
            {new Array(5).fill("").map((post, index) => {
              return <RecentPost_Card title={index} />;
            })}
          </Carousel>
        </div>
      </div>
      {/* Comment */}
      <Comment />
    </>
  );
}

export default PostDetails;
