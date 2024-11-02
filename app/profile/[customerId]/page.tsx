"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useApiConfig } from "@/app/utility/apiConfig";
import http from "@/app/utility/axios-instance";
import ImageGallery from "@/app/components/user-details/image-gallery/image-gallery";
import UserDetails from "@/app/components/user-details/user-details";
import { Spinner } from "@nextui-org/react";

const ProfileDetails = () => {
  const params = useParams();
  const apiConfig = useApiConfig();
  const { customerId } = params;

  const [locationData, setLocationData] = useState({ country: null, state: null, city: null, homeAddress: "" });
  const [isLoading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [userImages, setUserImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState("");

  const hostUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

  useEffect(() => {
    if (!customerId) return;

    const getProfileDetails = async () => {
      try {
        const url = apiConfig.customer.getCustomerById(customerId.toString());
        const { data } = await http.get(url);
        const { contactInfoModel, imageInfoModel } = data;
        const { cityId, stateId, countryId, homeAddress } = contactInfoModel;

        const [countryList, stateList, cityList] = await Promise.all([
          http.get(apiConfig.location.country),
          http.get(apiConfig.location.state(countryId)),
          http.get(apiConfig.location.city(stateId))
        ]);

        const country = countryList.data.find((_countryList: any) => _countryList.countryId === countryId);
        const state = stateList.data.find((_stateList: any) => _stateList.stateId === stateId);
        const city = cityList.data.find((_cityList: any) => _cityList.cityId === cityId);
        setLocationData({ country, state, city, homeAddress });

        const images = [imageInfoModel.imagePath1, imageInfoModel.imagePath2]
          .filter(Boolean)
          .map((path) => `${hostUrl}/${path}`);
        if (images.length > 0) {
          setUserImages(images);
          setSelectedImage(images[0]);
        }

        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfileDetails();
  }, [customerId, apiConfig, hostUrl]);

  if (isLoading) return <div className="empty-wrapper">
    <Spinner />
    <p>Loading...</p>
  </div>;

  if (!customerId || !userDetails)
    return (
      <div className="empty-wrapper">
        <p>Unable to load user details. Please check the user ID and try again.</p>
      </div>
    );

  return (
    <div
      className="container h-full w-full overflow-hidden max-w-6xl mx-auto p-5 grid grid-cols-1 md:grid-cols-[20%_1fr] gap-5">
      <ImageGallery
        userImages={userImages}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        locationData={locationData} />
      <UserDetails userDetails={userDetails} />
    </div>
  );
};

export default ProfileDetails;
