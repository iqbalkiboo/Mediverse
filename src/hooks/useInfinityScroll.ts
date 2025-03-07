import { useEffect } from 'react';

const useInfiniteScroll = (
  callback: () => void,
  isLimitPage: boolean,
  isFetching: boolean,
  setIsFetching: (value: boolean) => void,
  dispatchAction: any
) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScrollTo);
    return () => window.removeEventListener('scroll', handleScrollTo);
  }, []);

  useEffect(() => {
    // don't fetching when totalPage limited
    if (!isFetching || isLimitPage) return;
    callback();
    dispatchAction();
  }, [isFetching, isLimitPage]);

  const handleScrollTo = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      (document.documentElement.offsetHeight || isFetching)
    )
      return;

    // handle when metadata.totalPage already limit
    isLimitPage ? setIsFetching(false) : setIsFetching(true);
  };
};

export default useInfiniteScroll;
