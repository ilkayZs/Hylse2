import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('GOOGLE_GEMINI_API_KEY is not defined');
  throw new Error('GOOGLE_GEMINI_API_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 4096,
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const prompt = `
      You are a Professional Front-end Developer. Create an awesome design.
      Write React code using only Tailwind CSS for modern UI.
      Use only className attributes for styling.
      Don't include any JavaScript logic or imports.
      Output only the JSX code for the component.
    

      User request: ${message}

    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();

    console.log('AI Response:', responseText); // Debugging log

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Error generating AI response:', error);

    if (error.message.includes('API key')) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    } else if (error.message.includes('network')) {
      return NextResponse.json({ error: 'Network error occurred' }, { status: 503 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 });
    }
  }
}