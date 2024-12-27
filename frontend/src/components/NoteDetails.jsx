import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoteDetails = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/note/${noteId}`)
            .then((res) => res.json())
            .then((data) => setNote(data))
            .catch((err) => console.error(err));
    }, [noteId]);

    const handleDelete = () => {
        fetch(`http://localhost:3000/api/note/${noteId}`, { method: 'DELETE' })
            .then(() => navigate('/'))
            .catch((err) => console.error(err));
    };

    const handleUpdate = () => {
        navigate(`/update/${noteId}`); // Redirect to the update page
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {note ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{note.title}</h1>
                    {note.image && (
                        <img
                            src={note.image}
                            alt="Note"
                            className="w-full max-w-md rounded-lg mx-auto mb-6"
                        />
                    )}
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                    <p className="text-gray-700 mb-6">{note.content}</p>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Loading...</p>
            )}
        </div>
    );
};

export default NoteDetails;
