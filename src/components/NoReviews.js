import React from 'react';

export default function NoReviews({ googleUrl }) {
  return (
    <div>
      <h2 className="text-warning">No Reviews Available</h2>
        <p className="text-info">
          Consider following the link and scrolling down to write a Google review.
        </p>
        <a
          href={googleUrl}
          target="_blank"
        >Write Review</a>
    </div>
  );
}
