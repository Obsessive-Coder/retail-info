import React from 'react';

import Rating from 'react-rating';

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReviewText } from './';

export default function BusinessReviews({
  googleUrl, rating, ratingsCount, reviews
}) {
  return (
    <div>
      <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-between align-items-center align-items-sm-end py-1 px-3 bg-darker">
        <div className="d-flex align-items-center">
          <Rating
            readonly
            emptySymbol={(
              <FontAwesomeIcon fixedWidth icon={farStar} size="lg" />
            )}
            fullSymbol={(
              <FontAwesomeIcon fixedWidth icon={faStar} size="lg" className="text-success" />
            )}
            placeholderSymbol={(
              <FontAwesomeIcon fixedWidth icon={farStar} size="lg" />
            )}
            placeholderRating={2.5}
            initialRating={rating}
            className="mx-sm-2"
          />

          <p className="mb-0 mx-2 business-rating">
            {rating}
          </p>
        </div>

        <div className="d-flex">
          <p className="mb-0 mx-2 font-sm">
            <span>{ratingsCount}</span>&nbsp;
            <span>Reviews</span>
          </p>

          <a
            href={googleUrl}
            target="_blank"
            className="mx-2 font-sm"
          >Write Review</a>
        </div>
      </div>

      <ListGroup flush>
        {reviews && reviews.map(review => (
          <ListGroupItem
            key={`${review.author_name}-${review.rating}-review`}
            className="my-2 bg-darker"
          >
            <ListGroupItemHeading className="d-flex align-items-center">
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                style={{ width: '32px', height: '32px' }}
              />

              <div className="d-flex flex-column align-items-start mx-3">
                <Rating
                  readonly
                  emptySymbol={<FontAwesomeIcon fixedWidth icon={farStar} size="xs" />}
                  fullSymbol={(
                    <FontAwesomeIcon fixedWidth icon={faStar} size="xs" className="text-success" />
                  )}
                  placeholderSymbol={<FontAwesomeIcon fixedWidth icon={farStar} size="xs" />}
                  placeholderRating={2.5}
                  initialRating={review.rating}
                  className="font-sm"
                />
                <small
                  className="font-xs text-left text-truncate reviewer-name"
                >{review.author_name}</small>
              </div>

              <span className="ml-auto font-xs">
                {review.relative_time_description}
              </span>
            </ListGroupItemHeading>

            <ListGroupItemText tag="div" className="mb-0">
              <ReviewText text={review.text} />
            </ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
