"use client";
import React, { useState, useEffect } from "react";
import { utility } from "../utility/utils";
import http from "@/app/utility/axios-instance";
import { useApiConfig } from "@/app/utility/apiConfig";
import TurndownService from 'turndown';
import { useRouter } from "next/navigation";
import { divider } from "@nextui-org/theme";


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
    const maxLength = isMobile ? 25 : 50; // Set appropriate truncation length
    return markdownText.substring(0, maxLength).concat('...');
  };

  const getImagePath = (item:any) => {
    return `https://webapi.susangam.com/${item}`;
  };

  const handleBlogItemClick = (blogId:any) => {
     router.push(`/blog/${blogId}`);
  };

  return <div className="content fullscreen">
  <div className="content-wrapper flex-grow bg-white dark:bg-dark-900">
      {/* Header Section */}
      <section className="static bg-bg-blog min-h-80 bg-center object-cover bg-cover bg-no-repeat">
        <div className="overlay ion-padding backdrop-blur-lg bg-gradient-to-tr from-wr-500/70 via-bo-400/70 to-br-500/70 h-96 flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col gap-2 md:gap-0 lg:gap-0">
            <h1 className="font-bold m-0 text-sm text-center md:text-xl lg:text-2xl text-white">
              {utility.domain} Blog:
            </h1>
            <h2 className="font-normal m-0 md:font-bold lg:font-bold text-base text-center leading-8 lg:xl:leading-3 md:text-xl lg:text-2xl text-white">
              Insights, Tips, and Stories
            </h2>
          </div>
          <p className="text-sm text-white w-4/5 text-justify mx-auto">
            Welcome to the {utility.domain} Matrimonial Services blog—a place where love stories unfold, connections deepen, and hearts find their forever homes. Whether you’re a starry-eyed bride, a hopeful groom, or a caring family member cheering from the sidelines, our blog is your compass on this beautiful journey.
          </p>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="ion-padding">
        <div className="header py-3 my-3">
              <h1 className="block text-center">Featured Blog Posts</h1>
        </div>

        {blogList.length ? (
          <div className="blogs-container">
                <ul className="bg-inherit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {blogList.map((item:any, index:any) => (
                    <li key={index} onClick={() => handleBlogItemClick(item.blogId)} className="bg-white cursor-pointer hover:bg-gray-50 flex flex-col h-80 mb-8">
                      <div className="image-container flex-auto h-60 max-h-60">
                        <img src={getImagePath(item?.blogImagePath)} alt="" className="object-fill w-full h-full" />
                  </div>
                      <div className="blog-content flex-auto p-3">
                        <div className="header w-full flex flex-col items-start justify-between py-2 gap-1">
                          <h2 className="m-0 blog-title text-base">{item?.blogTitle}</h2>
                        </div>
                        <div className="blog-content py-1 flex flex-col gap-2 items-start justify-center">
                          <div className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: extractPlainTextFromRichText(item?.blogText) }} />
                          <span className="text-sm text-wr-600 select-none cursor-pointer hover:border-b hover:border-b-wr-600">
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
  </div>

};

export default BlogPage;
