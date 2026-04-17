import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Make sure to set GEMINI_API_KEY in your environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: "OBJECT",
  properties: {
    slug: { type: "STRING", description: "A URL-friendly short name (e.g. 'my-project')" },
    title: { type: "STRING" },
    category: { type: "STRING", description: "e.g. 'Web App', 'Redesign', etc." },
    hero: {
      type: "OBJECT",
      properties: {
        shortDescription: { type: "STRING" },
        role: { type: "STRING" },
        duration: { type: "STRING" },
        tools: { type: "STRING" },
        context: { type: "STRING" },
      }
    },
    problem: {
      type: "OBJECT",
      properties: {
        context: { type: "STRING" },
        painPoints: { type: "ARRAY", items: { type: "STRING" } }
      }
    },
    idea: {
      type: "OBJECT",
      properties: {
        description: { type: "STRING" }
      }
    },
    architecture: {
      type: "OBJECT",
      properties: {
        input: { type: "STRING" },
        processing: { type: "ARRAY", items: { type: "STRING" } },
        output: { type: "ARRAY", items: { type: "STRING" } }
      }
    },
    learnings: { type: "ARRAY", items: { type: "STRING" } },
    next_steps: { type: "ARRAY", items: { type: "STRING" } }
  }
};

export async function POST(req: Request) {
  try {
    const { markdown } = await req.json();

    if (!markdown) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
       console.warn("GEMINI_API_KEY is not set. Using dummy data for testing.");
       // Fallback for when API key is not present, useful for testing the UI
       return NextResponse.json({
         slug: "llm-generated-project",
         title: "LLM Generated Project",
         category: "Generative AI",
         hero: { shortDescription: "Parsed from MD", role: "AI Assistant", duration: "1 sec", tools: "Gemini", context: "Demo" },
         problem: { context: "Needed to parse MD", painPoints: ["Manual entry is slow"] },
         idea: { description: "Use Gemini!" },
         architecture: { input: "Markdown", processing: ["LLM Request"], output: ["JSON"] },
         learnings: ["LLMs are cool"],
         next_steps: ["Setup real key"]
       });
    }

    const prompt = `You are a portfolio assistant. Extract project information from the following markdown and structure it to match the provided JSON schema. If any fields are deeply missing, infer a sensible short placeholder or leave as empty string. \n\nMarkdown content:\n\n${markdown}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error("No output from Gemini");
    
    // Attempt to parse out trailing garbage if any, though responseMimeType should guarantee JSON
    const parsed = JSON.parse(outputText);

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error('Error generating project from MD:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
