import React from 'react';
import { BookOpen, PlusCircle, List } from 'lucide-react';

function Header({ showForm, setShowForm, setCourse }) {
  return (
    <header className="header">
      <div className="header-content">
        <div 
          className="brand"
          onClick={() => {
            setCourse(null);
            setShowForm(false);
          }}
        >
          <div className="brand-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <h1>CourseM</h1>
            <span>Course Management System</span>
          </div>
        </div>

        <nav>
          <button
            className={`nav-button ${!showForm ? 'active' : ''}`}
            onClick={() => {
              setCourse(null);
              setShowForm(false);
            }}
          >
            <List size={16} />
            <span>All Courses</span>
          </button>

          <button
            className={`nav-button ${showForm ? 'active' : ''}`}
            onClick={() => {
              setCourse(null);
              setShowForm(true);
            }}
          >
            <PlusCircle size={16} />
            <span>Add Course</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
