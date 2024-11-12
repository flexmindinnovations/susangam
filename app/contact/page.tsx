
"use client"
import React from 'react';
import { utility } from "@/app/utility/utils";
import { Mail, Phone, MapPin } from 'lucide-react'; 
import LocationLocatorMap from '@/app/components/location/location';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page flex flex-col lg:flex-row">
      <div className="content p-6 w-full lg:w-1/2 bg-white shadow-lg rounded-lg">
        <section className="register">
          <div className="container py-10 flex flex-col items-center">
            <h2 className="h1-gradient text-3xl font-bold mb-4 text-center">Contact Us</h2>
            <ul className="flex flex-col gap-6 w-full max-w-md mx-auto">
              <li className="flex items-center gap-4">
                <Mail className="text-blue-500 mr-2" size={24} />
                <p>
                  <span className="email-label font-semibold">Email: </span>
                  <a href="mailto:contact@susangam.com" className="text-blue-600 hover:underline">contact@susangam.com</a>
                </p>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-blue-500 mr-2" size={24} />
                <p>
                  <span className="contact-label font-semibold">Contact No: </span>
                  <span>9356989643</span>
                </p>
              </li>
              <li className="flex gap-4">
                <MapPin className="text-blue-500 mr-2" size={40} />
                <p className="flex flex-col sm:flex-row">
                  <span className="address-label font-semibold">Address:</span>
                  <span>{` ${utility.domain} Matrimonial Services, C/O - Cherry Spray School, Next to Welcome Hall, Kondhwa Khurd, Pune-411048`}</span>     
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="location-container w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
      <LocationLocatorMap />
      </div>
    </div>
  );
};

export default ContactPage;
