"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { popIn } from "@/utils/FramerMotionStyle";

const Navbar = () => {
  const { data: session } = useSession();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 60, duration: 0.5 }}
      className="header fixed top-0 w-full flex justify-center px-6 max-[350px]:px-2 bg-transparent backdrop-blur-sm z-50"
    >
      <div className="container_navlink flex items-center justify-center ml-auto">
        <div className="box_image my-2">
          {session && (
            <motion.button
              className="cursor-pointer bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:brightness-110 transition-colors duration-300 px-2 py-1 rounded-sm text-white text-sm font-bold flex items-center gap-2 shadow-md"
              initial="hidden"
              animate="visible"
              variants={popIn(0.8)}
              onClick={() => signOut()}
            >
              Sign Out
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
