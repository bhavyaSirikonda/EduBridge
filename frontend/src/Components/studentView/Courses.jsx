import React, {useState, useEffect} from 'react';
import { handleGetCourses } from './handleGetCourses';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from './courseCard';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Align content at the top
    minHeight: '100vh', // Ensure the container takes the full viewport height
    textAlign: 'center', // Center horizontally
    flex: 1,
    padding: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '25px', // Add rounded borders
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '500px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px', // Add rounded borders
    background: 'green', // Background color
    color: 'white', // Text color
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
  };

  const titleStyle = {
    fontSize: '36px', // Change the font size as desired
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    color:'white',
  };

  const searchIconStyle = {

    color:"white"
  };

  const courseListStyle = {
    display: 'grid',
    gridTemplateColumns: '350px 350px 350px',
    gridGap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  };

const Courses = () => {

    const [searchText, setSearchText] = useState('');
    const [courseList, setCourseList] = useState([]); // Initialize as an empty array
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };


  useEffect(() => {
    // Fetch your course list data asynchronously (e.g., from an API)
    // Example using async/await with a mock fetch:
    async function fetchCourseList() {
      try {
        const response = await handleGetCourses();
        setCourseList(response); // Set the course list when data is received
        setFilteredCourses(response);
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    }

    fetchCourseList();
  }, []);


    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        // You can perform search/filtering logic here with the searchText
        var filteredCoursesList = courseList.filter((course) =>
            course.courseId.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredCourses(filteredCoursesList);


    };



  return (
    <div style={containerStyle}>
        <h1 style={titleStyle}>Manage Courses</h1>
        <div  style={buttonContainerStyle}>
            <input
            type="text"
            placeholder="Search courses"
            value={searchText}
            onChange={handleSearchChange}
            style={inputStyle}
            />
            <SearchIcon style={searchIconStyle} />
        </div>

        <div style={courseListStyle}>
            {filteredCourses.map((course) => (
            <CourseCard key={course.courseId} id={course.courseId} name={course.name} />
            ))}

        </div>
    </div>
  )
};

export default Courses;