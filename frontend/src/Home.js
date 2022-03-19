import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CTCard from "./components/Card/ctCard.js";
import Hero from "./components/Hero/hero.js";
import RecentPost_Card from "./components/Card/RecentPost_Card";
import PostCard from "./components/Card/postCard";

import { getAllPosts, getAllTrendingPosts } from "./Redux/actions/postsAction";

function Home() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  // select all posts
  const { posts, totalPosts } = useSelector((state) => state.allPosts);
  const { trendingPosts } = useSelector((state) => state.allTrendingPosts);

  useEffect(() => {
    // get recent posts
    posts.length !== totalPosts && dispatch(getAllPosts(page));
    // posts.length > 0 ? dispatch({ type: ALL_POSTS_CLEAR }) : dispatch(getAllPosts(page));

    // get trending posts
    dispatch(getAllTrendingPosts());
  }, [dispatch, page]);

  // show More Function
  const showMore = () => {
    setPage(page + 1);
  };
  // console.log("post", posts);
  // console.log("posts.length", posts.length);
  // console.log("post", totalPosts);
  return (
    <div className="App">
      <div className="max-w-full">
        {/* <Nav /> */}
        <div className="container">
          <Hero />
          {/* Top category */}
          <h1 className="ct_txt w-100 text-center">Popular category</h1>
          <div className="d-flex justify-content-evenly py-5">
            <CTCard name="Tech" />
            <CTCard name="Music" />
            <CTCard name="Programming" />
            <CTCard name="Blogging" />
            <CTCard name="Story" />;
          </div>
          {/* Trending Post */}
          <h1 className="ct_txt w-100 text-center pt-5">Trending Post</h1>
          <div className="container">
            <div className="row py-5">
              {trendingPosts.length > 0 ? (
                trendingPosts.map((post) => (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <PostCard
                      link={post._id}
                      title={post.title}
                      authorName={post.user.name}
                      description={post.description}
                      views={post.postViews}
                      likesCount={post.likesCount}
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

          {/* Recent Post */}
          <h1 className="ct_txt w-100 text-center pt-5">Recent Post</h1>
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
                <button type="button" id="signUp" className="c_btn" onClick={showMore}>
                  Show More
                </button>
              ) : (
                <span>
                  No more posts <br /> please refresh to fetch new posts{" "}
                </span>
              )}
            </div>
          </div>
          {/* <div className="w-100 ">
            <div class="container ">
              <div class="row d-flex">
                {posts.map((post) => {
                  return (
                    <div class="col d-flex justify-content-start flex-wrap py-3">
                      <RecentPost_Card
                        link={post._id}
                        title={post.title}
                        authorName={post.user.name}
                        description={post.description}
                        views={post.postViews}
                        likes={post.likes}
                        commentCount={post.commentCount}
                        categories={post.categories}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="button" id="signUp" className="c_btn">
                <a className="text-decoration-none" href="#">
                  Show More
                </a>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
