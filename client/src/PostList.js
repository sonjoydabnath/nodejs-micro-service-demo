import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

// eslint-disable-next-line
export default ({ reloadCount }) => {
  const [posts, setPosts] = useState({});
  const [createCommentCount, setCreateCommentCount] = useState(1);

  const fetchPosts = async () => {
    const res = await axios.get("http://kube.mini/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [reloadCount, createCommentCount]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate
            postId={post.id}
            onCreate={() => setCreateCommentCount(createCommentCount + 1)}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
