import CTCard from "./components/Card/ctCard.js";
import Hero from "./components/Hero/hero.js";
import Nav from "./components/nav/nav.js";
import Carousel from "./components/carousel.js";
import RecentPost_Card from "./components/Card/RecentPost_Card";
import PostCard from "./components/Card/postCard";
import PostDetails from "./components/Post/PostDetails.js";
import Layout from "./components/Layout/Layout.js";

function Home() {
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
          <Carousel>
            {new Array(5).fill("").map((post, index) => {
              return <PostCard title={index} />;
            })}
          </Carousel>
          {/* Recent Post */}
          <h1 className="ct_txt w-100 text-center pt-5">Recent Post</h1>
          <div className="w-100 ">
            <div class="container ">
              <div class="row d-flex">
                {new Array(12).fill("").map((post, index) => {
                  return (
                    <div class="col d-flex justify-content-start flex-wrap py-3">
                      <RecentPost_Card link={`/post/${index}`} title={`title no ${index}`} />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
