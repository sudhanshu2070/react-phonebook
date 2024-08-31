import { useEffect, useRef, useState } from 'react';

function useLazyBackgroundImage(defaultImage: string, lazyImage: string) {
  const [image, setImage] = useState(defaultImage);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImage(lazyImage);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [lazyImage]);

  return [image, elementRef] as const;
}

export default useLazyBackgroundImage;