'use client'
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ProtectedRoute from "@/app/ProtectedRoute";
import Header from "@/app/components/Header";

type Review = {
  id: string;
  reviewer: string;
  date: string;
  rating: number;
  text: string;
  response?: string;
};

const reviewsData: Review[] = [
  {
    id: "1",
    reviewer: "Rajesh Kumar",
    date: "6 Oct 2025",
    rating: 4,
    text: "Amazing venue! The staff was very professional and the arrangements were perfect. Highly recommend for weddings.",
    response: "Thank you so much for your kind words. We are glad you had a wonderful experience.",
  },
  {
    id: "2",
    reviewer: "Priya Singh",
    date: "5 Oct 2025",
    rating: 4,
    text: "Amazing venue! The staff was very professional and the arrangements were perfect. Highly recommend for weddings.",
    // no response yet
  },
  {
    id: "3",
    reviewer: "Ankit Sharma",
    date: "3 Oct 2025",
    rating: 4,
    text: "Amazing venue! The staff was very professional and the arrangements were perfect. Highly recommend for weddings.",
    // no response yet
  },
];

// Ratings summary
const totalReviews = 30;
const avgRating = 4.0;
const ratingsBreakdown = [
  { stars: 5, count: 1 },
  { stars: 4, count: 29 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const RatingsReviews: React.FC = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const handleResponse = (id: string, response: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, response }
          : r
      )
    );
    setRespondingId(null);
  };

  return (
    <ProtectedRoute requiredRole={['venue_owner', 'service_vendor']}>
      <>
        <Header title="Ratings & Reviews" />
        <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#eeeff9]">
          <main className="px-6 py-8  mx-auto">
            {/* Ratings Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-4xl font-bold text-[#7d7cd3]">{avgRating.toFixed(1)}</div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        width="22"
                        height="22"
                        fill={star <= avgRating ? "#FFB400" : "#E5E7EB"}
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,2 12.5,7.6 18.5,8.1 14,12.2 15.3,18 10,15 4.7,18 6,12.2 1.5,8.1 7.5,7.6" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">Based on {totalReviews} reviews</div>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {ratingsBreakdown.map((r, i) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="w-9 text-xs text-gray-600">{r.stars} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded relative">
                        <div
                          className="absolute left-0 top-0 h-2 bg-[#7d7cd3] rounded"
                          style={{
                            width:
                              totalReviews > 0
                                ? `${(r.count / totalReviews) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                      <span className="w-5 text-xs text-gray-600 text-right">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{review.reviewer}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg
                          key={star}
                          width="18"
                          height="18"
                          fill={star <= review.rating ? "#FFB400" : "#E5E7EB"}
                          viewBox="0 0 20 20"
                        >
                          <polygon points="10,2 12.5,7.6 18.5,8.1 14,12.2 15.3,18 10,15 4.7,18 6,12.2 1.5,8.1 7.5,7.6" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                  <div className="mb-3">{review.text}</div>

                  {/* Response logic */}
                  {review.response ? (
                    <div className="bg-[#f5f5fa] text-[#7d7cd3] rounded-md p-3 text-sm">
                      <span className="font-semibold">Your response:</span> {review.response}
                    </div>
                  ) : respondingId === review.id ? (
                    <Formik
                      initialValues={{ response: "" }}
                      onSubmit={(values, actions) => {
                        handleResponse(review.id, values.response);
                        actions.setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-2">
                          <Field
                            as="textarea"
                            name="response"
                            rows={2}
                            placeholder="Write Your Response..."
                            className="w-full border rounded-lg p-2 resize-y"
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="px-4 py-2 rounded bg-[#7d7cd3] text-white font-semibold hover:bg-[#5b5ab7] transition"
                              disabled={isSubmitting}
                            >
                              Submit Response
                            </button>
                            <button
                              type="button"
                              onClick={() => setRespondingId(null)}
                              className="px-4 py-2 rounded border border-[#7d7cd3] text-[#7d7cd3] font-semibold hover:bg-[#e2e3f7] transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <button
                      onClick={() => setRespondingId(review.id)}
                      className="px-4 py-2 rounded bg-[#7d7cd3] text-white font-semibold hover:bg-[#5b5ab7] transition"
                    >
                      Respond
                    </button>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default RatingsReviews;