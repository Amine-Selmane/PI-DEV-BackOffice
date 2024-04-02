import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const BookModal = ({ visible, book, onClose }) => {
  // Check if the book object is defined
  if (!book || Object.keys(book).length === 0) {
    return null; // Return null if book is not defined or is an empty object
  }

  return (
    <Modal
      visible={visible}
      title="Book Details"
      onCancel={onClose}
      footer={null}
    >
      <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id:</span>
          <span>{book.id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title:</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Description:</span>
          <span>{book.description}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Price:</span>
          <span>${book.price}</span>
        </div>
        {book.file && (
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>File:</span>
            <a href={book.file} target='_blank' rel='noopener noreferrer'>
              View File
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

BookModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;
