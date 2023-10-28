<script lang="ts">
    import type { IPendingProcessedApartment } from "$lib/types/types";
    import { pendingApartentStore } from "$lib/stores/pendingApartmentStore";
    import { ChatMessageModel } from "$lib/chat/ChatMessageModel";
    import type { LLMEvent } from "$lib/llm/LLMStreamHandler";
    import { writable } from "svelte/store";
    import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";
    import { devModeOptions } from "$lib/stores/devModeOptions";
    // import ChatMessage

    let chatBody;

    const messages = writable<Map<string, ChatMessageModel>>(
        new Map<string, ChatMessageModel>()
    );

    function upsertMessage(message: ChatMessageModel) {
        messages.update((m) => {
            m.set(message.id, message);
            return m;
        });
    }
    
    function getLLMReply(jobId: string) {

        console.log(`Getting LLM reply for job ${jobId}`)

        const replyMessage = new ChatMessageModel("ai");

        const url = new URL(`/api/llm`, location.origin);

        const fakeLLM = $devModeOptions.fakeLLM.toString();
        const params = new URLSearchParams({ jobId, fakeLLM });

        url.search = params.toString();
        const eventSource = new EventSource(url.toString());

        eventSource.addEventListener("llmEvent", (event) => {
            const llmEvent: LLMEvent = JSON.parse(event.data);
            console.log(`Received LLM event: ${JSON.stringify(llmEvent)}`)
            switch (llmEvent.type) {
                case "token":
                    // const textToAdd = formatLLMMessage(llmEvent.content.text);
                    const textToAdd = llmEvent.content.text;
                    replyMessage.addText(textToAdd);
                    break;
                case "toolStart":
                    replyMessage.upsertBlock({
                        id: llmEvent.runId,
                        type: "tool",
                        content: llmEvent,
                    });
                    break;
                case "toolEnd":
                    replyMessage.upsertBlock({
                        id: llmEvent.runId,
                        type: "tool",
                        content: llmEvent,
                    });
                    break;
                case "error":
                    break;
                case "end":
                    console.log("LLM session ended");
                    break;
                default:
                    console.log(`Unknown event type: ${llmEvent.type}`);
            }

            upsertMessage(replyMessage);
        });

        eventSource.addEventListener("end", () => {
            console.log("Received end event");
            eventSource.close();
        });

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }

    pendingApartentStore.subscribe((value) => {
        if (value.length === 0) {
            return;
        }
        console.log(`pendingProcessedApartments: ${JSON.stringify(value)}`);

        getLLMReply(value[0].id);
    });
</script>

<div class="llm-output">
    <section>
        <div class="container">
            <div class="chat-container">
                <div class="chat-body" id="chat-body" bind:this={chatBody}>
                    <div class="spacer" />
                    {#each $messages.values() as message (message.id)}
                        <ChatMessage model={message} />
                    {/each}
                </div>
                <!-- <ChatInput on:message={handleSendMessage} enableSubmit={true} /> -->
            </div>
        </div>
    </section>
</div>

<style>
    .llm-output {
        flex: 1;
        overflow: auto;
        padding: 1rem;
        background-color: #000000;
        color: #fff;
        max-height: 100%;
    }
</style>
