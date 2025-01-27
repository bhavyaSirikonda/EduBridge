import axios from 'axios';

export const handleGeUsers = async (getfilter) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users');
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };