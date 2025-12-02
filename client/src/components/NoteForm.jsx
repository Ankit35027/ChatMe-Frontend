import React, { useState, useEffect } from 'react';
import API from '../api/axios';

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

    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleSummarize = async () => {
        if (!content) return;

        setIsSummarizing(true);
        try {
            const { data } = await API.post('/ai/summarize', { title, content });
            setContent(prev => `${prev}\n\n**Summary:**\n${data.summary}`);
        } catch (error) {
            console.error('Summarize failed:', error);
            alert('Failed to generate summary');
        } finally {
            setIsSummarizing(false);
        }
    };

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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ marginBottom: 0 }}>Content</label>
                            <button
                                type="button"
                                onClick={handleSummarize}
                                disabled={isSummarizing || !content}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '0.8rem',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: isSummarizing ? 'wait' : 'pointer',
                                    opacity: isSummarizing || !content ? 0.7 : 1
                                }}
                            >
                                {isSummarizing ? '✨ Summarizing...' : '✨ AI Summarize'}
                            </button>
                        </div>
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
