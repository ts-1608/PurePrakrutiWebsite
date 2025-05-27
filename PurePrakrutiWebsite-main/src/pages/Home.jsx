import React, { useState, } from 'react';
import rajesh from '../resource/rajesh.jpg';
import result1 from '../resource/Screenshot1.png';
import result2 from '../resource/Screenshot2.png';
import result3 from '../resource/Screenshot3.png';
import result4 from '../resource/Screenshot4.png';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";

const faqs = [
  {
    question: "What is Pure Prakruti?",
    answer: "We offer comprehensive support to all of our users, including setup assistance, user training, and ongoing customer service. Our team is dedicated to ensuring that your experience with Pure Prakruti is seamless and that you are empowered to make data-driven decisions that positively impact your business and the environment. ​​",
  },
  {
    question: "Can Pure Prakruti help my business comply with environmental regulations?",
    answer: "Yes, it provides compliance tracking, reporting tools, and expert guidance to help businesses meet regulations.",
  },
  {
    question: "Is Pure Prakruti suitable for small and medium-sized enterprises (SMEs)?",
    answer: "We offer comprehensive support, including setup assistance, training, and customer service to help SMEs manage their impact effectively.",
  },
  {
    question: "What support does Pure Prakruti provide to users?",
    answer: "We provide ongoing support, user training, and assistance to help users make the most of our platform.",
  },
  {
    question: "How does emission tracking work?",
    answer: "Our platform calculates emissions based on input data, providing detailed reports and insights to help businesses reduce their footprint.",
  },
];


export const Home = () => {
  // const [carbonFootprintData, setCarbonFootprintData] = useState([]);
  // const { setUser, setIsLoggedIn, user } = useContext(AuthContext);
  // const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const testimonials = [
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh, // Replace with actual image URL
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh,
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh,
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh,
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh,
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
    {
      name: "Alex M.",
      role: "Logistics Manager",
      image: rajesh,
      text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30% and are now fully aligned with global standards. This has made a huge impact on both our operational efficiency and environmental responsibility.",
    },
  ];


  const steps = [
    {
      step: "Step 1: Sign Up",
      points: [
        "Register your account using your username and mobile number.",
        "Verify your mobile number by entering the OTP sent to you.",
        "Create a secure PIN and confirm it to proceed.",
        "Review and accept the terms and conditions to complete the registration process.",
      ],
      image: result1,
    },
    {
      step: "Step 2: Log In",
      points: [
        "To access your account, enter your registered mobile number and PIN.",
      ],
      image: result2,
    },
    {
      step: "Step 3: Enter Details",
      points: [
        "Provide your vehicle number, source and destination pincodes, and the weight of the goods.",
        "GSTIN, mobilized distance, and demobilized distance are optional fields.",
      ],
      image: result3,
    },
    {
      step: "Step 4: Print Certificate",
      points: [
        "View your carbon footprint and print your certificate.",
        "Download certificate",
        "Share with friends",
      ],
      image: result4,
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-green-50 min-h-screen w-screen">
      {/* Hero Section */}
      <header className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Pure Prakruti: Sustainable Logistics for a Better Tomorrow
          </h1>
          <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Join the revolution in road logistics by reducing carbon emissions
            and ensuring compliance with global environmental standards.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <button className="bg-green-800 py-3 px-10 rounded-lg text-white hover:bg-green-700 transition-all transform hover:scale-105">
              Explore Our Solutions
            </button>
            <button className="border-2 border-white py-3 px-10 rounded-lg text-white hover:bg-green-700 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </header>


      {/* About Us Section */}
      <section className="py-6 bg-white">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 ">
          <div className=" mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 sm:my-8 p-4 sm:p-6  ">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 ">
              About Pure Prakruti
            </h2>
            <p className="mt-4 text-base sm:text-lg text-green-900 text-center p-2">
              Pure Prakruti is your partner in building a sustainable future. Focused on the road logistics industry, responsible for 27% of global emissions, we offer tools and insights to help businesses reduce their carbon footprint. Together, we can make a meaningful impact on climate change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6">
            {/* Mission Section */}
            <div className="bg-green-200 p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Mission</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Our mission is to offer innovative technologies and services that allow logistics companies to track, analyze, and reduce their carbon emissions. We are dedicated to empowering businesses to adopt more sustainable practices and drive the shift toward a zero-carbon future.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-green-200 p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Vision</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Our vision is to be a global leader in green logistics, providing innovative solutions that not only reduce emissions but also help businesses thrive in an eco-conscious world.
              </p>
            </div>

            {/* Values Section */}
            <div className="bg-green-200 p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Values</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                We believe in integrity, innovation, and collaboration. Our core values drive us to provide transparent and impactful solutions that not only meet our client's needs but also contribute to a sustainable planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 bg-green-50 ">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 ">
          <div className=" mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 sm:my-8 p-4 sm:p-6  ">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Emission Tracking</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Measure and monitor your carbon emissions in real-time, giving you actionable insights to reduce them.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Custom Solutions</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Tailored recommendations to optimize your logistics operations and reduce your environmental impact.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">CBAM Compliance</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Ensure compliance with the EU Carbon Border Adjustment Mechanism and other global regulations.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Environmental Awareness</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Educational resources to help your team understand the environmental impact of road logistics.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Interactive Dashboard</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                A user-friendly dashboard to track progress and implement sustainable logistics strategies.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 text-center">Data-Driven Insights</h3>
              <p className="mt-2 text-sm sm:text-base text-black text-center">
                Leverage advanced analytics to identify areas for improvement and measure your impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-6 bg-white">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className=" mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 sm:my-8 p-4 sm:p-6  ">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-green-200 p-4 sm:p-6 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}







      <section className="py-6 bg-white">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 sm:my-8 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700">
              What Our Users Say
            </h2>
          </div>

          {/* Scrollable Wrapper */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 p-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-green-200 p-4 sm:p-6 rounded-lg shadow-md flex-shrink-0 transform transition-all hover:scale-105 hover:shadow-xl w-full sm:w-1/2 md:w-1/3"

                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-green-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>





      <section className="py-6 bg-white">
        {/* Header Section */}
        <div className="text-center mb-10 bg-green-100 p-6">
          <h2 className="text-lg text-gray-600">Explore the</h2>
          <h1 className="text-3xl font-bold text-green-700">Pure Prakruti App</h1>
          <p className="text-gray-700">Track with Ease</p>
          <button
            onClick={() => window.location.href = "https://play.google.com/store/apps/details?id=com.nitishco2e.twico2ecalculator"}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Download Now
          </button>
        </div>


        {/* Carousel Section */}
        <div className="relative flex flex-col items-center justify-center p-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-72 top-1/2 -translate-y-1/2 p-2 bg-gray-400 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Content Wrapper */}
          <div className="p-6 rounded-lg flex flex-col md:flex-row items-center max-w-3xl w-full mx-auto bg-green-100">
            {/* Text Section */}
            <div className="w-full md:w-1/2 items-start">
              <h2 className="text-xl font-semibold text-green-700">
                {steps[currentIndex].step}
              </h2>
              <ul className="mt-2 list-disc list-outside pl-6 text-gray-700">
                {steps[currentIndex].points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-1/2 flex justify-center">
              <img
                src={steps[currentIndex].image}
                alt="Step"
                className="max-w-full h-64 md:h-80 rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-72 top-1/2 -translate-y-1/2 p-2 bg-gray-400 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </section>




      <section className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Frequently asked questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-green-100  text-green-700 font-semibold text-left rounded-lg "
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-700" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4  text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};