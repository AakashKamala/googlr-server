import Exa from "exa-js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const handleSearch = async (req, res) => {
    const exa = new Exa(process.env.EXA);
    const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the search and content generation promises
    const searchPromise = exa.searchAndContents(req.query.q, {
        type: "neural",
        useAutoprompt: false,
        numResults: 5,
        livecrawl: "always",
    });

    const prompt ="you are embedded into a search engine and user has entered a query, respond accordingly, act like a search engine providing information do not ask for if they need something to assist with. just provide whatever information about the query you have. reply in proper html document so that it can be rendered on frontend. users's query is: " + req.query.q;

    const contentPromise = model.generateContent(prompt);

    try {
        // Run both API calls in parallel
        const [results, completion] = await Promise.all([searchPromise, contentPromise]);
        const answer = completion.response.text();

        res.json({ results, answer });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
