import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import AuthorPopularCard from "../Card/AuthorPopularCard";
import RecentPost_Card from "../Card/RecentPost_Card";
import LeftSide from "../Layout/LeftSide";
import Comment from "../Comment/Comment";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { getSinglePost, likeUnlikePost, getRelatedPosts } from "../../Redux/actions/postsAction";
import { RESET_REACTION, ALL_POSTS_CLEAR, RESET_ERROR } from "../../Redux/constants/postConstant";

function PostDetails({ match }) {
  toast.configure();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const { loading, postDetails, reaction, relatedPosts, error } = useSelector((state) => state.singlePost);

  useEffect(() => {
    dispatch(getSinglePost(match.params.id)); // get single post
    dispatch(getRelatedPosts(match.params.id)); // get related post
    reaction !== "" && toast.success(reaction);
    error !== "" && toast.warning(error);
    dispatch({ type: RESET_REACTION });
    dispatch({ type: ALL_POSTS_CLEAR }); //clear recent posts array []
    dispatch({ type: RESET_ERROR }); //clear recent posts array []
  }, [dispatch, match.params.id, reaction, error]);

  // console.log("getSinglePost", postDetails);

  // Like/Unlike Function

  const likeUnlike = () => {
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
        {!postDetails ? (
          "loading..."
        ) : (
          <>
            {postDetails && (
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

                  <div
                    dangerouslySetInnerHTML={{
                      __html: postDetails.description,
                    }}
                  >
                    {/* {postDetails.description} */}
                  </div>

                  {/* Like */}
                  <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
                    <button
                      className={`likeBTN ${loading ? "pointerEvent" : ""}`}
                      onClick={likeUnlike}
                      disabled={isDisabled}
                    >
                      <FavoriteBorderOutlinedIcon />
                    </button>
                    <p className=" mb-0 px-2">{postDetails.likesCount}</p>
                  </div>
                </div>
              </LeftSide>
            )}
          </>
        )}
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
        <div className="container">
          <h2 className="py-5">You may like also</h2>
          <div className="row py-5">
            {relatedPosts.length > 0 ? (
              relatedPosts.map((post) => (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <RecentPost_Card
                    link={post._id}
                    title={post.title}
                    authorName={post.user.name}
                    description={post.description}
                    views={post.postViews}
                    likes={post.likesCount}
                    commentCount={post.commentCount}
                    categories={post.categories}
                  />
                </div>
              ))
            ) : (
              <h5>no post found</h5>
            )}
          </div>
        </div>
      </div>
      {/* Comment */}
      <Comment />
    </>
  );
}

export default PostDetails;
