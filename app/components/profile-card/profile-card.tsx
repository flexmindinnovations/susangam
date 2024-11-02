"use client";

import { Card, CardHeader, Image, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Heart, SquareArrowOutUpRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileCard = ({ data }: { data: any }) => {
  const [imagePath, setImagePath] = useState<string>();
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const defaultImagePath = "";
    const hostUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");
    const imagePath = data.imagePath1 ? data.imagePath1 : data.imagePath2 ? data.imagePath2 : defaultImagePath;
    const imageUrl = `${hostUrl}/${imagePath}`;
    setImagePath(imageUrl);
    setIsLoading(false);
  }, [data]);

  const handleLinkAction = () => {
    const url = `/profile/${data.customerId}`;
    router.push(url);
  };

  if (isLoading) {
    return (
      <Skeleton className="col-span-12 sm:col-span-4 h-[300px]" />
    );
  }

  return (
    <div className="profile-card">
      <Card
        onMouseEnter={() => setShowModalOptions(true)}
        onMouseLeave={() => setShowModalOptions(false)}
        className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden group"
      >
        <div
          className={`${showModalOptions ? "opacity-100" : "opacity-0"} rounded-lg bg-black/40 backdrop-blur-md p-4 flex flex-col space-y-4 absolute top-0 right-0 z-20`}>
          {
            [
              <Heart key={"heart"} />,
              <Star key={"star"} />,
              <SquareArrowOutUpRight key={"arrow"} />
            ].map((IconComponent, index) => (
              <div
                key={index}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                <IconComponent.type
                  key={index}
                  onClick={handleLinkAction}
                  className={`w-5 h-5 ${IconComponent.type === Heart ? "text-red-500" : IconComponent.type === Star ? "text-yellow-400" : "text-blue-500"}`} />
              </div>
            ))
          }
        </div>

        {/* Card Header with Gradient */}
        <CardHeader
          className="absolute z-10 bottom-0 w-full flex-col items-start rounded-t-none bg-gradient-to-t from-black/90 via-black/60 to-transparent py-4">
          <p className="text-xs text-white uppercase font-semibold">{data?.fullName}</p>
          <h4 className="text-white/70 text-xs font-light">{data?.stateName}</h4>
        </CardHeader>

        {/* Background Image */}
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-fill transition-transform duration-1000 transform group-hover:scale-110"
          src={imagePath}
        />
      </Card>
    </div>
  );
};

export default ProfileCard;
