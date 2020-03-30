import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

export default function ImageCarousel({ photos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setIsAnimating] = useState(false);

  const slides = photos.map((photoUrl, index) => {
    return (
      <CarouselItem
        key={photoUrl}
        onExiting={() => setIsAnimating(true)}
        onExited={() => setIsAnimating(false)}
      >
        <img
          src={photoUrl}
          alt={`Slide ${index + 1}`}
          className="w-100 business-details-image"
        />
      </CarouselItem>
    );
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className="photo-carousel"
    >
      {slides}

      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  )
}
