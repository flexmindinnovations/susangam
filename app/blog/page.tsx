"use client";
import React, { useState, useEffect } from "react";
import { utility } from "../utility/utils";
import http from "@/app/utility/axios-instance";
import { useApiConfig } from "@/app/utility/apiConfig";
import TurndownService from 'turndown';
import { useRouter } from "next/navigation";
import image from '@/public/icon/blog.jpg';



const BlogPage = () => {
  const [blogList, setBlogList] = useState<any>([]);
  const router = useRouter();
  const apiConfig = useApiConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogListData] = await Promise.all([
          http.get(apiConfig.blog.blogList),
        ]);
        setBlogList(blogListData.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const extractPlainTextFromRichText = (richText: string): string => {
    if (!richText) return ''; // Handle empty or undefined input

    const turndownService = new TurndownService();
    const markdownText = turndownService.turndown(richText);

    // Limit the length based on screen size (optional)
    const isMobile = window.innerWidth <= 768;
    const maxLength = isMobile ? 50 : 100; // Set appropriate truncation length
    return markdownText.substring(0, maxLength).concat('...');
  };

  const getImagePath = (item: any) => {
    return `https://webapi.susangam.com/${item}`;
  };

  const handleBlogItemClick = (blogId: any) => {
    router.push(`/blog/${blogId}`);
  };

  return <div className="content fullscreen">
  <div className="relative w-full h-[450px] md:h-[350px] bg-cover bg-center"   style={{ backgroundImage: `url(${image.src})` }}>
    {/* Blurred Background Image */}

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700 opacity-75"/>

    {/* Content */}
    <section className="relative z-10 flex flex-col items-center justify-center text-center h-full py-16 px-6 lg:px-10 gap-4">
      <h2 className="font-bold m-0 text-sm text-center md:text-xl lg:text-2xl text-white">
        {utility.domain} Blog : Insights, Tips, and Stories
      </h2>
      <p className="mt-4 text-sm md:text-lg text-gray-200 leading-relaxed max-w-3xl md:max-w-5xl sm:text-base sm:mt-2 sm:px-4">
        Welcome to the {utility.domain} Matrimonial Services blog a place where love stories unfold, connections deepen, and hearts find their forever homes. Whether you’re a starry-eyed bride, a hopeful groom, or a caring family member cheering from the sidelines, our blog is your compass on this beautiful journey.
      </p>
    </section>
  </div>

  {/* Blog List Section */}
  <section className="py-10">
  <div className="header py-3 my-3">
    <h1 className="block font-bold m-0 text-sm text-center md:text-xl lg:text-2xl">Featured Blog Posts</h1>
  </div>

  {blogList.length ? (
    <div className="blogs-container w-3/4 mx-auto">
      {/* Grid layout for responsive columns */}
      <ul className="bg-inherit grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {blogList.map((item:any, index:any) => (
          <li
            key={index}
            onClick={() => handleBlogItemClick(item.blogId)}
            className="bg-white cursor-pointer hover:bg-gray-100 flex flex-col h-full mb-8 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="image-container flex-auto h-48 relative transition-all duration-300 transform hover:scale-105 hover:opacity-90">
              <img
                src={getImagePath(item?.blogImagePath)}
                alt=""
                className="object-cover w-full h-full transition-opacity duration-300 ease-in-out"
              />
            </div>
            <div className="blog-content flex-auto p-4 flex flex-col">
              <div className="header w-full flex flex-col items-start py-2 gap-1">
                <h2 className="m-0 blog-title text-base font-semibold text-gray-800">{item?.blogTitle}</h2>
              </div>
              <div className="blog-content py-1 flex flex-col gap-2 items-start justify-center">
                <div
                  className="text-xs text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: extractPlainTextFromRichText(item?.blogText),
                  }}
                />
                <span className="text-sm text-blue-600 select-none cursor-pointer hover:underline">
                  Read More
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="h-28 w-full p-3 flex items-center justify-center">
      <i className="pi pi-spin pi-spinner" style={{ fontSize: '2.5rem' }}></i>
    </div>
  )}
</section>


</div>
};

export default BlogPage;
