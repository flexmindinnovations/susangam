"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { Skeleton } from "@nextui-org/react";
import ProfileCard from "@/app/components/profile-card/profile-card";
import { useApiConfig } from "@/app/utility/apiConfig";
import http from "@/app/utility/axios-instance";

const RegisteredMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useAuth();
  const apiConfig = useApiConfig();
  const dummyArray = Array.from({ length: 5 }, (_, i) => i + 1);
  useEffect(() => {

    const isSignedIn = async () => await isAuthenticated();
    isSignedIn().then((loggedIn) => {
      // if (loggedIn) {
      //
      // } else {
        getRandomProfiles().then((data: any) => {
          if (data) setMembers(data);
        });
      // }
    });
  }, []);

  const getRandomProfiles = async () => {
    try {
      const url = apiConfig.profile.getRandomProfiles;
      console.log('url: ', url);
      const randomProfiles = await http.get(url);
      const { data } = randomProfiles;
      return data;
    } catch (error) {
      console.error("Profile Fetch Error", error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="h-auto py-10 w-full flex items-center justify-between max-w-5xl mx-auto gap-5">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex items-center justify-end gap-5">
          {
            dummyArray.map((item) => (
              <Skeleton key={item} className="h-80 w-1/5 rounded-full" />
            ))
          }
        </div>
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="members-container flex flex-col gap-10 max-w-6xl mx-auto justify-center items-center py-20">
      <div className="text-center flex flex-col gap-5">
        <h1 className="heading">Search your Perfect Partner Here</h1>
        <p>
          The upcoming star of Matrimony world, Find your dream partner here.
        </p>
      </div>
      <div className="members-list grid grid-cols-5 gap-5">
        {
          members.map((member, index) => (
            <ProfileCard key={index} data={member} />
          ))
        }
      </div>
    </div>
  );
};

export default RegisteredMembers;