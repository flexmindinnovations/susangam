import { Card, Divider, Image } from "@nextui-org/react";
import { utility } from "@/app/utility/utils";

const ImageGallery = (({ userImages, selectedImage, onSelectImage, locationData }: {
  userImages: any,
  selectedImage: any,
  onSelectImage: any,
  locationData: any
}) => {
  const { country, state, city, homeAddress } = locationData;
  const address = utility.getCleanString(homeAddress);
  return (
    <div className="left py-5">
      <Card className="max-h-80 rounded-none shadow-none border-none">
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 rounded-none w-96 h-64 object-fill transition-transform duration-1000 transform group-hover:scale-110"
          src={selectedImage}
        />
      </Card>
      <div className="image-container flex items-center justify-center my-4 gap-2">
        {userImages.map((image: any, index: number) => (
          <Image
            key={index}
            className={`${
              selectedImage === image ? "border-primary shadow-2xl" : "border-transparent"
            } border border-solid border-2 rounded-none h-12 w-12 object-fill cursor-pointer`}
            removeWrapper
            onClick={() => onSelectImage(image)}
            src={image}
          />
        ))}
      </div>

      <div className="user-info flex flex-col gap-2 mt-4 px-2">
        <div className="text-xs text-black flex flex-col">
          <span>Address:</span>
          <span><Divider orientation="horizontal" /></span>
        </div>
        <p className="flex flex-col w-full text-xs opacity-80">
          <span>{address}</span>
        </p>
        <p className="flex w-full text-xs opacity-80">
          {city.cityName}, {state.stateName}, {country.countryName}
        </p>
      </div>
    </div>
  );
});

export default ImageGallery;