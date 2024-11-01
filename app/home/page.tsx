import Hero from "@/app/components/home/hero/hero";
import WhyChoose from "@/app/components/home/why-choose/why-choose";
import HowItWorks from "@/app/components/home/how-it-works/how-it-works";
import RegisteredMembers from "@/app/components/home/members/registered-members";

const HomePage = () => {
  return (
    <div className="main-page h-full w-dvw overflow-x-hidden bg-gray-100">
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <RegisteredMembers />
    </div>
  );
};

export default HomePage;