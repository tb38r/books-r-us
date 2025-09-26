import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROK_KEY;

const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });



export async function getGroqChatCompletion(bookTitle, bookAuthor) {
    if(bookTitle.length === 0 || bookAuthor.length === 0 )return 
    

    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate a brief blurb or summary, without spoilers, for the book, ${bookTitle} by the author, ${bookAuthor} , return 20 -40 words or so.`,
        },
      ],
      model: "allam-2-7b",
    });
  }



