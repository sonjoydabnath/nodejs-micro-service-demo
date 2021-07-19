import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

// eslint-disable-next-line
export default () => {
  const [reloadCount, setReloadCount] = useState(1);
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate onCreate={() => setReloadCount(reloadCount + 1)} />
      <hr />
      <h1>Posts</h1>
      <PostList reloadCount={reloadCount} />
    </div>
  );
};
