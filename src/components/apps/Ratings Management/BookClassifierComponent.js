// BookClassifierComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const BookClassifierComponent = () => {
  const [comment, setComment] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleClassification = async () => {
    try {
     const response = await axios.post('http://localhost:5000/ratings/api/classify-book', { comment });
      const { prediction } = response.data;
      setPrediction(prediction);
    } catch (error) {
      console.error('Error classifying book:', error);
    }
  };

  return (
    <div>
      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Enter your book rating comment"
      />
      <button onClick={handleClassification}>Classify</button>
      {prediction && (
        <div>
          <strong>Classification:</strong> {prediction === 1 ? 'Good book' : 'Bad book'}
        </div>
      )}
    </div>
  );
};

export default BookClassifierComponent;
