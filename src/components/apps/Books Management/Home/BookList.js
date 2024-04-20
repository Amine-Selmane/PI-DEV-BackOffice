import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookList = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Title</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Description
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Price
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book.id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.description}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.price}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book.id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/update/${book.id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book.id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Modifier _id en id
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BookList;
