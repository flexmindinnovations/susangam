"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from "@nextui-org/link";
import { Facebook, Twitter } from 'lucide-react';
import logo from '../../../public/icon/logo_white.png';

const Footer = () => {
  const handleFooterLinkClick = (link: any) => {
    console.log(`${link} clicked`);
  };

  const links = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: './contact' },
    // { label: 'Blog', href: './blog' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-600 w-auto min-h-60 py-4">
      <div className="footer-container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        <div className="logo flex items-center justify-center mb-4 md:mb-0">
          <Image
            src={logo}
            alt="brand"
            className="h-16 w-24 md:h-24 md:w-32 object-fill"
          />
        </div>
        <div className="brand-links flex flex-col md:flex-row gap-4">
          <ul className="flex flex-col md:flex-row gap-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="cursor-pointer text-white hover:underline">
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="_social_media_links">
          <ul className="flex gap-6">
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
        <div className="_terms w-full py-1 px-1">
          <ul className="flex flex-col md:flex-row gap-4">
            <li onClick={() => handleFooterLinkClick('termsAndConditions')} className="cursor-pointer text-white hover:underline">
              <p>Terms & Conditions</p>
            </li>
            <li onClick={() => handleFooterLinkClick('privacyPolicy')} className="cursor-pointer text-white hover:underline">
              <p>Privacy Policy</p>
            </li>
            <li onClick={() => handleFooterLinkClick('refundPolicy')} className="cursor-pointer text-white hover:underline">
              <p>Refund Policy</p>
            </li>
          </ul>
        </div>
      </div>
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
