import React, { useState, useEffect } from 'react';

const NoteForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setTags(initialData.tags.join(', '));
            setIsPinned(initialData.isPinned);
        } else {
            setTitle('');
            setContent('');
            setTags('');
            setIsPinned(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        onSubmit({ title, content, tags: tagsArray, isPinned });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{initialData ? 'Edit Note' : 'Add Note'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter note title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="Enter note content"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="work, personal, ideas"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isPinned}
                                onChange={(e) => setIsPinned(e.target.checked)}
                                style={{ width: 'auto', marginRight: '0.5rem' }}
                            />
                            Pin this note
                        </label>
                    </div>
                    <button type="submit" className="btn-primary">
                        {initialData ? 'Update Note' : 'Add Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NoteForm;
