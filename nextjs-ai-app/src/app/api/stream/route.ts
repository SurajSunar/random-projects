import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

export async function POST(request: NextRequest) {
     try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', 
        systemInstruction: `You are an expert in response any sort of queries. Response it as:
         - In html format
         - All in black text ONLY
         - Beautify code or blocks wherever possible with tailwind css only
         - Generate content inside the HTML body tag
         - Text should NOT overflow the main container.
         - HTML code should be inside readable container with appropriate color and background and border
         - Container for generated HTML code is NOT required to render.
         - Remove the spacing and border for main container` });

    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: message }] }]
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8', 
        'Cache-Control': 'no-cache, no-transform', // Prevent caching
        'Connection': 'keep-alive', // Keep the connection open
      },
    });

  } catch (error) {
    console.error('Error during AI streaming:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate content stream' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}