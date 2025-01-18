// /pages/api/generate-resume.ts
import { OpenAI } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface UserData {
  name: string;
  skills: string;
  experience: string;
  education: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userData }: { userData: UserData } = req.body;

    // Inside your try-catch block
try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4'
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume builder.',
        },
        {
          role: 'user',
          content: `Generate a resume based on the following information: ${JSON.stringify(userData)}`,
        },
      ],
    });
  
    const resume = response.choices[0]?.message?.content;
  
    if (resume) {
      res.status(200).json({ resume });
    } else {
      throw new Error('Failed to generate resume.');
    }
  } catch (error) {
    // Type assertion to ensure TypeScript understands that error is an instance of Error
    const err = error instanceof Error ? error : new Error('Unknown error occurred');
    res.status(500).json({ error: err.message });
  }
  
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
