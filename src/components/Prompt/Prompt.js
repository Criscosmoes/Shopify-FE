import React, { useState, useRef } from "react";
import "./prompt.css";

const Prompt = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  const inputRef = useRef();
  console.log("rendered prompt");

  const apiData = (userPrompt) => {
    const data = {
      prompt: userPrompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    return data;
  };

  const fetchResponses = async (prompt) => {
    const res = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(apiData(prompt)),
      }
    );

    const data = await res.json();

    const [choice] = data.choices;

    setResponses([...responses, { ...choice, id: data.id }]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const userInput = inputRef.current.value;

    if (!userInput) return;

    try {
      await fetchResponses(userInput);

      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const renderedResponses = responses.map((response) => {
    console.log(response);

    return <li key={response.id}>{response.text}</li>;
  });

  return (
    <div className="form-container">
      <form className="main-form" onSubmit={onFormSubmit}>
        <label htmlFor="user-prompt">Enter Prompt</label>
        <textarea
          ref={inputRef}
          className="text-area-prompt"
          name="user-prompt"
        ></textarea>
        <button className="submit-btn" type="submit">
          Submit!
        </button>
      </form>
      <ul>{renderedResponses}</ul>
    </div>
  );
};

export default Prompt;
