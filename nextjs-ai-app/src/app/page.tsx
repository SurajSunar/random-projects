"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [reponseType, setReponseType] = useState<"direct" | "stream">("direct");
  const [message, setMessage] = useState<string | null>();
  const [response, setResponse] = useState<string | null>();
  const [streaming, setStreaming] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  const handleChat = async () => {
    try {
      setLoading(true);
      setResponse(null);

      const data = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
      const result = await data.json();
      setResponse(
        result?.text?.replaceAll("```html", "").replaceAll("```", "")
      );
    } catch (error) {
      setResponse("Error:" + error["message"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResponse("");
    setMessage("");
  }, [reponseType]);

  const handleStream = async () => {
    if (!message?.trim()) return;

    setResponse("");
    setLoading(true);
    setStreaming(true);

    try {
      const res = await fetch("/api/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Something went wrong on the server."
        );
      }

      if (!res.body) {
        throw new Error("Response body is null.");
      }

      // Get a reader for the response body stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setStreaming(false);
          break;
        }
        accumulatedResponse += decoder.decode(value, { stream: true });
        setResponse(
          accumulatedResponse.replaceAll("```html", "").replaceAll("```", "")
        ); 
        
        document.getElementById("streaming")?.scrollIntoView({
          behavior: "smooth", // Makes the scrolling animated and smooth
          block: "center", // Aligns the top of the element with the top of the visible area
          inline: "center",
        });
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setResponse(err.message || "Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-xl">
      <div className="flex flex-col gap-y-5 w-1/2 mx-auto">
        <h1 className="text-4xl font-bold self-center">AI Chatbox</h1>
        <div
          id="toggle"
          className="flex w-full justify-between items-center  text-white [&_div]:px-4 [&_div]:py-4 [&_div]:w-1/2 [&_div]:text-center"
        >
          <div
            className={`bg-blue-500  rounded-l-2xl ${
              reponseType === "direct" && "!bg-blue-300"
            }`}
            onClick={() => setReponseType("direct")}
          >
            Direct
          </div>
          <div
            className={`bg-blue-500  rounded-r-2xl ${
              reponseType === "stream" && "!bg-blue-300"
            }`}
            onClick={() => setReponseType("stream")}
          >
            Streaming
          </div>
        </div>
        <div className="flex gap-x-6">
          <input
            type="text"
            className="bg-gray-200 rounded-xl px-4 py-2 flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-xl px-4 py-2 w-fit disabled:bg-blue-300"
            disabled={loading}
            onClick={reponseType === "direct" ? handleChat : handleStream}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>

        <div
          className={`bg-gray-100 rounded-xl text-xl text-gray-800 p-4 flex ${
            !response?.length && "justify-center items-center"
          } w-full min-h-[300px]`}
        >
          {response?.length ? (
            <div className="w-full">
              <div dangerouslySetInnerHTML={{ __html: response }}></div>
              <span id="streaming">{streaming && "Thinking..."}</span>
            </div>
          ) : (
            <span className="text-gray-500 font-medium">
              {loading ? "Generating..." : "No response from server"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
