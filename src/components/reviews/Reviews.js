import { useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

import React from "react";

const Reviews = ({ getSingleMovie, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getSingleMovie(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await axios.post("http://localhost:8080/api/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} width={500} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews && reviews.length
            ? reviews.map((review) => {
                return (
                  <>
                    <Row>
                      <Col>{review.body}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </>
                );
              })
            : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
