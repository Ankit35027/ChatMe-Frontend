import React from 'react';

const NoteCard = ({ note, onEdit, onDelete, onPin, onView }) => {
    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title" onClick={() => onView(note)} style={{ cursor: 'pointer' }}>{note.title}</h3>
                {note.isPinned && <span className="pin-icon">📌</span>}
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-tags">
                {note.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                ))}
            </div>
            <div className="note-actions">
                <button className="btn-icon" onClick={() => onPin(note)} title={note.isPinned ? "Unpin" : "Pin"}>
                    {note.isPinned ? "📍" : "📌"}
                </button>
                <button className="btn-icon" onClick={() => onEdit(note)} title="Edit">✏️</button>
                <button className="btn-icon delete" onClick={() => onDelete(note._id)} title="Delete">🗑️</button>
            </div>
        </div>
    );
};

export default NoteCard;
