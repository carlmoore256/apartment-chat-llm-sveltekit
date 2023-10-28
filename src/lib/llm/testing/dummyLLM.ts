import type { EventEmitter } from "events";
import type { LLMEvent } from "$lib/llm/LLMStreamHandler.js";
import { loadJSON } from "$lib/utils/files.js";
import dotenv from "dotenv";
dotenv.config();

function messageEmitter(
    emitter: EventEmitter,
    message: string,
    runId: string,
    onComplete: () => void,
    chunkDuration: number = 100,
    chunkSize: number = 10
) {
    let count = 0;

    function nextChunk() {
        if (count < message.length) {
            setTimeout(() => {
                const chunk = message.slice(count, count + chunkSize);
                const llmEvent: LLMEvent = {
                    type: "token",
                    category: "text",
                    runId,
                    content: {
                        text: chunk,
                    },
                };
                emitter.emit("llmEvent", llmEvent);
                count += chunkSize;
                nextChunk();
            }, chunkDuration);
        } else {
            onComplete();
        }
    }

    nextChunk();
}
export function dummyLLMChain(
    emitter: EventEmitter,
    chunkDuration: number = 20,
    eventName?: string,
    toolRandomDuration: number = 1000
) {
    const dummyEvents = loadJSON("data/fake-llm-events.json");
    const { run, description } = dummyEvents.find(
        (m: any) => m.name === (eventName || "default")
    );

    console.log(
        `Running dummy emitter for ${eventName || "default"} : ${description}`
    );

    let count = 0;
    const runNextEvent = () => {
        console.log(`Running dummy event ${count}`);
        if (count >= run.length) {
            console.log(`Ending dummy emitter`);
            emitter.emit("end");
        } else {
            const event = run[count];
            if (event.type === "token" && event.category === "text") {
                const { text } = event.content;
                const { runId } = event;
                messageEmitter(
                    emitter,
                    text,
                    runId,
                    () => {
                        count++;
                        runNextEvent();
                    },
                    chunkDuration,
                    10 // chunkSize
                );
            } else {
                setTimeout(() => {
                    emitter.emit("llmEvent", event);
                    count++;
                    runNextEvent();
                }, Math.random() * toolRandomDuration);
            }
        }
    };

    runNextEvent();
}

// export function dummyLLMChain(
//     emitter: EventEmitter,
//     chunkDuration: number = 20,
//     eventName?: string
// ) {

//     const { run, description } = DUMMY_EVENTS.find((m : any) => m.name === (eventName || "default"))

//     console.log(
//         `Running dummy emitter for ${eventName || "default"} : ${description}`
//     );

//     let count = 0;
//     const runNextEvent = () => {
//         console.log(`Running dummy event ${count}`);
//         if (count >= run.length) {
//             console.log(`Ending dummy emitter`);
//             emitter.emit("end");
//         } else {
//             const event = run[count];
//             messageEmitter(
//                 emitter,
//                 event,
//                 () => {
//                     count++;
//                     setTimeout(() => {
//                         runNextEvent();
//                     }, 800);
//                 },
//                 chunkDuration
//             );
//         }
//     };

//     runNextEvent();
// }
