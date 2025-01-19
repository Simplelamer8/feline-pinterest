import { addToFavourite, CatInterface } from "@/redux/slices/catsSlice";
import React, { forwardRef, useState } from "react";
// import Heart from "../../images/Heart.svg";
// import HoverHeart from "../../images/HoverHeart.svg";
import Heart from "@/app/ImageComponents/Heart";
import HoverHeart from "@/app/ImageComponents/HoverHeart";
import { useDispatch } from "react-redux";
import styles from "./Cat.module.css";
import Image from "next/image";

export const Cat = forwardRef<HTMLDivElement, CatInterface>((props, ref) => {
  const dispatch = useDispatch();
  const { id, url, favourite } = props;
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavourite = () => {
    return dispatch(addToFavourite(id));
  }
  console.log(Heart, HoverHeart);
  return (
    <div
      onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      className={styles.CatCard}
      // className="w-[225px] h-[225px] justify-self-center relative transition-all hover:scale-110"
    >
      <img src={url} alt="" className="w-full h-full" />
      {isHovered ? (
        favourite ? (
          // <img src={HoverHeart} alt="" width={48} height={48} onClick={toggleFavourite} className="absolute bottom-5 right-5" />
          <div onClick={toggleFavourite} className="absolute bottom-5 right-5">
            <HoverHeart/>
          </div>
        ) : (
          // <img src={Heart} alt="" width={48} height={48} onClick={toggleFavourite} className="absolute bottom-5 right-5" />
          <div onClick={toggleFavourite} className="absolute bottom-5 right-5">
            <Heart/>
          </div>
        )
      ) : null}
      <div className="mt-5" ref={ref}></div>
    </div>
  );
})
