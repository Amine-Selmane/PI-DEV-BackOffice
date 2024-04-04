// import React, { useEffect, useState } from "react";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";
// import imageDb from './Config';

// function FirebaseImageUpload() {
//   const [img, setImg] = useState('');
//   const [imgUrl, setImgUrl] = useState([]);

  

//   const saveImageUrlToDatabase = async (imageUrl) => {
//     // You need to implement your server API endpoint to save the image URL to the database
//     try {
//       const response = await fetch("http://localhost:5000/saveImageUrl", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ imageUrl }),
//       });

//       if (response.ok) {
//         console.log("Image URL saved to database");
//       } else {
//         console.error("Failed to save image URL to database");
//         // Handle error as needed
//       }
//     } catch (error) {
//       console.error("Failed to save image URL:", error);
//       // Handle error as needed
//     }
//   };

//   const handleClick = async () => {
//     if (img !== null) {
//       const imgRef = ref(imageDb, `files/${v4()}`);
//       try {
//         const uploadedFile = await uploadBytes(imgRef, img);
//         const imageUrl = await getDownloadURL(uploadedFile.ref);
//         setImgUrl((data) => [...data, imageUrl]);

//         // Send the URL to your server to save in the database
//         await saveImageUrlToDatabase(imageUrl);
//       } catch (error) {
//         console.error("Failed to upload image:", error);
//         // Handle error as needed
//       }
//     }
//   };

//   useEffect(() => {
//     listAll(ref(imageDb, "files")).then((imgs) => {
//       imgs.items.forEach((val) => {
//         getDownloadURL(val).then((url) => {
//           setImgUrl((data) => [...data, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button type="button" onClick={handleClick}>
//         Upload
//       </button>
//       <br />
//       {imgUrl.map((dataVal) => (
//         <div key={dataVal}>
//           {/* <img src={dataVal} alt="Uploaded" height="200px" width="200px" /> */}
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FirebaseImageUpload;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import imageDb from './Config';
import './FirebaseImageUpload.css'; // Import your CSS file for styling

const FirebaseImageUpload = ({ onImageUpload }) => {
  const [img, setImg] = useState('');
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = async () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      try {
        const uploadedFile = await uploadBytes(imgRef, img);
        const imageUrl = await getDownloadURL(uploadedFile.ref);
        setImgUrl((data) => [...data, imageUrl]);

        // Notify the parent component about the uploaded image
        onImageUpload(imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
        // Handle error as needed
      }
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, 'files')).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  return (
    <div className="image-upload-container">
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button className="upload-button" type="button" onClick={handleClick}>
        Upload Image
      </button>
      <br />
      {imgUrl.map((dataVal) => (
        <div key={dataVal}>
          <br />
        </div>
      ))}
    </div>
  );
};

// Add prop type validation
FirebaseImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default FirebaseImageUpload;
