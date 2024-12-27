import React, { useState } from 'react';

const UploadImage = () => {
    const [file, setFile] = useState(null);

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        fetch('https://technobitsapi.onrender.com/api/upload-image', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Image URL:', data.imageUrl);
                alert('Image uploaded successfully');
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadImage;
