import React, { useState } from 'react';

import { Button } from 'reactstrap';

export default function ReviewText({ text }) {
  const { width: screenWidth } = window.screen;
  let screenSize = 'extra small';
  if (screenWidth >= 576) screenSize = 'small';
  if (screenWidth >= 768) screenSize = 'medium';
  if (screenWidth >= 992) screenSize = 'large';

  let maxTextLength = 90;
  if (screenSize === 'small' || screenSize === 'medium') {
    maxTextLength = 150;
  } else if (screenSize === 'large') {
    maxTextLength = 200;
  }

  const [displayText, setDisplayText] = useState(text);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const [isToggleTextClicked, setIsToggleTextClicked] = useState(false);
  const [isTextTooLong] = useState(text.length > maxTextLength);

  if (!isToggleTextClicked && !isTextTruncated && isTextTooLong) {
    setDisplayText(`${text.slice(0, maxTextLength - 3)}...`);
    setIsTextTruncated(true);
  }

  const toggleDisplayText = () => {
    setDisplayText(isTextTruncated ? text : `${text.slice(0, maxTextLength - 3)}...`);
    setIsTextTruncated(!isTextTruncated);
    setIsToggleTextClicked(true);
  }

  return (
    <div className="d-flex flex-column align-items-start">
      <blockquote className="blockquote mb-0">
        <p className="mb-0 font-sm text-justify">
          {displayText}
        </p>
      </blockquote>

      {isTextTooLong && (
        <Button
          color="link"
          size="sm"
          onClick={toggleDisplayText}
          className="p-0"
        >
          <span className="font-sm">
            {isTextTruncated ? 'show more' : 'show less'}
          </span>
        </Button>
      )}
    </div>
  );
}
