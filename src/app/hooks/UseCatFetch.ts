"use client";
import { CatInterface, CatsInterface, setCats } from "@/redux/slices/catsSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UseCatFetch(pageNumber: number) {
  const dispatch = useDispatch();
  const cats = useSelector(
    (state: { catsSlice: CatsInterface }) => state.catsSlice.cats
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancel: any | null = null;
    const getBooks = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/search`,
          {
            headers: {
              "x-api-key":
                "live_ov4Kjoo4fpXY3dENX76TNZe0YCVeJvorh5o4H1abQNd8s9Iuvwo4pdvWlx8zhFAi",
            },
            params: {
              limit: 15,
              page: pageNumber,
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );
        console.log(response);
        const modifiedResponseCats = response.data.map(
          (element: CatInterface) => {
            const { id, url } = element;
            return { id, url, favourite: false };
          }
        );
        const combinedResponse = [...cats, ...modifiedResponseCats];
        const uniqueResponse = Array.from(
          new Map(combinedResponse.map((cat) => [cat.id, cat])).values()
        )
        dispatch(setCats(uniqueResponse));
        setHasMore(response.data.length > 0);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (axios.isCancel(error)) {
          return;
        }
        setLoading(false);
        setError(true);
      }
    };
    getBooks();
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, hasMore };
}
export default UseCatFetch;