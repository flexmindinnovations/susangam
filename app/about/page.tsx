"use client";
import React from 'react';
import { Button } from "@nextui-org/react";
import { utility } from "@/app/utility/utils";
import image from '@/public/icon/temp_bg.jpg';
import './about.module.css'

const isLoggedIn: boolean = true;

const cardItems = [
    {
        id: 1,
        title: 'Mr. Sunil Patil',
        designation: 'Senior Pharmacist and Social Worker, Kolhapur',
        description: "Mr. Sunil Patil is a respected figure in the Kolhapur community, known for his dual roles as a Senior Pharmacist and a committed social worker. With a rich background in healthcare, Mr. Patil brings a compassionate and humanitarian approach to his work, always striving to improve the well-being of those around him. His deep-rooted involvement in social initiatives has earned him the admiration and trust of many. At Susangam.com, Mr. Patil's insights into healthcare and community welfare guide our efforts to create a supportive environment for all our users, ensuring their emotional and physical well-being are taken care of.",
        icon: ''
    },
    {
        id: 2,
        title: 'Mr. Akshay Kshirsagar',
        designation: 'Literary Scholar and Cultural Advocate, Satara',
        description: "A prominent figure in the literary circles of Satara, Mr. Akshay Kshirsagar holds a Bachelor of Arts in Literature and has dedicated his life to the promotion of arts and culture. His love for literature and storytelling not only enhances his understanding of human emotions but also equips him with a unique perspective on cultural sensitivity. Mr. Kshirsagar's involvement with Susangam.com helps us maintain a deep respect for the cultural backgrounds of our users, ensuring that our platform is a space where everyone's stories and traditions are valued and celebrated.",
        icon: ''
    },
    {
        id: 3,
        title: 'Mr. Neeraj Tickoo',
        designation: 'Senior Manager in MNC and NGO Activist, Delhi',
        description: "Mr. Neeraj Tickoo is a dynamic professional with extensive experience as a Senior Manager in a multinational corporation. His career in the corporate sector is paralleled by his passion for social activism, particularly his hands-on work with non-governmental organizations. Based in Delhi, Mr. Tickoo's blend of business acumen and grassroots activism brings a strategic and compassionate outlook to our advisory board. His commitment to social justice and community engagement is reflected in Susangam.com's initiatives to create a fair and equitable matrimonial service that caters to all, irrespective of social or economic backgrounds.",
        icon: ''
    },
    {
        id: 4,
        title: 'Mr. Suresh Devigowda',
        designation: 'Business Leader and Social Change Enthusiast, Kalaburagi',
        description: "A well-known business figure from Kalaburagi, Mr. Suresh Devigowda is celebrated for his entrepreneurial spirit and his dedication to social change. With a successful career in business, Mr. Devigowda understands the importance of innovation and adaptability. His enthusiasm for social betterment drives his involvement in various community projects aimed at upliftment and empowerment. At Susangam.com, Mr. Devigowda's leadership and vision help us strive for continuous improvement, ensuring that our platform remains user-friendly, inclusive, and at the forefront of promoting societal harmony.",
        icon: ''
    },
];

interface AboutUsProps {
    isMobile: boolean;
    isLoggedIn: boolean;
    domain: string;
}

const AboutUs: React.FC<AboutUsProps> = () => {

    const handleExploreProfiles = () => { /* Navigation code */ };
    const handleRegister = () => { /* Navigation code */ };

    return (
        <div className="content fullscreen">
            <div
                className="relative w-full h-[600px] md:h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image.src})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-75" />

                {/* Content */}
                <section className="relative z-10 flex flex-col items-center justify-center text-center h-full py-16 px-6 lg:px-10">
                    <h1 className="text-2xl lg:text-5xl font-semibold md:font-extrabold text-blue-700 mb-2 sm:mb-6">
                        Welcome to {utility.domain}.com
                    </h1>
                    <p className="mt-4 text-sm md:text-lg text-gray-400 leading-relaxed max-w-3xl md:max-w-5xl sm:text-base sm:mt-2 sm:px-4">
                        At {utility.domain}.com, we believe in the power of love transcending boundaries, cultures, and religions. Our
                        mission is to help people find their perfect life partners, regardless of their religious background. We aim
                        to create a platform that respects and celebrates the diversity of our users while upholding the values of
                        unity, understanding, and mutual respect.
                    </p>
                    <p className="mt-4 text-sm md:text-lg text-gray-400 leading-relaxed  max-w-3xl md:max-w-5xl sm:text-base sm:mt-2 sm:px-4">
                        To guide us in our mission, we are privileged to have a dedicated advisory board comprising individuals of
                        high repute and diverse backgrounds. Each member brings a wealth of knowledge, experience, and a commitment
                        to fostering harmony within our multi-religious community. Their insights and expertise are instrumental in
                        shaping our services and ensuring that we remain true to our core values of inclusivity and compassion.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-6 sm:gap-4">
                        {isLoggedIn ? (
                            <Button color="primary" variant="shadow" onClick={handleExploreProfiles}>
                                Explore Profiles
                            </Button>
                        ) : (
                            <Button variant="bordered" onClick={handleRegister}>
                                Register Now
                            </Button>
                        )}
                    </div>
                </section>
            </div>

            {/* Advisory Board Section */}
            <section className="flex flex-col items-center justify-center min-h-96 p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-purple-700 sm:text-xl">Our Advisory Board</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl gap-6 mt-6">
                    {cardItems.map((item) => (
                        <div
                            key={item.id}
                            className="card bg-white rounded-lg p-6 shadow hover:shadow-md transition ease-in-out duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="icon bg-purple-300 p-2 rounded-full">
                                    <i className="text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 sm:text-base">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
