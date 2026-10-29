import React from 'react';
import { 
  X, 
  BookOpen, 
  Hash, 
  User, 
  Layers, 
  Clock, 
  CreditCard, 
  FileText, 
  Edit3 
} from 'lucide-react';

function ViewModal({ course, onClose, onEdit }) {
  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <BookOpen size={20} className="text-indigo-600" />
            <span>Course Details</span>
          </h3>
          <button className="close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <div className="modal-icon">
              <BookOpen size={16} />
            </div>
            <div className="modal-detail">
              <h4>Course Name</h4>
              <p style={{ fontSize: '16px', fontWeight: 700 }}>{course.courseName}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="modal-row">
              <div className="modal-icon">
                <Hash size={16} />
              </div>
              <div className="modal-detail">
                <h4>Course Code</h4>
                <p>
                  <span className="badge badge-code">{course.courseCode}</span>
                </p>
              </div>
            </div>

            <div className="modal-row">
              <div className="modal-icon">
                <Layers size={16} />
              </div>
              <div className="modal-detail">
                <h4>Category</h4>
                <p>
                  <span className="badge badge-category">{course.category || 'General'}</span>
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="modal-row">
              <div className="modal-icon">
                <User size={16} />
              </div>
              <div className="modal-detail">
                <h4>Instructor</h4>
                <p>{course.instructor}</p>
              </div>
            </div>

            <div className="modal-row">
              <div className="modal-icon">
                <Clock size={16} />
              </div>
              <div className="modal-detail">
                <h4>Duration</h4>
                <p>{course.duration || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-icon">
              <CreditCard size={16} />
            </div>
            <div className="modal-detail">
              <h4>Course Fee</h4>
              <p>
                <span className="badge badge-fee">₹{parseFloat(course.fee || 0).toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-icon">
              <FileText size={16} />
            </div>
            <div className="modal-detail">
              <h4>Description & Syllabus</h4>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6, marginTop: '4px' }}>
                {course.description || 'No detailed syllabus description provided.'}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="secondary-button" 
            onClick={onClose}
          >
            Close
          </button>
          <button 
            type="button" 
            className="primary-button" 
            onClick={() => {
              onClose();
              onEdit(course);
            }}
          >
            <Edit3 size={15} />
            <span>Edit Course</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
