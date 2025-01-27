import axios from 'axios';

export const getIntructor = async (email) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/get-a-user', {
        email,
      });
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };