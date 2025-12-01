import React from 'react';

const NoteDetailsModal = ({ isOpen, onClose, note }) => {
    if (!isOpen || !note) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 style={{ color: 'var(--primary-color)' }}>{note.title}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="note-meta" style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                    <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="note-body" style={{ marginBottom: '1.5rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {note.content}
                </div>
                <div className="note-tags">
                    {note.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoteDetailsModal;
