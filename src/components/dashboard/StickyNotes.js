import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/notes.scss";

function StickyNotes() {
  const [content, setContent] = useState(`<h3>Note</h3>`);

  useEffect(() => {
    async function getNote() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_STRING}/get-sticky-note`,
          { withCredentials: true }
        );

        setContent(response.data ? response.data : `<h3>Note</h3>`);
      } catch (error) {
        console.error("Error submitting content:", error);
      }
    }

    getNote();
  }, []);

  // Function to handle API submission
  const submitContent = async (updatedContent) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_STRING}/add-sticky-note`,
        {
          note: updatedContent,
        },
        { withCredentials: true }
      );

      console.log("Content submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  const handleBlur = (e) => {
    const updatedContent = e.target.innerHTML;
    setContent(updatedContent);
    submitContent(updatedContent);
  };

  return (
    <div
      className="post-it"
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

export default StickyNotes;
