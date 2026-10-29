import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Hash, 
  User, 
  Layers, 
  Clock, 
  CreditCard, 
  FileText, 
  Check, 
  X, 
  Edit3, 
  PlusCircle 
} from 'lucide-react';

import BASE_URL from '../services/baseUrl';

const API_URL = `${BASE_URL}/courses`;

function Form({ course, setCourse, setShowForm, onCourseSaved }) {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    instructor: '',
    category: 'Web Development',
    duration: '',
    fee: '',
    description: ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        courseName: course.courseName || '',
        courseCode: course.courseCode || '',
        instructor: course.instructor || '',
        category: course.category || 'Web Development',
        duration: course.duration || '',
        fee: course.fee || '',
        description: course.description || ''
      });
    } else {
      setFormData({
        courseName: '',
        courseCode: '',
        instructor: '',
        category: 'Web Development',
        duration: '',
        fee: '',
        description: ''
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.courseName.trim() || !formData.courseCode.trim() || !formData.instructor.trim()) {
      setError('Please fill in all required fields (Course Name, Code, and Instructor).');
      return;
    }

    setSaving(true);
    const url = course ? `${API_URL}/${course.id}` : API_URL;
    const method = course ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          fee: parseFloat(formData.fee) || 0
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save course. Ensure json-server is running.');
      }

      setCourse(null);
      if (onCourseSaved) onCourseSaved();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend server. Make sure port 5000 is running.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setCourse(null);
    setShowForm(false);
  };

  return (
    <div className="form-card">
      <div className="card-header">
        <h2>
          {course ? <Edit3 size={22} className="text-amber-600" /> : <PlusCircle size={22} className="text-indigo-600" />}
          <span>{course ? 'Edit Course Details' : 'Add New Course'}</span>
        </h2>
        <p>
          {course
            ? 'Update the course information in the fields below.'
            : 'Fill in the course specifications and syllabus to enroll a new course.'}
        </p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Course Name */}
          <div className="form-group full-width">
            <label htmlFor="courseName">
              <BookOpen size={15} />
              <span>Course Name *</span>
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="e.g. Full Stack Web Development"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Course Code */}
          <div className="form-group">
            <label htmlFor="courseCode">
              <Hash size={15} />
              <span>Course Code *</span>
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              placeholder="e.g. FSWD-101"
              value={formData.courseCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Instructor */}
          <div className="form-group">
            <label htmlFor="instructor">
              <User size={15} />
              <span>Instructor *</span>
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="e.g. John Doe"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">
              <Layers size={15} />
              <span>Category</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Duration */}
          <div className="form-group">
            <label htmlFor="duration">
              <Clock size={15} />
              <span>Duration</span>
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="e.g. 6 Months / 12 Weeks"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          {/* Fee */}
          <div className="form-group full-width">
            <label htmlFor="fee">
              <CreditCard size={15} />
              <span>Course Fee (₹)</span>
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              placeholder="e.g. 25000"
              value={formData.fee}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description">
              <FileText size={15} />
              <span>Description / Syllabus Summary</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Enter topics, key syllabus concepts, and tools covered..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancel}
          >
            <X size={15} />
            <span>Cancel</span>
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            <Check size={15} />
            <span>{saving ? 'Saving...' : course ? 'Update Course' : 'Add Course'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
