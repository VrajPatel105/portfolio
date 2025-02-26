"use client";

import { useEffect } from 'react';
import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { fixIOSScrolling, fixScrollToTop } from "@/lib/scrollUtils";

const Home = () => {
  useEffect(() => {
    // Apply scroll fixes
    fixIOSScrolling();
    fixScrollToTop();

    // Fix for the scroll-to-top issue
    const handleScrollToTop = () => {
      if (window.scrollY === 0) {
        document.documentElement.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleScrollToTop);

    // Handle initial hash in URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;