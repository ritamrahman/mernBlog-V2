import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecentPost_Card from "./components/Card/RecentPost_Card";
import { getAllPosts } from "./Redux/actions/postsAction";

const FilteredPosts = ({ match }) => {
  const dispatch = useDispatch();

  // let currentCtg = "";
  // let prevCtg;

  // page logic

  const [page, setPage] = useState(1);

  // select all posts
  const { posts, totalPosts } = useSelector((state) => state.allPosts);

  // currentCtg = tech
  //prevCtg = music
  const [isBlocked, setIsBlocked] = useState(false);
  const [prevCtg, setPrevCtg] = useState("");

  // when page refresh then run below both of useEffect hooks at same time
  // to prevent this problem i using isBlocked variable
  //when isBlocked is true only then run 1st useEffect hooks
  useEffect(() => {
    if (isBlocked) {
      setPage(1);
      // get recent posts
      posts.length !== totalPosts && dispatch(getAllPosts(page, match.params.category));
    }
    // setIsBlocked(false);
  }, [match.params.category]);

  useEffect(() => {
    // get recent posts
    posts.length !== totalPosts && dispatch(getAllPosts(page, match.params.category));
    setIsBlocked(true);
  }, [dispatch, page]);

  // const dilleadFun = () => {
  //   console.log("before conditions");
  //   console.log("currentCtg", currentCtg);
  //   console.log("prevCtg", prevCtg);
  //   if (currentCtg == prevCtg) {
  //     console.log("if conditions");
  //     console.log("currentCtg", currentCtg);
  //     console.log("prevCtg", prevCtg);

  //     return posts.length !== totalPosts && dispatch(getAllPosts(page, match.params.category));
  //   } else {
  //     console.log("else conditions");
  //     setPage(1);
  //     setPrevCtg(currentCtg);
  //     posts.length !== totalPosts && dispatch(getAllPosts(page, match.params.category));
  //     console.log("currentCtg", currentCtg);
  //     console.log("prevCtg", prevCtg);
  //   }
  // };

  // show More Function
  const showMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="App">
        <div className="max-w-full">
          {/* <Nav /> */}
          <div className="container">
            {/* Recent Post */}
            <span className="ct_txt w-100 text-left pt-5">posts found {posts.length}</span>
            <div className="container">
              <div className="row py-5">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 py-4">
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
              <div className="d-flex justify-content-center my-3">
                {posts.length !== totalPosts ? (
                  <button
                    type="button"
                    id="signUp"
                    className={`c_btn ${posts.length < 10 ? "showMoreBtnHide" : ""}`}
                    onClick={showMore}
                  >
                    Show More
                  </button>
                ) : (
                  <span>
                    No more posts <br /> please refresh to fetch new posts{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredPosts;
