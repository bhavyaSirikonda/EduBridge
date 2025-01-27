import axios from 'axios';
export const handleRegister = async (name,email,password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        name,
        email,
        password,
      });
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };