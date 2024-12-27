import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateNote = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isImageUpdated, setIsImageUpdated] = useState(false);

    useEffect(() => {
        // Fetch the current note details
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/note/${noteId}`);
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                setImageUrl(data.image); // Existing image URL
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleImageUpload = async () => {
        if (!imageFile) return alert('Please select an image');

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.imageUrl); // Update the image URL in state
            setIsImageUpdated(true); // Mark image as updated
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {
                title,
                content,
                image: imageUrl, // Use the existing or newly uploaded image URL
            };

            await fetch(`http://localhost:3000/api/note/${noteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            alert('Note updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating note:', error);
            alert('Failed to update note');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Update Note</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <input
                        type="file"
                        onChange={(e) => {
                            setImageFile(e.target.files[0]);
                            setIsImageUpdated(true);
                        }}
                        className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:mr-4 file:rounded-full file:border-0 file:text-white file:bg-blue-500 hover:file:bg-blue-600"
                    />
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Upload Image
                    </button>
                </div>

                {imageUrl && (
                    <div>
                        <p className="text-gray-600">Current Image:</p>
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover mt-2 rounded-lg"
                            key={isImageUpdated ? 'new' : 'existing'}
                        />
                    </div>
                )}

                <div className="space-x-4">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Update Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNote;
