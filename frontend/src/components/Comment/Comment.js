import React from "react";

function Comment() {
  return (
    <>
      <div className="container">
        <div className="row bootstrap snippets bootdeys">
          <div className="col-md-8 col-sm-12">
            <div className="comment-wrapper">
              <div className="panel panel-info">
                <div className="panel-heading">Comment panel</div>
                <div className="panel-body">
                  <textarea className="form-control" placeholder="write a comment..." rows="3"></textarea>
                  <br />
                  <button type="button" className="btn btn-info pull-right">
                    Post
                  </button>
                  <div className="clearfix"></div>
                  <hr />
                  <ul className="media-list">
                    <li className="media">
                      <a href="#" className="pull-left">
                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle" />
                      </a>
                      <div className="media-body">
                        <span className="text-muted pull-right">
                          <small className="text-muted">30 min ago</small>
                        </span>
                        <strong className="text-success">@MartinoMont</strong>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,{" "}
                          <a href="#">#consecteturadipiscing </a>.
                        </p>
                      </div>
                    </li>
                    <li className="media">
                      <a href="#" className="pull-left">
                        <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                      </a>
                      <div className="media-body">
                        <span className="text-muted pull-right">
                          <small className="text-muted">30 min ago</small>
                        </span>
                        <strong className="text-success">@LaurenceCorreil</strong>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor{" "}
                          <a href="#">#ipsumdolor </a>adipiscing elit.
                        </p>
                      </div>
                    </li>
                    <li className="media">
                      <a href="#" className="pull-left">
                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                      </a>
                      <div className="media-body">
                        <span className="text-muted pull-right">
                          <small className="text-muted">30 min ago</small>
                        </span>
                        <strong className="text-success">@JohnNida</strong>
                        <p>
                          Lorem ipsum dolor <a href="#">#sitamet</a> sit amet, consectetur adipiscing elit.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
