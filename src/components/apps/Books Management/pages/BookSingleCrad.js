import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookSingleCard = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/getbookbyid/${id}`)
        ;
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (!isInWishlist) {
      setWishlist([...wishlist, book]);
    } else {
      setWishlist(wishlist.filter(item => item._id !== book._id));
    }
  };

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      {book && (
        <div>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl' />
            <h2 className='my-1'>{book.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <AiOutlineEdit className='text-2xl text-red-300' />
            <h2 className='my-1'>{book.description}</h2>
          </div>
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
            <BiShow
              className='text-3xl text-blue-800 hover:text-black cursor-pointer'
              onClick={() => setShowModal(true)}
            />
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
            </Link>
            <Link to={`/books/update/${book._id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
            </Link>
            <Link to={`/books/deletebook/${book._id}`}>
              <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
            </Link>
            <WishlistButton isInWishlist={isInWishlist} toggleWishlist={toggleWishlist} />
          </div>
        </div>
      )}
      {showModal && book && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

BookSingleCard.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default BookSingleCard;
