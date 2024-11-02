"use client";
import { useParams } from "next/navigation";

const Profile = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      Profile Details
    </div>
  );
};

export default Profile;