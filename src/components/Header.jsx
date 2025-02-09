"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import SvgComponent from "@/components/svg/Instagramsvg";
import Writesvg from "./svg/writesvg";
import Viewsvg from "./svg/Viewsvg";

const steps = [
  {
    id: "/manage-projects/pick-projects",
    label: "Pick Projects",
    icon: <SvgComponent />,
  },
  {
    id: "/manage-projects/add-details",
    label: "Add Details",
    icon: <Writesvg />,
  },
  {
    id: "/manage-projects/preview",
    label: "Preview",
    icon: <Viewsvg />,
  },
];

const Header = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="sticky top-0 bg-electric-blue p-4 text-white shadow-lg">
      <div className="flex items-center justify-around">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Marker */}
            <div className="flex flex-col items-center px-10">
              {/* SVG Icon */}
              {/* <Image
                src={step.icon}
                alt={`${step.label} Icon`}
                width={32}
                height={32}
                className={`w-5 h-5 transition-all duration-300 ${
                  pathname === step.id ? "text-lime-yellow" : "text-white"
                }`}
                style={{
                  filter:
                    pathname === step.id
                      ? "invert(81%) sepia(66%) saturate(316%) hue-rotate(7deg) brightness(97%) contrast(104%)" // Yellow color filter
                      : "invert(100%)", // White color filter
                }}
              /> */}

<div
  className={`w-5 h-5 transition-all duration-300 mr-4 ${
    pathname === step.id ? "text-lime-yellow" : "text-white"
  }`}
>
  {step.icon}
</div>


              {/* Step Label */}
              <span
                className={`mt-2 transition-all duration-300 font-apfel-grotezk-regular ${
                  pathname === step.id
                    ? "text-lime-yellow "
                    : "text-gray-300"
                }`}
              > 
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[0.95px] mx-2 transition-all duration-300 ${
                  pathname === step.id || pathname === steps[index + 1].id
                    ? "bg-[#CBCBCB] opacity-75"
                    : "bg-gray-400"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Header;

