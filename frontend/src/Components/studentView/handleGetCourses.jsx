import axios from 'axios';

export const getacourse = async (courseid) => {
    try {
      const response = await axios.post('https://edu-bridge-c3b06.wm.r.appspot.com/get-a-course',{
        courseid}
        );
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const handleGetCourses = async (getfilter) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_courses');
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const pushcoursedetails = async (details,courseid) => {
    console.log(courseid)
    try {
      const response = await axios.post('https://edu-bridge-c3b06.wm.r.appspot.com/edit-course',{
        details,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };