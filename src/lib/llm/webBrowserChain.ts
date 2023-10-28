import { WebBrowser } from "langchain/tools/webbrowser";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool, BraveSearch } from "langchain/tools";
import { RequestsGetTool } from "langchain/tools";

import dotenv from "dotenv";
import type { LLMStreamHandler } from "./LLMStreamHandler";
dotenv.config();

export async function webBrowserChain(url: string, query: string, handler: LLMStreamHandler) {
    const model = new ChatOpenAI({
        temperature: 0,
        verbose: false,
    });
    
    const embeddings = new OpenAIEmbeddings();

    const browser = new WebBrowser({
        model,
        embeddings,
        tags: ["alias_webBrowser"],
    });
    
    const result = await browser.call(
        `"${url}","${query}"`
    , [handler]);

    console.log(result);
    return result;
}

// run();
