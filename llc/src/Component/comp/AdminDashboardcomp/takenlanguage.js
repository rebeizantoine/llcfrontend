import React, { useState, useEffect } from 'react';

function LanguageManagement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 200) {
          const imageUrl = data.data.url;
          console.log('Image uploaded successfully:', imageUrl);
          setUploadError(null);

          // Send the image URL as text to 'http://localhost:8000/user/addNewLanguage'
          try {
            const textResponse = await fetch('http://localhost:8000/user/addNewLanguage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageText: imageUrl }), // Send the image URL as text
            });

            if (textResponse.ok) {
              const textData = await textResponse.json();
              if (textData.success) {
                console.log('Image URL sent as text successfully:', textData.message);
              } else {
                setUploadError('Image URL text send failed: ' + textData.message);
              }
            } else {
              setUploadError('Image URL text send failed: ' + textResponse.statusText);
            }
          } catch (textError) {
            setUploadError('Image URL text send error: ' + textError.message);
          }
        } else {
          setUploadError('Image upload failed: ' + data.status_txt);
        }
      } else {
        setUploadError('Image upload failed: ' + response.statusText);
      }
    } catch (error) {
      setUploadError('Image upload error: ' + error.message);
    }
  };

  const handleAddLanguage = async () => {
    const newLanguageData = {
      title,
      description,
      languageimage: image,
    };

    try {
      const response = await fetch('http://localhost:8000/user/addNewLanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLanguageData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Language added successfully:', data.message);
          setUploadError(null);
          fetchLanguages();
        } else {
          setUploadError('Language add failed: ' + data.message);
        }
      } else {
        setUploadError('Language add failed: ' + response.statusText);
      }
    } catch (error) {
      setUploadError('Language add error: ' + error.message);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/getAllLanguage');
      if (response.ok) {
        const data = await response.json();
        setLanguages(data.data);
        setIsLoading(false);
      } else {
        setUploadError('Fetching languages failed: ' + response.statusText);
      }
    } catch (error) {
      setUploadError('Fetching languages error: ' + error.message);
    }
  };

  const handleDeleteLanguage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/user/deleteLanguage/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Language deleted successfully:', data.message);
          setUploadError(null);
          fetchLanguages();
        } else {
          setUploadError('Language delete failed: ' + data.message);
        }
      } else {
        setUploadError('Language delete failed: ' + response.statusText);
      }
    } catch (error) {
      setUploadError('Language delete error: ' + error.message);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <div>
      <h2>Add New Language</h2>
      <div>
        <label>Title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image: </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      {uploadError && <p className="error">{uploadError}</p>}
      <button onClick={handleAddLanguage}>Add Language</button>

      <h2>All Languages</h2>
      {isLoading ? (
        <p>Loading languages...</p>
      ) : (
        <ul>
          {languages.map((language) => (
            <li key={language.taken_language_id}>
              <h3>{language.title}</h3>
              <p>{language.description}</p>
              <img src={language.languageimage} alt={language.title} />
              <button onClick={() => handleDeleteLanguage(language.taken_language_id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageManagement;
