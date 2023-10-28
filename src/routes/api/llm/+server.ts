import { simpleChain } from "$lib/llm/simpleChain.js";
import { webBrowserChain } from "$lib/llm/webBrowserChain.js";
import { webBrowserSearchChain } from "$lib/llm/webBrowserSearchChain";
import { LLMStreamHandler } from "$lib/llm/LLMStreamHandler.js";
import { EventEmitter } from "events";
import { dummyLLMChain } from "$lib/llm/testing/dummyLLM.js";
import dotenv from "dotenv";
import type { RequestEvent } from "../$types";
import type { LLMEvent } from "$lib/llm/LLMStreamHandler.js";
import { getJob } from "$lib/server/database.js";

dotenv.config();

export function GET({ url, event, cookies }: any) {
    try {
        const emitter = new EventEmitter();

        const userId = cookies.get("userId");

        const jobId = url.searchParams.get("jobId");
        const fakeLLMString = url.searchParams.get("fakeLLM");
        const fakeLLM = fakeLLMString === "true";
        
        if (fakeLLM) {
            dummyLLMChain(emitter, 50, "apartmentSearch");
        } else {
            const job = getJob(userId, jobId);
            if (!job) {
                throw new Error("Job not found");
            }
            
            
                    webBrowserSearchChain(
                        "What are the cheapest apartments in Seattle? Please provide me a JSON array of the results.",
                        new LLMStreamHandler(emitter)
                    );
            console.log(`Job: ${JSON.stringify(job)}`)

            // webBrowserChain(
            //     job.url,
            //     "What are the units listed, and what are their prices?",
            //     new LLMStreamHandler(emitter)
            // );
        }

        const stream = new ReadableStream({
            start(controller) {
                emitter.on("llmEvent", (llmEvent: LLMEvent) => {
                    controller.enqueue(
                        `event: llmEvent\ndata: ${JSON.stringify(llmEvent)}\n\n`
                    );
                });

                emitter.on("end", () => {
                    controller.enqueue(`event: end\ndata: {}\n\n`);
                    console.log(`Ending stream...`);
                    controller.close();
                });
            },
            cancel() {
                emitter.removeAllListeners();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (e) {
        console.log(e);
        return new Response("No job found", {
            status: 404,
        });
    }
}
