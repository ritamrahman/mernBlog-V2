import React from "react";

function AuthorPopularCard({ title }) {
  return (
    <>
      <div class="card mb-3 mx-3" style={{ maxWidth: "400px" }}>
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="https://assets.weforum.org/article/image/P-024s_6OEvTBP4g8SXT-eNv2yWuRkrEtCdS9rJQ-Bg.jpg"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{title}</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content. This content
                is a little bit longer.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorPopularCard;
