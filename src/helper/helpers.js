import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Cannot find Token");
  const decode = jwtDecode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post('/api/authenticate', { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** Récupérer les détails de l'utilisateur par email */
export async function getUserByEmail(email) {
  try {
    const response = await axios.get(`/api/userByEmail/${email}`);
    return response.data;  // Assuming the server sends user details directly without a property named 'email'
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
    throw error;
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

    const { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(new Error("Username doesn't exist...!"));
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject(new Error("Password doesn't Match...!"));
  }
  throw new Error("Invalid parameters"); // Add a default return value
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(new Error("Couldn't Update Profile...!"));
  }
}

/** generate OTP */
/** generate OTP */
export async function generateOTP(emailParam) {
  try {
    const response = await axios.get('/api/generateOTP', { params: { email: emailParam } });

    // Check if the request was successful (status code 201)
    if (response.status === 201) {
      const { code } = response.data;  // Assuming the structure of the response is { code: 'OTP_CODE' }

      // send mail with the OTP
      const userDetails = await getUserByEmail(emailParam);
      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;

      // Assuming your 'registerMail' endpoint is correctly implemented
      await axios.post('/api/sendOTP', {
        username: userDetails.username,
        userEmail: userDetails.email,
        otp : code,
        text,  // Pass the correct parameter name
        subject: "Password Recovery OTP"
      });

      return Promise.resolve({ code, msg: "You should receive an email with the OTP." });
    } 
      return Promise.reject(new Error("Failed to generate OTP"));
    
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}



/** verify OTP */
export async function verifyOTP({ email, code }) {
  try {
    const { data, status } = await axios.get('http://localhost:5000/api/verifyOTP', { params: { email, code } });
        return { data, status };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Bad Request:', error.response.data);
    } else {
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);
  }
}


/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', { username, password });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}