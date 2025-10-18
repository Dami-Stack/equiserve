import React, { useEffect, useState } from "react";
import {
  CareerBlock,
  Contact,
  Disclaimer,
  SubpageHero,
  Values,
} from "../components";
import {
  flashPointLegal,
  guild,
  jpj,
  neville,
  sustainability1,
  sustainability2,
} from "../assets/images";

const Advisors = () => {
  const [pageConfig, setPageConfig] = useState({
    bgImage:
      "https://cdn.pixabay.com/photo/2016/09/28/08/33/town-sign-1699981_1280.jpg",
    header: "Our Trusted Partners",
  });

  // Smooth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const advisors = [
    {
      title: "Financial Adviser",
      logo: guild, // Guild Financial logo
      content: [
        {
          title: "Company",
          content: "Guild Financial Advisory Limited",
        },
        {
          title: "Address",
          content: "382 Russell Court	Woburn Place, London WC1H 0NH",
        },
        {
          title: "Email Address",
          content: "tomas.klaassen@guildfin.co.uk",
        },
        {
          title: "Phone Number",
          content: "07834 458 095",
        },
      ],
    },
    {
      title: "Registrar",
      logo: neville, // Neville Registrars logo
      content: [
        {
          title: "Company",
          content: "Neville Registrars Limited",
        },
        {
          title: "Address",
          content: "Neville House Steelpark Road Halesowen B62 8HD",
        },
        {
          title: "Email Address",
          content: "info@nevilleregistrars.co.uk",
        },
        {
          title: "Phone Number",
          content: "0121 585 1131",
        },
      ],
    },
    // {
    //   title: "Trading Platform",
    //   logo: jpj,
    //   content: [
    //     {
    //       title: "Company",
    //       content: "JP Jenkins",
    //     },
    //     {
    //       title: "Address",
    //       content: "5th Floor 101 Wigmore St London W1U 1QU",
    //     },
    //     {
    //       title: "Email Address",
    //       content: "info@jpjenkins.com",
    //     },
    //     {
    //       title: "Phone Number",
    //       content: "0207 469 0937",
    //     },
    //   ],
    // },
    {
      title: "Solicitors",
      logo: flashPointLegal,
      content: [
        {
          title: "Company",
          content: "The Flashpoint Legal",
        },
        {
          title: "Address",
          content: "Manor Royal, Crawley RH10 9LU West Sussex",
        },
        {
          title: "Email Address",
          content: "admin@flashpointlegal.com",
        },
        {
          title: "Phone Number",
          content: "0203 916 6049",
        },
      ],
    },
  ];

  return (
    <div className="z-10 relative bg-white overflow-x-hidden">
      {/* Hero section */}
      <SubpageHero
        bgImage={pageConfig?.bgImage}
        config={pageConfig}
        hideCta={true}
      />

      {/* Partners Introduction */}
      <div className="px-6 md:px-10 lg:px-[80px] w-full flex flex-col items-center py-12 bg-white">
        <div className="text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-110 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-700">
            We value our partners and work closely with industry-leading
            professionals to ensure the highest standards of service and
            expertise for our clients.
          </p>
        </div>
      </div>

      {/* Contact details */}
      <div className="px-6 md:px-10 lg:px-[80px] w-full flex flex-col items-center py-16 bg-[#FAF9F4]">
        {advisors?.map((advisor, index) => {
          return (
            <div
              key={index}
              className={`${
                (index === 1 || index === 3) &&
                "py-8 my-8 border-y border-y-primary-110"
              } flex flex-col gap-6 w-full max-w-4xl`}
            >
              {/* Title and Logo Section */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-primary-110 mb-2">
                    {advisor?.title}
                  </h3>
                </div>
                {advisor?.logo && (
                  <div className="">
                    <img
                      src={advisor.logo}
                      alt={`${advisor.content[0]?.content} logo`}
                      className="h-12 md:h-16 w-auto object-contain"
                      onError={(e) => {
                        // Fallback if logo fails to load
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content Details */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                {advisor?.content?.map((singleContent, contentIndex) => {
                  return (
                    <div
                      key={contentIndex}
                      className={`w-full flex-col md:flex-row flex gap-3 justify-between items-start md:items-center ${
                        contentIndex !== advisor.content.length - 1
                          ? "mb-4 pb-4 border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="font-bold text-gray-800 md:w-1/3 flex-shrink-0">
                        {singleContent?.title}:
                      </div>
                      <div className="text-gray-700 md:w-2/3 md:text-right">
                        {singleContent?.title === "Email Address" ? (
                          <a
                            href={`mailto:${singleContent?.content}`}
                            className="text-primary-110 hover:underline"
                          >
                            {singleContent?.content}
                          </a>
                        ) : singleContent?.title === "Phone Number" ? (
                          <a
                            href={`tel:${singleContent?.content}`}
                            className="text-primary-110 hover:underline"
                          >
                            {singleContent?.content}
                          </a>
                        ) : (
                          singleContent?.content
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <Disclaimer />
    </div>
  );
};

export default Advisors;
