import React, { useState } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import AllCourses from './AllCourses';

function Home() {
  const [course, setCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header
        showForm={showForm}
        setShowForm={setShowForm}
        setCourse={setCourse}
      />

      <main className="main-container">
        {showForm ? (
          <Form
            course={course}
            setCourse={setCourse}
            setShowForm={setShowForm}
            onCourseSaved={() => {
              // Once saved, returning to All Courses displays updated records
              setShowForm(false);
            }}
          />
        ) : (
          <AllCourses
            setCourse={setCourse}
            setShowForm={setShowForm}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} CourseM — Simple Course Management CRUD System</p>
      </footer>
    </>
  );
}

export default Home;
