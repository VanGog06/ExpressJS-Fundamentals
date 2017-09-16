import React from 'react';

const Review = (props) => (
  <div>
    <p><strong>User: </strong>{props.review.user}</p>
    {props.review.comment ? (
      <p><strong>Comment: </strong>{props.review.comment}</p>
    ) : ''}
    <p><strong>Rating: </strong>{props.review.rating}</p>
  </div>
);

export default Review;