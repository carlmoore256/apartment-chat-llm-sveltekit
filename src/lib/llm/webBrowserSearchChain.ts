import { WebBrowser } from "langchain/tools/webbrowser";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool, BraveSearch } from "langchain/tools";
import { RequestsGetTool } from "langchain/tools";

import dotenv from "dotenv";
import type { LLMStreamHandler } from "./LLMStreamHandler";
dotenv.config();

export async function webBrowserSearchChain(message: string, handler: LLMStreamHandler) {
    const model = new ChatOpenAI({
        temperature: 0,
        verbose: true,
        streaming: true
    });
    
    const embeddings = new OpenAIEmbeddings();

    const browser = new WebBrowser({
        model,
        embeddings,
        tags: ["alias_webBrowser"],
    });

    const braveTool = new BraveSearch();
    braveTool.name = "brave";
    braveTool.tags = ["alias_braveSearch"];

    const tools = [
        braveTool,
        browser,
    ];

    const agent = await initializeAgentExecutorWithOptions(
        tools,
        model,
        { agentType: "chat-zero-shot-react-description", verbose: true }
    );

    // const result = await agent.call({
    //     input: "What is the name of this website?",
    //     baseUrl: "https://www.apartments.com/amli-mark24-seattle-wa/twk16f9",
    //     task: "What is the name of this website?"
    // });

    const result = await agent.call({
        input: message,
    }, [handler])

    console.log(`Got output ${result.output}`);

    // const result = await browser.call(
    //     `"https://www.apartments.com/amli-mark24-seattle-wa/twk16f9","What are the cheapest units?"`
    // );
}

// run();
