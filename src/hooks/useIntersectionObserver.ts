import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { rootMargin = "0px", threshold = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
