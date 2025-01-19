import { CatsInterface } from "@/redux/slices/catsSlice";
import React from "react";
import { useSelector } from "react-redux";
import { FavouriteCat } from "../FavouritveCat/FavouriteCat";

export default function FavouriteCats() {
  const cats = useSelector(
    (state: { catsSlice: CatsInterface }) => state.catsSlice.cats
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-5 items-center p-5 sm:grid-cols-3 md:grid md:grid-cols-3 md:gap-10 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-5 xl:px-10 xl:gap-14">
        {cats.filter((cat) => cat.favourite).map((cat) => (
          <FavouriteCat
            key={cat.id}
            url={cat.url}
            id={cat.id}
            favourite={cat.favourite}
          />
        ))}
      </div>
    </>
  );
}
