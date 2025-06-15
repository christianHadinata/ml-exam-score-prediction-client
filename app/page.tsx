"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [studyHours, setStudyHours] = useState("");
  const [mentalHealthRating, setMentalHealthRating] = useState("");
  const [netflixHours, setNetflixHours] = useState("");
  const [socialMediaHours, setSocialMediaHours] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          study_hours_per_day: studyHours,
          mental_health_rating: mentalHealthRating,
          netflix_hours: netflixHours,
          social_media_hours: socialMediaHours,
          exercise_frequency: exerciseFrequency,
        }),
      });

      const data = await response.json();
      setPredictionResult(data.predicted_exam_score);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error(error);
      setPredictionResult(null);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/study-bg-3.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-center text-5xl mb-5 text-white">
          Machine Learning Prediction for Exam Score
        </h1>
        <h4 className="text-white text-xl mb-14">Author: Christian Hadinata</h4>
        <div className="bg-white bg-opacity-100 rounded-xl p-8 shadow-lg w-[820px]">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-[1fr_0.25fr_1fr] items-center gap-2">
              <label className="text-lg font-medium">
                Study Hours <span className="text-gray-500">(daily)</span>
              </label>
              <span className="text-center">:</span>
              <input
                type="number"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="grid grid-cols-[1fr_0.25fr_1fr] items-center gap-2">
              <label className="text-lg font-medium">
                Mental Health Rating{" "}
                <span className="text-gray-500">(1-10)</span>
              </label>
              <span className="text-center">:</span>
              <input
                type="number"
                value={mentalHealthRating}
                onChange={(e) => setMentalHealthRating(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="grid grid-cols-[1fr_0.25fr_1fr] items-center gap-2">
              <label className="text-lg font-medium">
                Netflix Hours <span className="text-gray-500">(daily)</span>
              </label>
              <span className="text-center">:</span>
              <input
                type="number"
                value={netflixHours}
                onChange={(e) => setNetflixHours(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="grid grid-cols-[1fr_0.25fr_1fr] items-center gap-2">
              <label className="text-lg font-medium">
                Social Media Hours{" "}
                <span className="text-gray-500">(daily)</span>
              </label>
              <span className="text-center">:</span>
              <input
                type="number"
                value={socialMediaHours}
                onChange={(e) => setSocialMediaHours(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="grid grid-cols-[1fr_0.25fr_1fr] items-center gap-2">
              <label className="text-lg font-medium">
                Exercise Frequency{" "}
                <span className="text-gray-500">(daily)</span>
              </label>
              <span className="text-center">:</span>
              <input
                type="number"
                value={exerciseFrequency}
                onChange={(e) => setExerciseFrequency(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Predict
            </button>

            {predictionResult !== null && (
              <div className="mt-6 text-center text-xl font-semibold text-green-700">
                Predicted Exam Score: {predictionResult}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
