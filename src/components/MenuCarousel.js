import React, { Fragment, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

const images = require.context('../data/menus', true);

export default function MenuCarousel({ photos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setIsAnimating] = useState(false);

  const menuPhotos = photos.map(photoUrl => (
    images(`./${photoUrl}`)
  ));

  const slides = menuPhotos.map((photoUrl, index) => {
    return (
      <CarouselItem
        key={photoUrl}
        onExiting={() => setIsAnimating(true)}
        onExited={() => setIsAnimating(false)}
      >
        <img
          src={photoUrl}
          alt={`Slide ${index + 1}`}
          className="w-100 h-auto"
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
      interval={false}
      next={next}
      previous={previous}
      className="menu-carousel"
    >
      {slides}

      {slides.length > 1 && (
        <Fragment>
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
        </Fragment>
      )}
    </Carousel>
  )
}
