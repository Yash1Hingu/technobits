import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false); // New state to track upload progress
    const navigate = useNavigate();

    const handleImageUpload = async () => {
        if (!imageFile) return alert('Please select an image');

        setIsUploading(true); // Disable buttons when uploading starts
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('https://technobitsapi.onrender.com/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.imageUrl); // Store the returned image URL in state
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false); // Enable buttons after upload completes (success or failure)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            return alert('Please upload an image before creating the note.');
        }

        try {
            await fetch('https://technobitsapi.onrender.com/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, image: imageUrl }), // Include the image URL
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating note:', error);
            alert('Failed to create note');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Note</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="5"
                ></textarea>

                <div className="space-y-2">
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={isUploading} // Disable the button while uploading
                    >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </div>

                {imageUrl && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">Uploaded Image Preview:</p>
                        <img src={imageUrl} alt="Uploaded" className="w-24 h-24 rounded-md mt-2" />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    disabled={isUploading} // Disable the submit button while uploading
                >
                    {isUploading ? 'Uploading...' : 'Create Note'}
                </button>
            </form>
        </div>
    );
};

export default CreateNote;
