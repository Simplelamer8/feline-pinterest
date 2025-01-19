import { addToFavourite, CatInterface } from "@/redux/slices/catsSlice";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./FavouriteCat.module.css";
import Heart from "@/app/ImageComponents/Heart";
import HoverHeart from "@/app/ImageComponents/HoverHeart";

export const FavouriteCat = forwardRef<HTMLDivElement, CatInterface>((props, ref) => {
    const dispatch = useDispatch();
    const { id, url, favourite } = props;
  
    const [isHovered, setIsHovered] = useState(false);
    const [isDisappearing, setIsDisappearing] = useState(false);
  
    const toggleFavourite = () => {
      if (favourite) {
        setIsDisappearing(true);
  
        setTimeout(() => {
          dispatch(addToFavourite(id));
          setIsDisappearing(false);
        }, 300);
      } else {
        dispatch(addToFavourite(id));
      }
    };
  
    return (
      <div
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        className={`${styles.CatCard} ${isDisappearing ? styles.fadeOut : ""}`}
      >
        <img src={url} alt="" className="w-full h-full" />
        {isHovered ? (
          favourite ? (
            // <HoverHeart onClick={toggleFavourite} className="absolute bottom-5 right-5" />
            <div onClick={toggleFavourite} className="absolute bottom-5 right-5">
              <HoverHeart/>
            </div>
          ) : (
            // <Heart onClick={toggleFavourite} className="absolute bottom-5 right-5" />
            <div onClick={toggleFavourite} className="absolute bottom-5 right-5">
              <Heart/>
            </div>
          )
        ) : null}
        <div ref={ref}></div>
      </div>
    );
  });
  