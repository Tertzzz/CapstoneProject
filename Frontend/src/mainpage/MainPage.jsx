import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero"; 
import Announcements from "../components/Announcements";
import About from "../components/About";
import Contacts from "../components/Contacts";


const MainPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Announcements />
      <About />
      <Contacts />
    </>
  );
};

export default MainPage;
