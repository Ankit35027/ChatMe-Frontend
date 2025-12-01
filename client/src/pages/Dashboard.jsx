import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import NoteDetailsModal from '../components/NoteDetailsModal';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [viewNote, setViewNote] = useState(null);

    const fetchNotes = async () => {
        try {
            const { data } = await API.get(`/notes?search=${search}&filter=${filter}&sort=${sort}&page=${page}`);
            setNotes(data.notes);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [search, filter, sort, page]);

    const handleAddNote = async (noteData) => {
        try {
            if (currentNote) {
                await API.put(`/notes/${currentNote._id}`, noteData);
            } else {
                await API.post('/notes', noteData);
            }
            fetchNotes();
            setCurrentNote(null);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleDeleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await API.delete(`/notes/${id}`);
                fetchNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const handlePinNote = async (note) => {
        try {
            await API.put(`/notes/${note._id}`, { ...note, isPinned: !note.isPinned });
            fetchNotes();
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    const openEditModal = (note) => {
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const openDetailsModal = (note) => {
        setViewNote(note);
        setIsDetailsOpen(true);
    };

    const handleDeleteAll = async () => {
        if (window.confirm('Are you sure you want to delete ALL notes? This action cannot be undone.')) {
            try {
                await API.delete('/notes');
                fetchNotes();
            } catch (error) {
                console.error('Error deleting all notes:', error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="dashboard-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }}
                        />
                    </div>
                    <div className="filters">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }}
                        >
                            <option value="">All Notes</option>
                            <option value="pinned">Pinned Only</option>
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                        <button
                            onClick={handleDeleteAll}
                            style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                background: 'var(--danger-color)',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Delete All
                        </button>
                    </div>
                </div>

                {notes.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                        <h3>No notes found. Create one!</h3>
                    </div>
                ) : (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={openEditModal}
                                onDelete={handleDeleteNote}
                                onPin={handlePinNote}
                                onView={openDetailsModal}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="page-btn"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="page-btn"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

                <button className="add-note-btn" onClick={() => { setCurrentNote(null); setIsModalOpen(true); }}>
                    +
                </button>

                <NoteForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddNote}
                    initialData={currentNote}
                />

                <NoteDetailsModal
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    note={viewNote}
                />
            </div>
        </>
    );
};

export default Dashboard;
