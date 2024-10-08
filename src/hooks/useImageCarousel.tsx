import { useRef, useState } from 'react';
export const useImageCarousel = (data: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingImages, setLoadingImages] = useState<boolean[]>(Array(data.length).fill(false));

  const viewWidthRef = useRef(0);
  const [layoutMeasured, setLayoutMeasured] = useState(false);

  const handlePostImageLoadStart = (index: number) => {
    setLoadingImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handlePostImageLoadEnd = (index: number) => {
    setLoadingImages((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };
  const onLayout = (event: any) => {
    if (!layoutMeasured) {
      const { width } = event.nativeEvent.layout;
      viewWidthRef.current = width;
      setLayoutMeasured(true);
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(offsetX / viewWidthRef.current);
    setCurrentSlide(slideIndex);
  };

  return {
    currentSlide,
    handleScroll,
    viewWidthRef,
    loadingImages,
    handlePostImageLoadStart,
    handlePostImageLoadEnd,
    onLayout,
  };
};
