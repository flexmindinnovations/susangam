"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Dot, PresentationIcon, UnplugIcon, UserRoundCheck, UserRoundPen } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const iconHeight = "h-14";
  const iconWidth = "w-14";

  // Convert descriptions to bullet points
  const steps = [
    {
      title: "Create Your Profile",
      description: [
        "Sign up and create a detailed profile.",
        "Highlight your personality and preferences.",
        "Specify what you're looking for in a partner."
      ],
      icon: <UserRoundPen className={`${iconHeight} ${iconWidth} text-primary`} />,
      step: "Step 1"
    },
    {
      title: "Browse Matches",
      description: [
        "Explore personalized matches tailored to you.",
        "Use filters to narrow down your search."
      ],
      icon: <UserRoundCheck className={`${iconHeight} ${iconWidth} text-primary`} />,
      step: "Step 2"
    },
    {
      title: "Connect",
      description: [
        "Express interest in profiles you like.",
        "Communicate through secure messaging.",
        "Get to know potential matches better."
      ],
      icon: <UnplugIcon className={`${iconHeight} ${iconWidth} text-primary`} />,
      step: "Step 3"
    },
    {
      title: "Meet & Match",
      description: [
        "Arrange meetings to take connections further.",
        "Trust your instincts to find your match."
      ],
      icon: <PresentationIcon className={`${iconHeight} ${iconWidth} text-primary`} />,
      step: "Step 4"
    }
  ];

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto justify-center items-center py-20">
      <h2 className="text-center heading">How It Works</h2>
      <div className="flex gap-5 items-center">
        {steps.map((step, index) => (
          <div key={`${index}-${step.title}`} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <Card className="flex flex-col items-center justify-center px-4 min-h-80 gap-5 w-56">
                <CardHeader className="flex flex-col gap-2 p-0 pt-8 items-center">
                  <span className="text-sm font-bold text-primary">{step.step}</span>
                  <span>{step.icon}</span>
                  <h3 className="text-lg font-semibold text-center">{step.title}</h3>
                </CardHeader>
                <CardBody className="flex-grow p-0 pb-4 flex items-start justify-start min-h-40">
                  <ul className="text-left space-y-1 text-sm">
                    {step.description.map((point, idx) => (
                      <li key={idx}>
                        <p className="flex items-start justify-start gap-2">
                          <span>{<Dot />}</span>
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>
            {/* Render an arrow if it's not the last step */}
            {index < steps.length - 1 && (
              <div className="text-primary flex justify-center items-center mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-10 h-10 text-gray-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
