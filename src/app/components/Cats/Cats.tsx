"use client";
import { CatsInterface, incrementPageNumber } from "@/redux/slices/catsSlice";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cat } from "../Cat/Cat";

export default function Cats(props:{loading: boolean, error: boolean, hasMore:boolean}) {
  const { loading, error, hasMore } = props;
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver|null>(null);
  const lastCatRef = useCallback((node: any) => {
    if (loading)
    {
      return;
    }
    if (observer.current)
    {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore)
      {
        dispatch(incrementPageNumber());
      }
    })
    if (node)
    {
      observer.current.observe(node);
    }
  }, [loading, hasMore])

  const cats = useSelector(
    (state: { catsSlice: CatsInterface }) => state.catsSlice.cats
  );
  return (
    <>
      <div className="grid grid-cols-2 gap-5 items-center p-5 sm:grid-cols-3 md:grid md:grid-cols-3 md:gap-10 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-5 xl:px-10 xl:gap-14">
        {cats.map((cat, ind) => {
          if (ind + 1 === cats.length)
          {
            return <Cat
              ref={lastCatRef}
              key={cat.id}
              url={cat.url}
              id={cat.id}
              favourite={cat.favourite}
            />
          }
          return <Cat
            key={cat.id}
            url={cat.url}
            id={cat.id}
            favourite={cat.favourite}
          />
        })}
      </div>
      {error && <p>Упс! произошла ошибка :3</p>}
      {loading && <h3 className="mt-10 text-center">... загружаем еще котиков ...</h3>}
    </>
  );
}
