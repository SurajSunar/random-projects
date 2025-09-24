import React, { useState } from "react";
import { dietPrompt } from "../utils/prompt";
import axios from "axios";

const AI_PAYLOAD = (form) => {
  contents: [
    {
      parts: [
        {
          text: dietPrompt(form),
        },
      ],
    },
  ],
};

const AI_CONFIG = {
  headers: {
    " X-goog-api-key": import.meta.env.VITE_AI_API_KEY,
  },
};

const useDiet = () => {
  const [loading, setLoading] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const getDiet = async (form) => {
    try {
      setLoading(false);

      const response = await axios.post(
        import.meta.env.VITE_AI_API_URL,
        AI_PAYLOAD(form),
        AI_CONFIG
      );
      
      setResult(response.data.candidates[0].content.parts[0].text);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, getDiet, error };
};

export default useDiet;
