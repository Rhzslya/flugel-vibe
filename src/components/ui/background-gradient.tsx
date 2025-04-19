import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const [randomGradient, setRandomGradient] = useState<string>("");

  useEffect(() => {
    // Daftar warna gradien yang ingin digunakan
    const gradients = [
      "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F4D793,transparent),radial-gradient(circle_farthest-side_at_100%_0,#A7E3D4,transparent)]",
      "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F4D793,transparent),radial-gradient(circle_farthest-side_at_100%_0,#F2A9D7,transparent)]",
      "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F4D793,transparent),radial-gradient(circle_farthest-side_at_100%_0,#34A6A5,transparent)]",
      "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F4D793,transparent),radial-gradient(circle_farthest-side_at_100%_0,#9B77D1,transparent)]",
      "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F4D793,transparent),radial-gradient(circle_farthest-side_at_100%_0,#F4A261,transparent)]",
    ];

    // Pilih gradien acak dari daftar
    const randomIndex = Math.floor(Math.random() * gradients.length);
    setRandomGradient(gradients[randomIndex]);
  }, []);

  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[3px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-md z-[1] opacity-60 group-hover:opacity-100 blur transition duration-500 will-change-transform",
          randomGradient
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-md z-[1] will-change-transform",
          randomGradient
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
