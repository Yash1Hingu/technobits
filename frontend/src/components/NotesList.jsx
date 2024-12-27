import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('https://technobitsapi.onrender.com/api/notes')
            .then((res) => res.json())
            .then((data) => setNotes(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Notes</h1>
            <Link
                to="/create"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 mb-6 inline-block"
            >
                Create Note
            </Link>
            {notes.length === 0 ? (
                <p className="text-center text-gray-600">No notes found</p>
            ) : (
                notes.map((note) => (
                    <div key={note._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{note.title}</h2>
                        <p className="text-gray-600 mb-4">{note.content}</p>
                        <Link
                            to={`/note/${note._id}`}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            View Details
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default NotesList;
