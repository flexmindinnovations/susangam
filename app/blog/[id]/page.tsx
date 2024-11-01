"use client";

import { useParams } from "next/navigation";

const BlogInfo = () => {
  const params = useParams();

  console.log("params: ", params);
  return (
    <>
      Blog Details: {params["id"]}
    </>
  );
};

export default BlogInfo;