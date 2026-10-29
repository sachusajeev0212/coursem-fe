import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Layers, 
  CreditCard, 
  PlusCircle, 
  AlertCircle 
} from 'lucide-react';
import ViewModal from '../components/ViewModal';

import BASE_URL from '../services/baseUrl';

const API_URL = `${BASE_URL}/courses`;

function AllCourses({ setCourse, setShowForm }) {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseForView, setSelectedCourseForView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to JSON Server. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    setCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (id, courseName) => {
    if (window.confirm(`Are you sure you want to delete course "${courseName}"?`)) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Delete failed');
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        alert('Failed to delete course from server.');
      }
    }
  };

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      (c.courseName || '').toLowerCase().includes(q) ||
      (c.courseCode || '').toLowerCase().includes(q) ||
      (c.instructor || '').toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q)
    );
  });

  // Calculate statistics
  const totalCourses = courses.length;
  const categoriesCount = new Set(courses.map((c) => c.category).filter(Boolean)).size;
  const totalFee = courses.reduce((acc, c) => acc + (parseFloat(c.fee) || 0), 0);

  return (
    <div className="all-courses-view">
      {/* Stats Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon indigo">
            <BookOpen size={22} />
          </div>
          <div className="stat-info">
            <p>Total Courses</p>
            <h3>{totalCourses}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon violet">
            <Layers size={22} />
          </div>
          <div className="stat-info">
            <p>Categories</p>
            <h3>{categoriesCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon emerald">
            <CreditCard size={22} />
          </div>
          <div className="stat-info">
            <p>Total Value</p>
            <h3>₹{totalFee.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <section className="table-card">
        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, code, instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              setCourse(null);
              setShowForm(true);
            }}
          >
            <PlusCircle size={16} />
            <span>Add Course</span>
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="empty-state">Loading courses...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Code</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Fee</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.courseName}</td>
                      <td>
                        <span className="badge badge-code">{c.courseCode}</span>
                      </td>
                      <td>{c.instructor}</td>
                      <td>
                        <span className="badge badge-category">{c.category || 'General'}</span>
                      </td>
                      <td>{c.duration || 'N/A'}</td>
                      <td>
                        <span className="badge badge-fee">₹{parseFloat(c.fee || 0).toLocaleString()}</span>
                      </td>
                      <td>
                        <div className="table-actions" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="action-btn view"
                            onClick={() => setSelectedCourseForView(c)}
                            title="View / Read Details"
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            className="action-btn edit"
                            onClick={() => handleEdit(c)}
                            title="Edit Course"
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="action-btn delete"
                            onClick={() => handleDelete(c.id, c.courseName)}
                            title="Delete Course"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      {searchTerm ? 'No matching courses found for your search.' : 'No courses cataloged yet. Click "Add Course" above.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* View Modal */}
      {selectedCourseForView && (
        <ViewModal
          course={selectedCourseForView}
          onClose={() => setSelectedCourseForView(null)}
          onEdit={(c) => {
            handleEdit(c);
          }}
        />
      )}
    </div>
  );
}

export default AllCourses;
