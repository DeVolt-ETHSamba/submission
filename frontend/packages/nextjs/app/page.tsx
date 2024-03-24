"use client";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import GetUserGeolocationDialog from "~~/components/GetUserGeolocationDialog";
import HomeHeroSection from "~~/components/HomeHeroSection";
import MapSectionHomepage from "~~/components/MapSectionHomepage";
import { LocationProvider, useLocation } from "~~/contexts/LocationContext";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  return (
    <LocationProvider>
      <ToastContainer stacked theme='colored' position='top-center'/>
      <GetUserGeolocationDialog />
      <div className="my-16 w-full flex flex-col md:grid-cols-2 gap-4">
        <div className="mx-auto md:w-10/12 w-11/12">
          <HomeHeroSection />
          <div className="md:col-span-5 md:row-span-1 md:col-start-1 md:row-start-3 mt-6">
            <MapSectionHomepage />
          </div>
        </div>
      </div>
    </LocationProvider>
  );
};

export default Home;
