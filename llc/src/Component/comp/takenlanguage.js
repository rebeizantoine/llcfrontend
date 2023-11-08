import React, { useState, useEffect } from "react";
import "../styles/takenlanguage.css";

function LanguageTaken() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState(null);

  const MAX_DESCRIPTION_LENGTH = 75; // Set the maximum character limit

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data && data.imageUrl) {
        setImage(data.imageUrl);
        setUploadError(null);
      } else {
        setUploadError("Image upload failed.");
      }
    } catch (error) {
      setUploadError("Image upload error: " + error.message);
    }
  };

  const handleAddLanguage = async () => {
    if (!title || !description) {
      setUploadError("Please fill out the title and description.");
      return;
    }

    if (!image) {
      setUploadError("Please upload an image first.");
      return;
    }

    const newLanguageData = {
      title,
      description,
      languageimage: image,
    };

    try {
      const response = await fetch("/user/addNewLanguage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLanguageData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Language added successfully:", data.message);
          setUploadError(null);
          fetchLanguages();
        } else {
          setUploadError("Language add failed: " + data.message);
        }
      } else {
        setUploadError("Language add failed: " + response.statusText);
      }
    } catch (error) {
      setUploadError("Language add error: " + error.message);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch("/user/getAllLanguage");
      if (response.ok) {
        const data = await response.json();
        setLanguages(data.data);
        setIsLoading(false);
      } else {
        setUploadError("Fetching languages failed: " + response.statusText);
      }
    } catch (error) {
      setUploadError("Fetching languages error: " + error.message);
    }
  };

  const handleDeleteLanguage = async (id) => {
    try {
      const response = await fetch(`/user/deleteLanguage/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Language deleted successfully:", data.message);
          setUploadError(null);
          fetchLanguages();
        } else {
          setUploadError("Language delete failed: " + data.message);
        }
      } else {
        setUploadError("Language delete failed: " + response.statusText);
      }
    } catch (error) {
      setUploadError("Language delete error: " + error.message);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(inputText);
    }
  };

  return (
    <div className="language-taken-container">
      <h2>Language Data</h2>

      <div className="all-languages-section">
        {isLoading ? (
          <p>Loading languages...</p>
        ) : (
          <ul>
            {languages.map((language) => (
              <li key={language.taken_language_id}>
                <h3>{language.title}</h3>
                <p>{language.description}</p>
                <div className="language-taken-image">
                  <img src={language.languageimage} alt={language.title} />
                </div>
                <button
                  onClick={() =>
                    handleDeleteLanguage(language.taken_language_id)
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="add-language-section">
        <h2>Add New Language</h2>
        <label>Title:</label>
        <input
          className="input-title-lang"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description (Max {MAX_DESCRIPTION_LENGTH} characters):</label>
        <textarea value={description} onChange={handleDescriptionChange} />
        <p>
          Characters Remaining: {MAX_DESCRIPTION_LENGTH - description.length}
        </p>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploadError && <p className="error">{uploadError}</p>}
        <button onClick={handleAddLanguage} className="add-language-button">
          Add Language
        </button>
      </div>
    </div>
  );
}

export default LanguageTaken;
