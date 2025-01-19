"use client"
import { useSelector } from "react-redux";
import Cats from "./components/Cats/Cats";
import Navbar from "./components/Navbar/Navbar";
import { NavbarInterface } from "@/redux/slices/navbarSlice";
import FavouriteCats from "./components/FavouriteCats/FavouriteCats";
import { CatsInterface } from "@/redux/slices/catsSlice";
import UseCatFetch from "./hooks/UseCatFetch";

export default function Home() {
  const activeTab = useSelector((state: {navbarSlice: NavbarInterface}) => state.navbarSlice.activeTab);
  const cats = useSelector(
    (state: { catsSlice: CatsInterface }) => state.catsSlice.cats
  );
  const pageNumber = useSelector(
    (state: { catsSlice: CatsInterface }) => state.catsSlice.pageNumber
  );
  const { loading, error, hasMore } = UseCatFetch(pageNumber);
  
  return (
    <>
      <Navbar/>
      {
        activeTab === 1 ? 
        <Cats loading={loading} error={error} hasMore={hasMore} />
        :
        <FavouriteCats />
      }
    </>
  );
}
