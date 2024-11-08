"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from "@nextui-org/link";
import { Facebook, Twitter } from 'lucide-react';
import logo from '@/public/icon/logo_white.png';

const Footer = () => {
  const handleFooterLinkClick = (link: any) => {
    console.log(`${link} clicked`);
  };

  const links = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: './contact' },
    { label: 'Blog', href: './blog' },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-900 w-auto min-h-60 py-6 transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-blue-900 hover:via-indigo-800 hover:to-purple-800">
      <div className="footer-container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 px-4">
        {/* Logo Section */}
        <div className="logo flex items-center justify-center mb-4 md:mb-0 w-full md:w-auto">
          <Image
            src={logo}
            alt="brand"
            className="h-16 w-24 md:h-24 md:w-32 object-fill mx-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="brand-links flex flex-col md:flex-row gap-4 md:w-auto">
          <ul className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {links.map((link, index) => (
              <li key={index} className="w-full md:w-auto">
                <Link href={link.href} className="cursor-pointer text-white hover:text-gray-300 hover:underline transition">
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="_social_media_links md:w-auto mt-4 md:mt-0">
          <ul className="flex gap-6 justify-center md:justify-start">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61558388064249&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <Facebook className="text-white h-6 w-6 hover:text-blue-500 transition" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Susangam_India"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
              >
                <Twitter className="text-white h-6 w-6 hover:text-blue-400 transition" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Terms & Conditions, Privacy Policy, Refund Policy */}
      <div className="_terms py-1 w-full px-1 mt-4 justify-center text-center">
        <ul className="flex flex-col md:flex-row gap-4 justify-center">
          <li onClick={() => handleFooterLinkClick('termsAndConditions')} className="cursor-pointer text-white hover:text-gray-300 hover:underline transition">
            <p>Terms & Conditions</p>
          </li>
          <li onClick={() => handleFooterLinkClick('privacyPolicy')} className="cursor-pointer text-white hover:underline hover:text-gray-300 transition">
            <p>Privacy Policy</p>
          </li>
          <li onClick={() => handleFooterLinkClick('refundPolicy')} className="cursor-pointer text-white hover:underline hover:text-gray-300 transition">
            <p>Refund Policy</p>
          </li>
        </ul>
      </div>

      {/* Copyright Notice */}
      <div className="_copyright w-full flex flex-col items-center justify-center mt-6">
        <p className="!text-xs text-white text-center my-2">
          This website is strictly for matrimonial purpose only and not a dating website.
        </p>
        <p className="!text-xs text-white text-center">
          Copyright © 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
