import React from "react";
import AuthorPopularCard from "../Card/AuthorPopularCard";
import Carousel from "../carousel";
import RecentPost_Card from "../Card/RecentPost_Card";
import Status from "../Card/Status";
import LeftSide from "../Layout/LeftSide";
import Comment from "../Comment/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function PostDetails() {
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center">
        {/* left side  */}
        <LeftSide marginX="auto" marginY="4" width="75">
          {/* post */}
          <div className="postDetails_LeftSide px-5 py-3">
            <div className="postDetails_Head d-flex flex-column">
              <h2 className="py-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque totam eius in mollitia nisi ea quod
                sequi provident sunt ipsum.
              </h2>
              {/* Status */}
              <div className="d-flex my-3 align-items-center">
                {/* author info */}
                <div className="post_Author_div d-flex justify-content-start align-items-center">
                  <div className="">
                    <AccountCircleIcon />
                  </div>
                  <p className="card-text px-2">Ritam Rahman</p>
                </div>
                <span className="px-4">Posted on 3 min ago</span>
                {/* views */}
                <div className="post_stat postStat_V d-flex justify-content-start align-items-center">
                  <RemoveRedEyeOutlinedIcon /> <p className=" mb-0 px-2">9987</p>
                </div>
              </div>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eveniet dolorem et delectus harum
              accusantium, debitis, nostrum dolores illo aut, labore sequi. Dolorum deserunt fugit amet, vel ad
              doloribus odio aperiam expedita iste! Ipsum similique veritatis placeat molestias accusamus voluptate
              eveniet animi magni consectetur maiores in ad iste praesentium voluptatibus omnis, illo explicabo quidem
              possimus provident nemo voluptas tempora? Enim, ea. Adipisci, quaerat nihil quisquam quo impedit
              doloremque, dicta, iusto error voluptas aliquam sequi tempore blanditiis et labore amet. Dolorum eligendi
              cumque aliquid neque quia placeat libero. Atque fugit libero totam dolores ad! Quos reiciendis nulla nobis
              nam obcaecati inventore laborum blanditiis corrupti? Illo cum quisquam sed. Id nemo magnam culpa totam
              debitis ut voluptatem at ea? Quia soluta dolore ducimus eligendi dignissimos consectetur et optio officia?
              Incidunt nihil ad harum tempora cupiditate rerum, aspernatur nisi, ducimus asperiores temporibus quibusdam
              nobis sapiente iste quam unde. Eveniet ullam accusamus ducimus suscipit blanditiis molestias
              exercitationem perferendis vel praesentium sequi repellat, dolores voluptatum. Vitae fuga illo, fugiat
              tempore, porro quos quod aperiam magni maxime id sint ipsa hic culpa? Sit suscipit sed, blanditiis aperiam
              incidunt provident fugiat quos iure perferendis possimus tempore libero numquam illum dolores optio. Et
              dolores quasi nulla saepe eveniet quae unde odio, consectetur ratione illum cupiditate laboriosam tempore?
              Dolorem ipsa iusto cumque accusantium debitis mollitia repellendus dolor animi, eaque alias error
              distinctio, nesciunt consequuntur? Consequuntur quos quidem odit incidunt eum nihil quia est. Possimus ea
              laborum nemo temporibus, velit ducimus deleniti quos ipsam odit blanditiis ratione? Esse ratione
              perspiciatis consectetur amet minima illum cum repellat earum ab. Fuga obcaecati expedita quisquam, neque
              voluptate voluptatem aspernatur repellat rem nobis possimus eius eveniet ad error voluptatum omnis fugit
              vero aliquam saepe iure rerum in odio. Quae aut eveniet deleniti quis ea totam perferendis eligendi
              magnam, necessitatibus quas porro quia nesciunt incidunt voluptas unde vitae obcaecati asperiores fugit
              nemo! Doloribus aut voluptates error modi facilis praesentium quod, voluptatem veniam! Impedit neque porro
              numquam, beatae nulla dolor, qui dolores eveniet est aspernatur aliquid fuga veritatis harum odit aliquam
              ad. Exercitationem tempora alias dolorem aperiam quas consequatur recusandae nostrum totam voluptas quasi
              voluptatibus eligendi doloremque dolores dolor impedit repudiandae fugiat modi, obcaecati expedita,
              temporibus nihil voluptatum sequi! Odit quasi eius explicabo architecto quis vel aperiam officiis,
              pariatur ea quos ipsum necessitatibus inventore quas dignissimos? Odit vitae nisi, sequi perferendis
              voluptates quae blanditiis sunt possimus ad earum assumenda doloremque necessitatibus dolores voluptate
              iste cupiditate, alias aut quidem aspernatur! Voluptatem aperiam et totam suscipit iure nesciunt animi
              assumenda a nulla, veritatis earum rerum eos, quia corporis officia aut omnis quo! Ullam est cumque culpa
              harum, molestiae veniam reiciendis beatae? Excepturi odit ea ipsa asperiores ratione omnis voluptas quod
              eum accusamus temporibus! Saepe, fuga! Quaerat, beatae natus magni cumque non nulla minima fugiat, et
              ipsam eligendi iste in voluptatum dolorem ex. Quidem officia commodi ipsam? Maxime asperiores doloribus
              ducimus, cum ullam ut voluptatem, dolores exercitationem odit tempora earum doloremque, laudantium id
              accusamus tenetur? Sed, doloribus explicabo, repellendus, provident aspernatur porro ab ad modi
              perferendis asperiores magni totam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
              dolorem quidem illum voluptatum exercitationem expedita obcaecati blanditiis? Explicabo vitae
              reprehenderit maxime saepe itaque, et, qui facilis dolorum necessitatibus libero provident eaque. Fugit,
              dolorem aliquid. Doloremque ea voluptatum quasi exercitationem aliquid magnam voluptas velit dolor
              eligendi ullam magni cumque fugit laboriosam libero saepe, veritatis facere praesentium ducimus ut ipsa
              voluptate reiciendis? Corrupti suscipit quis soluta, sunt ratione molestias illum consequatur. Officiis a
              nesciunt, numquam est ipsa obcaecati exercitationem quod et culpa officia temporibus neque repellat sed
              facilis ducimus ea eligendi ad aspernatur? Iure veritatis ex nulla illum officia obcaecati debitis
              blanditiis?
            </p>

            <Status width="50" marginY="4" />
          </div>
        </LeftSide>
        {/* Author popular posts */}
        <div className=" authorPopular mx-5 my-5 w-75">
          <h2 className="py-5">Some Popular Posts Of This Author</h2>
          <div className="row w-100">
            <div className="col-lg-6 col-12 d-flex w-100 flex-wrap">
              {new Array(4).fill("").map((post, index) => {
                return <AuthorPopularCard title={index} />;
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
