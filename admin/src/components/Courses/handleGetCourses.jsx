import axios from 'axios';

export const handleGetCourses = async (getfilter) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_courses');
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addCourses = async (courseBlock) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/courses',courseBlock);
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };