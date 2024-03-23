"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [numberCounts, setNumberCounts] = useState(new Array(11).fill(0));
  const [lastRolledNumber, setLastRolledNumber] = useState(null);

  function weightedRandom() {
    // Define the probabilities for each number (2-12)
    const probabilities = [
      1, // 2
      2, // 3
      3, // 4
      4, // 5
      5, // 6
      6, // 7
      5, // 8
      4, // 9
      3, // 10
      2, // 11
      1, // 12
    ];

    // Calculate the total weight
    const totalWeight = probabilities.reduce((acc, val) => acc + val, 0);

    // Generate a random number between 0 and the total weight
    const random = Math.random() * totalWeight;

    // Loop through the probabilities and find which one matches the random number
    let cumulativeProbability = 0;
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (random < cumulativeProbability) {
        return i + 2; // Adding 1 to make it 1-based index
      }
    }
  }

  useEffect(() => {
    updateNumberCounts();
  }, [numbers]); // Run updateNumberCounts whenever numbers state changes

  function updateNumberCounts() {
    const counts = new Array(11).fill(0);
    numbers.forEach((number) => {
      counts[number - 2]++;
    });
    setNumberCounts(counts);
  }

  function generate1Number() {
    const nextNumber = weightedRandom();
    setNumbers((prevNumbers) => [...prevNumbers, nextNumber]);
    setLastRolledNumber(nextNumber);
    updateNumberCounts();
  }

  function generate50Numbers() {
    for (let i = 0; i < 50; i++) {
      const nextNumber = weightedRandom();
      setNumbers((prevNumbers) => [...prevNumbers, nextNumber]);
      setLastRolledNumber(nextNumber);
    }
    updateNumberCounts();
  }

  return (
    <main className="flex flex-col items-center justify-between py-4">
      <div className="flex flex-col bg-blue-100 gap-1 py-4 pr-4 rounded-lg">
        {/* Bar chart */}
        {numberCounts.map((count, index) => (
          <div key={index} className="flex flex-row gap-1 items-center">
            <div
              style={{
                paddingRight: `${count * 0.5}rem`,
                paddingLeft: "6px",
              }}
              className="bg-blue-800 flex flex-row items-center justify-start rounded-r-lg h-6"
            >
              <span className="text-white">{count > 0 && index + 2}</span>
            </div>
            {count}
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-2">
        <button
          onClick={generate50Numbers}
          className="bg-blue-300 px-4 py-2 rounded m-1"
        >
          Get next 50 numbers
        </button>
        <button
          onClick={generate1Number}
          className="bg-blue-300 px-4 py-2 rounded m-1"
        >
          Get next number
        </button>
      </div>
      <div className="flex flex-col my-4">
        {/* Show total number of number in array */}
        <span className="text-center text-xl">
          Total amount of rolls: {numbers.length}
        </span>
        {/* Show last rolled number */}
        {lastRolledNumber && (
          <span className="text-center text-xl">
            Last rolled number: {lastRolledNumber}
          </span>
        )}
      </div>
      <div className="grid grid-cols-6 gap-4">
        {numbers.map((number) => (
          <p
            key={number}
            className="text-center bg-zinc-200 rounded-lg p-1 border border-zinc-300"
          >
            {number}
          </p>
        ))}
      </div>
    </main>
  );
}
