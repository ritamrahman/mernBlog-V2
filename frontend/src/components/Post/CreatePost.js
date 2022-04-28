import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../../Redux/actions/authAction";
import { createNewPost } from "../../Redux/actions/postsAction";
import { CREATE_NEW_POST_REQUEST } from "../../Redux/constants/postConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ history }) => {
  toast.configure();
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.allCategories);
  const { loading: newPostLoading, post } = useSelector((state) => state.createNewPost);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");

  useEffect(() => {
    dispatch({ type: CREATE_NEW_POST_REQUEST });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // const formData = new FormData();
    formData.set("title", title);
    formData.set("category", category);
    formData.set("description", description);
    formData.set(
      "images",
      images ? images : "https://assets.weforum.org/article/image/P-024s_6OEvTBP4g8SXT-eNv2yWuRkrEtCdS9rJQ-Bg.jpg"
    );
    dispatch(createNewPost(formData));

    if (!newPostLoading && post !== "") {
      toast.success("post created successfully");
      history.push("/");
    }
  };

  // onChange function
  const onChange = (e) => {
    if (e.target.name === "images") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="container my-5">
        <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* title */}
          <div className="col-md-12">
            <label className="form-label">title</label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="inputEmail4"
            />
          </div>
          {/* Featured Image Preview*/}
          {/* <div className="col-md-6">
            <figure className="avatar mr-3 item-rtl">
              <img
                src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                className=""
                style={{ width: 500, height: 200 }}
                alt="avatar preview"
              />
            </figure>
          </div> */}
          {/* Featured Image */}
          <div class="col-md-2">
            <label for="formFile" class="form-label">
              Featured Image
            </label>
            <input name="images" onChange={onChange} class="form-control" type="file" id="formFile" />
          </div>
          {/* category */}
          <div className="col-md-4">
            <label className="form-label">category</label>
            <select
              id="inputState"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {!loading &&
                categories.map((category) => (
                  <>
                    <option value={category.slug}>{category.name}</option>
                  </>
                ))}
            </select>
          </div>

          {/* description */}
          <div class="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              class="form-control"
              aria-label="With textarea"
              style={{ height: 400 }}
            ></textarea>
          </div>
          {/* <div className="col-12"> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
