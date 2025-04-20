import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";
import Link from "next/link";
import { motion } from "framer-motion";
// import {
//   SiTypescript,
//   SiJavascript,
//   SiNodemon,
//   SiNodedotjs,
//   SiMongodb,
//   SiNextdotjs,
//   SiReact,
//   SiTailwindcss,
//   SiEslint,
//   SiRedis,
//   SiJsonwebtokens,
//   SiMaildotru,
//   SiOpenjdk,
//   SiReactrouter,
//   SiFramer,
//   SiGithub,
//   SiVite,
//   SiFirebase,
// } from "react-icons/si";
// import React, { JSX } from "react";
// const stackIcons: Record<string, JSX.Element> = {
//   typescript: <SiTypescript className="text-blue-500" />,
//   javascript: <SiJavascript className="text-yellow-500" />,
//   nodemon: <SiNodemon className="text-green-500" />,
//   nodejs: <SiNodedotjs className="text-green-600" />,
//   mongodb: <SiMongodb className="text-green-700" />,
//   nextjs: <SiNextdotjs className="text-white" />,
//   react: <SiReact className="text-blue-400" />,
//   swr: <SiReact className="text-cyan-500" />,
//   tailwindcss: <SiTailwindcss className="text-teal-400" />,
//   eslint: <SiEslint className="text-purple-500" />,
//   redis: <SiRedis className="text-red-500" />,
//   jwt: <SiJsonwebtokens className="text-orange-500" />,
//   mongoose: <SiMongodb className="text-green-700" />,
//   nodemailer: <SiMaildotru className="text-red-500" />,
//   java: <SiOpenjdk className="text-red-500" />,
//   "react-router": <SiReactrouter className="text-red-600" />,
//   "framer-motion": <SiFramer className="text-pink-500" />,
//   "gh-pages": <SiGithub className="text-gray-700" />,
//   vite: <SiVite className="text-purple-500" />,
//   firebase: <SiFirebase className="text-orange-500" />,
// };

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  artist,
  header,
  index,
}: {
  className?: string;
  title?: string | React.ReactNode;
  artist: string;
  header?: React.ReactNode;
  index?: number;
}) => {
  return (
    <Link
      href={``}
      target="_blank"
      className={cn(
        "relative row-span-1 rounded-xl group/bento group hover:shadow-xl transition duration-200 shadow-input p-4   border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <GlowingEffect disabled={false} glow={true} />
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <motion.div
          className="font-sans font-bold text-gray-300 mb-2 mt-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.div>

        <motion.div
          className="font-sans font-normal text-gray-300 text-xs"
          initial={{
            opacity: 0,
            x: index !== undefined && index % 2 === 0 ? -40 : 40,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {artist}
        </motion.div>
      </div>
    </Link>
  );
};
