"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CheckCircle, HelpCircle, LockIcon, User } from "lucide-react";
import { useEffect, useRef, useState } from "react"; // Example imports

const WhyChoose = () => {
  const iconHeight = "h-14";
  const iconWidth = "w-14";
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const reasons = [
    {
      title: "Trusted Platform",
      description: "With thousands of successful matches, Susangam has earned the trust of countless individuals and families.",
      icon: <CheckCircle className={`${iconHeight} ${iconWidth} text-primary`} />
    },
    {
      title: "Personalized Matches",
      description: "Our advanced algorithms tailor matches based on your preferences, ensuring compatibility and shared interests.",
      icon: <User className={`${iconHeight} ${iconWidth} text-primary`} />
    },
    {
      title: "Secure & Confidential",
      description: "Your privacy and security are our top priorities. We use cutting-edge technology to safeguard your information.",
      icon: <LockIcon className={`${iconHeight} ${iconWidth} text-primary`} />
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any queries or concerns.",
      icon: <HelpCircle className={`${iconHeight} ${iconWidth} text-primary`} />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Adjust this value to change when the observer triggers
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
    console.log("isVisible: ", isVisible);
  }, []);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto justify-center items-center py-20">
      <h2 className="text-center heading">Why Choose Susangam?</h2>
      <div className={`grid grid-cols-4 gap-5`}>
        {reasons.map((reason, index) => (
          <motion.div
            key={`${index}-${reason.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            <Card className="flex flex-col items-center p-4 h-80"> {/* Set a fixed height */}
              <CardHeader className="flex flex-col items-center p-4">
                {reason.icon}
                <h3 className="mt-2 text-lg font-semibold">{reason.title}</h3>
              </CardHeader>
              <CardBody className="flex-grow flex items-center justify-center">
                <p className="text-center">{reason.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
