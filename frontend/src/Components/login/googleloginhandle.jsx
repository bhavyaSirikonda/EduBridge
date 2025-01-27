import axios from 'axios';

export const googlehandleLogin = async (email,name) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/googlelogin', {
        email,
        name,
      });
      return response.data.message;
    //   return response.data.message;
    } catch (error) {
      throw error;
    }
  };