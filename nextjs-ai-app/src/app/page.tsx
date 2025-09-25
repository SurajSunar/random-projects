"use client"

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>()
  const [response, setResponse] = useState<string>()
  const [streaming, setStreaming] = useState()
  const [streamResponse, setStreamResponse] = useState()
  const [loading, setLoading] = useState<boolean>()

   const handleChat = async () => {
    try {
      setLoading(true)
      setResponse(null)
      
      const data = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({message})
      })
      const result = await data.json()
      setResponse(result?.text?.replaceAll('```html', '').replaceAll('```', ''))
    } catch (error) {
      setResponse("Error:" + error['message'])
    } finally {
       setLoading(false)
    }
   }

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-xl">
      <div className="flex flex-col gap-y-5 w-1/2 mx-auto">
        <h1 className="text-4xl font-bold self-center">AI Chatbox</h1>
        <div className="flex gap-x-6">
          <input type="text"  className="bg-gray-200 rounded-xl px-4 py-2 flex-1" value={message} onChange={(e) => setMessage(e.target.value)}  />
          <button className="bg-blue-500 text-white rounded-xl px-4 py-2 w-fit disabled:bg-blue-300" disabled={loading} onClick={handleChat}>{loading ? 'Loading...': 'Send'}</button>
        </div>

        <div className={`bg-gray-100 rounded-xl text-xl text-gray-800 p-4 flex ${!response?.length && 'justify-center items-center'} w-full min-h-[300px]`}>
          {response?.length ? <div className="w-full" dangerouslySetInnerHTML={{__html: response}}></div> 
          : <span className="text-gray-500 font-medium">No response from server</span>} 
        </div>
      </div>
    </div>
  );
}
