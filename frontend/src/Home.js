import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CTCard from "./components/Card/ctCard.js";
import Hero from "./components/Hero/hero.js";
import Carousel from "./components/carousel.js";
import RecentPost_Card from "./components/Card/RecentPost_Card";
import PostCard from "./components/Card/postCard";

import { getAllPosts, getAllTrendingPosts } from "./Redux/actions/postsAction";

function Home() {
  const dispatch = useDispatch();

  // select all posts
  const { posts } = useSelector((state) => state.allPosts);
  const { trendingPosts } = useSelector((state) => state.allTrendingPosts);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllTrendingPosts());
  }, [dispatch]);

  console.log("TRPost:", trendingPosts);

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
              {trendingPosts &&
                trendingPosts.map((post) => (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <PostCard
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
                ))}
            </div>
          </div>

          {/* Recent Post */}
          <h1 className="ct_txt w-100 text-center pt-5">Recent Post</h1>
          <div className="container">
            <div className="row py-5">
              {posts &&
                posts.map((post) => (
                  <div className="col-lg-4 col-md-6 col-sm-12">
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
                ))}
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="button" id="signUp" className="c_btn">
                <a className="text-decoration-none" href="#">
                  Show More
                </a>
              </button>
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
