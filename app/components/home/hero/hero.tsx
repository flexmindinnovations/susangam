"use client";
import { Button, Card, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { utility } from "@/app/utility/utils";

const Hero = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const greetingText = [
    { text: "हृदयात् हृदयं यावत्", language: "Sanskrit" },
    { text: "दिल का दिल से", language: "Hindi" },
    { text: "Heart to Heart", language: "English" },
    { text: "دل سے دل كا", language: "Urdu" },
    { text: "हृदय देखि हृदय सम्म", language: "Hindi" },
    { text: "হৃদয় থেকে হৃদয়", language: "Bengali" },
    { text: "இதயம் இதயத்திற்கு", language: "Tamil" },
    { text: "హృదయం నుంచి హృదయం", language: "Telugu" },
    { text: "ಹೃದಯದಿಂದ ಹೃದಯಕ್ಕೆ", language: "Kannada" },
    { text: "ഹൃദയം ഹൃദയത്തിനേക്ക്", language: "Malayalam" },
    { text: "હૃદયથી હૃદયને", language: "Gujarati" },
    { text: "ਦਿਲ ਤੋਂ ਦਿਲ", language: "Punjabi" },
    { text: "ହୃଦୟ ହୃଦୟ", language: "Odia" },
    { text: "تائين دل كاندل", language: "Farsi" },
    { text: "القلب إلى القلبمن", language: "Arabic" },
  ];

  useEffect(() => {
    const videoPath = `susangam/susangam.mp4`;
    utility.getVideoUrl(videoPath).then((url) => {
      setVideoUrl(url);
    });

    const marqueeText: any = document.querySelector(".marquee-text");
    if (marqueeText) {
      const content = greetingText.map((item) => `<p class="text-white text-xl mr-8 font-semibold">${item.text}</p>`).join("");
      marqueeText.innerHTML = `${content}${content}`;

      const totalWidth = marqueeText.scrollWidth;
      const containerWidth = marqueeText.parentElement.clientWidth;

      const speed = 100;
      const animationDuration = (totalWidth / speed) * 500;
      marqueeText.style.animationDuration = `${animationDuration}ms`;
      marqueeText.style.animationIterationCount = "infinite";
      marqueeText.classList.add("animate-marquee");
      marqueeText.addEventListener("animationend", () => {
        void marqueeText.offsetWidth;
        marqueeText.classList.remove("animate-marquee");
        void marqueeText.offsetWidth;
        marqueeText.classList.add("animate-marquee");
      });
    }

  }, []);


  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center bg-blue-50">
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-none z-0"
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "16/9"
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="h-full w-full absolute top-0 bottom-0 z-0">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/80 z-10"></div>
      <Card className="relative self-end z-20 p-10 bg-transparent shadow-none">
        <h1 className="text-white text-5xl font-bold">Find Your Perfect Match</h1>
        <p className="text-white text-lg mt-4">
          Join Susangam and embark on your journey to love and happiness.
        </p>
        <div className="mt-8 flex gap-4">
          <Button color="primary" variant="shadow">
            Get Started
          </Button>
          <Button variant="bordered" color="primary">
            Learn More
          </Button>
        </div>
      </Card>

      <div className="marquee-container z-10 max-w-full absolute bottom-32 overflow-hidden whitespace-nowrap py-4">
        <div className="marquee-text flex whitespace-nowrap"></div>
      </div>
    </div>
  );
};


export default Hero;
