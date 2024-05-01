import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Select, Rate } from 'antd';

const { Option } = Select;

const baseURL = 'http://localhost:5000';

const BookRating = () => {
  const [ratings, setRatings] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  // Function to fetch ratings for a specific book
  const fetchRatingsForBook = async (bookId) => {
    try {
      const response = await axios.get(`${baseURL}/ratings/getratingsforbook/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ratings for book:', error);
      return [];
    }
  };

  // Function to fetch average rating for a specific book
  const fetchAverageRatingForBook = async (bookId) => {
    try {
      const response = await axios.get(`${baseURL}/ratings/book/${bookId}/average`);
      return response.data.averageRating;
    } catch (error) {
      console.error('Error fetching average rating for book:', error);
      return null;
    }
  };

  // Fetch ratings and books data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.get(`${baseURL}/books`);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  // Update ratings when selectedBook changes
  useEffect(() => {
    const fetchUpdatedRatings = async () => {
      if (selectedBook) {
        const updatedRatings = await fetchRatingsForBook(selectedBook);
        setRatings(updatedRatings);
      } else {
        // If no book is selected, show all ratings
        const ratingsResponse = await axios.get(`${baseURL}/ratings`);
        setRatings(ratingsResponse.data);
      }
    };

    fetchUpdatedRatings();
  }, [selectedBook]);

  // Display average rating for selected book
  useEffect(() => {
    const fetchAverageRating = async () => {
      if (selectedBook) {
        const avgRating = await fetchAverageRatingForBook(selectedBook);
        setAverageRating(avgRating);
      }
    };

    fetchAverageRating();
  }, [selectedBook]);

  // Function to handle audio playback
  const handleAudioPlayback = async (audioId) => {
    try {
      const response = await axios.get(`${baseURL}/ratings/api/reviews/${audioId}/audio`, {
        responseType: 'arraybuffer',
      });
  
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      const audio = new Audio();
      audio.src = audioUrl;
      audio.controls = true;
      audio.autoplay = true;
      audio.play()
        .then(() => {
          console.log("Audio playback started successfully");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };
  
  // Columns configuration for the ratings table
const columns = [
{
  title: 'Book Title',
  dataIndex: 'book',
  render: (book) => (
    <div>
      {book && ( // Add a null check for book
        <>
          {book.image && ( // Check if book.image exists before rendering
            <img src={book.image} alt={book.title} style={{ width: 50, height: 50, marginRight: 10 }} />
          )}
          <a href={`/books/${book._id}`} target="_blank" rel="noopener noreferrer">
            {book.title}
          </a>
        </>
      )}
    </div>
  ),
},

  {
    title: 'Book ID',
    dataIndex: 'book',
    render: (book) => book._id,
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    render: (rating) => <Rate disabled defaultValue={rating} />,
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Recorded Audio',
    dataIndex: 'recordedAudio',
    render: (recordedAudio) => (
      <div className="audio-player" onClick={() => handleAudioPlayback(recordedAudio)}>
        <audio controls>
          <source src={`data:audio/mpeg;base64,${recordedAudio}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ),
  },
];

  return (
    <div>
      <h1>Book Ratings</h1>
      <div style={{ marginBottom: '16px' }}>
        <Select
          placeholder="Select a book"
          style={{ width: 200 }}
          onChange={(value) => setSelectedBook(value)}
        >
          <Option value={null}>All Books</Option>
          {Array.isArray(books) &&
            books.map((book) => (
              <Option key={book._id} value={book._id}>
                {book.title}
              </Option>
            ))}
        </Select>
      </div>
      {averageRating && <p>Average Rating: {averageRating}</p>}
      <Table
        dataSource={ratings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default BookRating;
