import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Select, Rate } from 'antd';
import { Pie } from 'react-chartjs-2';

const { Option } = Select;

const baseURL = 'http://localhost:5000';

const BookRating = () => {
  const [ratings, setRatings] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingAnalysis, setRatingAnalysis] = useState(null);
  const [sentiment, setSentiment] = useState(null); // New state for sentiment analysis result

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

  // Calculate rating analysis for selected book and stock book
  useEffect(() => {
    const calculateRatingAnalysis = () => {
      if (ratings.length > 0) {
        const totalRatings = ratings.map((rating) => rating.rating);
        const maxRating = Math.max(...totalRatings);
        const minRating = Math.min(...totalRatings);
        const totalRatingSum = totalRatings.reduce((acc, curr) => acc + curr, 0);
        const avgRating = totalRatingSum / ratings.length;
        
        setRatingAnalysis({
          maxRating,
          minRating,
          avgRating
        });

        // Group ratings by book and calculate the count of ratings for each book
        const groupedRatings = ratings.reduce((acc, curr) => {
          acc[curr.book.title] = acc[curr.book.title] || { ratings: [], count: 0 };
          acc[curr.book.title].ratings.push(curr.rating);
          acc[curr.book.title].count++;
          return acc;
        }, {});

        // Convert the grouped ratings into labels and data for the pie chart
        const labels = Object.keys(groupedRatings);
        const data = labels.map((label) => {
          const avgRating = groupedRatings[label].ratings.reduce((acc, curr) => acc + curr, 0) / groupedRatings[label].count;
          return avgRating;
        });

        // Color scheme for the pie chart
        const stockBookColors = {
          newEditionNeeded: '#FF6384', // Red color for books needing a new edition
          bestEdition: '#36A2EB', // Blue color for books with excellent ratings
        };

        // Determine if each book needs a new edition or has an excellent rating
        const newData = data.map((avgRating) => {
          if (avgRating < 3) {
            return {
              color: stockBookColors.newEditionNeeded,
              avgRating,
            };
          } else {
            return {
              color: stockBookColors.bestEdition,
              avgRating,
            };
          }
        });

        // Set data for the second pie chart
        setStockBookData({
          labels,
          datasets: [
            {
              label: 'Stock Book',
              backgroundColor: newData.map((item) => item.color),
              borderColor: 'rgba(255,255,255,1)',
              borderWidth: 1,
              hoverBackgroundColor: newData.map((item) => item.color),
              hoverBorderColor: 'rgba(255,255,255,1)',
              data: newData.map((item) => item.avgRating),
            },
          ],
        });
      }
    };

    calculateRatingAnalysis();
  }, [ratings]);

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

  // Function to perform sentiment analysis on comments
  const performSentimentAnalysis = async () => {
    try {
      const response = await axios.post(`${baseURL}/sentiment`, { comments: ratings.map((rating) => rating.comment) });
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error performing sentiment analysis:', error);
    }
  };

  // Trigger sentiment analysis when ratings change
  useEffect(() => {
    performSentimentAnalysis();
  }, [ratings]);

  // Data for the rating analysis pie chart
  const chartData = {
    labels: ['Highest Rating', 'Lowest Rating', 'Average Rating'],
    datasets: [
      {
        label: 'Rating Analysis',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBorderColor: 'rgba(255,255,255,1)',
        data: [
          ratingAnalysis ? ratingAnalysis.maxRating : 0,
          ratingAnalysis ? ratingAnalysis.minRating : 0,
          ratingAnalysis ? ratingAnalysis.avgRating : 0
        ],
      },
    ],
  };

  // State for stock book data
  const [stockBookData, setStockBookData] = useState(null);

  // Columns configuration for the ratings table
  const columns = [
    {
      title: 'Book Title',
      dataIndex: 'book',
      render: (book) => (
        <div>
          {book && (
            <>
              {book.image && (
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
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Pie
          data={chartData}
          options={{
            title:{
              display:true,
              text:'Rating Analysis',
              fontSize:16
            },
            legend:{
              display:true,
              position:'bottom'
            },
            maintainAspectRatio: false // To prevent the chart from maintaining aspect ratio
          }}
          width={400} // Set desired width for the chart
          height={300} // Set desired height for the chart
        />
      </div>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        {stockBookData && (
          <Pie
            data={stockBookData}
            options={{
              title:{
                display:true,
                text:'Stock Book Ratings',
                fontSize:16
              },
              legend:{
                display:true,
                position:'bottom'
              },
              maintainAspectRatio: false // To prevent the chart from maintaining aspect ratio
            }}
            width={400} // Set desired width for the chart
            height={300} // Set desired height for the chart
          />
        )}
      </div>
      {/* Display sentiment analysis result */}
      {sentiment && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <h2>Sentiment Analysis</h2>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default BookRating;
