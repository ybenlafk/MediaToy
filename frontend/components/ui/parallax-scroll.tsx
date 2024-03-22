"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/components/cn";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import PostPopUp from "@/app/components/Post/PostPopUp";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpData, setPopUpData] = useState(null as any);

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);
  if (isPopUpOpen && popUpData) {
    return (
      <PostPopUp
        title={popUpData.title}
        description={popUpData.description}
        imageUrl={popUpData.imageUrl}
        onClose={() => setIsPopUpOpen(false)}
      />
    );
  }
  return (
    <div
      className={cn("h-screen items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start w-full 2xl:w-[50%] mx-auto gap-10 pb-60 pt-10 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => {
                setIsPopUpOpen(true);
                setPopUpData({
                  title: "Title",
                  description: "Description",
                  imageUrl: el,
                });
          }}
            >
              <DirectionAwareHover imageUrl={el}>
               <div className="flex justify-center items-center gap-2">
                  <Image
                    src='/user.png'
                    alt="image"
                    width={150}
                    height={150}
                    className="rounded-full w-10 h-10"
                  />
                  <p className="text-md">Jane Doe</p>
                </div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div 
              style={{ y: translateSecond }} 
              key={"grid-2" + idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
            >
              <DirectionAwareHover imageUrl={el}>
                <div className="flex justify-center items-center gap-2">
                  <Image
                    src='/user.png'
                    alt="image"
                    width={150}
                    height={150}
                    className="rounded-full w-10 h-10"
                  />
                <p className="text-md">Jane Doe</p>
                </div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ y: translateThird }} 
              className="cursor-pointer"
              key={"grid-3" + idx}
            >
              <DirectionAwareHover imageUrl={el}>
                <div className="flex justify-center items-center gap-2">
                  <Image
                    src='/user.png'
                    alt="image"
                    width={150}
                    height={150}
                    className="rounded-full w-10 h-10"
                  />
                  <p className="text-md">Jane Doe</p>
                </div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
