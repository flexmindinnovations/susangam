import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Import the icons you need
import Footer from '../components/footer/page'

const domain = 'susangam';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <main className="content p-6">
        <section className="register">
          <div className="container py-10 flex flex-col items-center">
            <h1 className="h1-gradient text-3xl font-bold mb-4">Contact Us</h1>
            <ul className="flex flex-col gap-6 w-full max-w-2xl">
              <li className="flex items-center">
                <Mail className="text-blue-500 mr-2" size={24} />
                <p>
                  <span className="email-label font-semibold">Email: </span>
                  <a href="mailto:contact@susangam.com" className="text-blue-600 hover:underline">contact@susangam.com</a>
                </p>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-500 mr-2" size={24} />
                <p>
                  <span className="contact-label font-semibold">Contact No: </span>
                  <span>9356989643</span>
                </p>
              </li>
              <li className="flex items-center">
                <MapPin className="text-blue-500 mr-2" size={24} />
                <p className="flex flex-col sm:flex-row">
                  <span className="address-label font-semibold">Address:</span>
                  {` ${domain} Matrimonial Services, C/O - Cherry Spray School, Next to Welcome Hall, Kondhwa Khurd, Pune-411048`}
                </p>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    
  );
};

export default AboutPage;
