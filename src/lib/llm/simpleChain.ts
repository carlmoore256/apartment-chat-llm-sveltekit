import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool } from "langchain/tools";
import type { LLMStreamHandler } from "./LLMStreamHandler";
import dotenv from "dotenv";
dotenv.config();

export async function simpleChain(input: string, handler: LLMStreamHandler) {
    const model = new OpenAI({
        temperature: 0,
        streaming: false,
    });
    const tools = [
        new DynamicTool({
            name: "query",
            description:
                "call this to query the page",
            func: async () => "baz",
            tags: ["alias_foo"],
        }),
        new DynamicTool({
            name: "BAR",
            description:
                "call this to get the value of bar. input should be an empty string.",
            func: async () => "baz1",
            tags: ["alias_bar"],
        }),
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        tags: ["test"],
    });

    console.log("Loaded agent.");

    console.log(`Executing with input "${input}"...`);

    const result = await executor.call({ input }, [handler]);

    console.log(`Got output ${result.output}`);
}
