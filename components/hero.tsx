"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const AnimatedBlob = ({
  className,
  size = "w-64 h-64",
  delay = 0,
  duration = 20,
  blur = "blur-3xl",
  initialX,
  initialY,
  animate,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "absolute rounded-full",
        isDark ? "opacity-30 bg-primary/40" : "opacity-50 bg-primary/60",
        size,
        blur,
        className
      )}
      initial={{
        x: initialX,
        y: initialY,
      }}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export function Hero() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden bg-background min-h-[650px] lg:min-h-[750px]">
      {/* Blue blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large blob left */}
        <AnimatedBlob
          size="w-96 h-96"
          blur="blur-3xl"
          initialX="-20%"
          initialY="10%"
          animate={{ x: "-10%", y: "15%" }}
          delay={0}
          duration={15}
        />

        {/* Medium blob right top */}
        <AnimatedBlob
          size="w-64 h-64"
          blur="blur-2xl"
          initialX="75%"
          initialY="-10%"
          animate={{ x: "70%", y: "0%" }}
          delay={2}
          duration={18}
        />

        {/* Small blob bottom left */}
        <AnimatedBlob
          size="w-24 h-24"
          blur="blur-xl"
          initialX="10%"
          initialY="80%"
          animate={{ x: "15%", y: "75%" }}
          delay={1}
          duration={12}
        />

        {/* Small blob bottom right */}
        <AnimatedBlob
          size="w-40 h-40"
          blur="blur-2xl"
          initialX="80%"
          initialY="70%"
          animate={{ x: "85%", y: "65%" }}
          delay={3}
          duration={20}
        />
      </div>

      {/* Simple background with subtle pattern - reduced opacity for better visibility of blobs */}
      <div className="absolute inset-0 bg-grid-small-black/[0.1] -z-10" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center space-y-10 max-w-5xl mx-auto">
        {/* Simple announcement banner */}
        <div className="bg-muted py-2 px-4 rounded-full text-sm font-medium">
          🌟 Welcome to Eyelink
        </div>

        {/* Main headline with subtle animation */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bridging Hearts
          </h1>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Paving Ways to Inclusivity
          </h1>
        </motion.div>

        <p className="text-xl font-medium text-muted-foreground max-w-2xl">
          Making life more accessible and inclusive for differently-abled
          individuals.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          Experience seamless communication, accessible transportation, and
          dedicated care, all in one place. Eyelink is your all-in-one solution
          to break down barriers and empower differently-abled people to live
          fuller, more connected lives.
        </p>

        <motion.div
          className="flex flex-wrap gap-6 mt-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-3 font-medium hover:scale-105 transition-transform"
            onClick={() => router.push("/sign-up")}
          >
            Get Started Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group text-lg px-8 py-3 flex items-center gap-2"
            onClick={() => router.push("/about")}
          >
            Learn More
            <ChevronRight className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
