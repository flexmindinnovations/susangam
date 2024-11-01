"use client";
import { Link } from "@nextui-org/link";

const BlogPage = () => {
  return (
    <>
      <h1>Blog List</h1>
      <Link href={`/blog/5`}>Go to blog 5</Link>
    </>
  );
};

export default BlogPage;