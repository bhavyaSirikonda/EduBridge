import axios from 'axios';

export const getacourse = async (courseid) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/get-a-course',{
        courseid}
        );
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const pushcoursedetails = async (details,courseid) => {
    console.log(courseid)
    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course',{
        details,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };

export const pushcoursemodule = async (moduleblock,index,courseid) => {
    console.log(courseid)
    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course-module',{
        moduleblock,
        index,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };


  export const pushcourseassignment = async (assignmentblock,index,courseid) => {
    console.log(courseid)
    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course-assignment',{
        assignmentblock,
        index,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };

  export const pushcoursequiz = async (quizblock,index,courseid) => {
    console.log(courseid)
    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course-quiz',{
        quizblock,
        index,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };

  export const savegrades = async (gradeblock,assignmentindex,courseid) => {

    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course-assignment-grades',{
        gradeblock,
        assignmentindex,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };

  export const savequizgrades = async (gradeblock,quizindex,courseid) => {

    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-course-quiz-grades',{
        gradeblock,
        quizindex,
      courseid}
    );
    //   console.log(response.data);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };