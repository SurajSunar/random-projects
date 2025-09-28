import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: {
        text: `You are an expert in generating as per suggestion from the user. The response as:
        - to be in html format with properly beautification of section and block as per need. 
        - Should be appealing looks
        - DO NOT generate custom css as style in header. You may add tailwind classes only.
        - All generated text should be in black color.
        - Text should not overflow from rendering container. Align text accordingly
        - Remove the spacing and border for main container`
    } }); 

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
