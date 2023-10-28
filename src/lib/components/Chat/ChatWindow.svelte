<script lang="ts">
    import { writable } from "svelte/store";
    import ChatInput from "./ChatInput.svelte";
    import type { IChatMessage } from "$lib/types/chat-types";
    import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";

    const messages = writable<Map<string, IChatMessage>>(
        new Map<string, IChatMessage>()
    );

    function clearMessages() {
        if ($messages.size > 0) {
            messages.update((m) => {
                m.clear();
                return m;
            });
        }
    }

    let chatBody;

    const scrollToBottom = async (node: Element) => {
        node.scroll({ top: node.scrollHeight, behavior: "instant" });
    };

    function insertMessage(message: IChatMessage) {
        messages.update((m) => {
            m.set(message.id, message);
            return m;
        });
    }

    async function handleSendMessage(event: any) {
        const sendMessage = event.detail as IChatMessage;
        insertMessage(sendMessage);
        // const replyMessage = createNewChatMessage("ai");
        // insertMessage(replyMessage);
    }

    async function resetChat(event: any) {
        // $currentSession = null;
        clearMessages();
    }

    let showChatSelector = false;

    function toggleChatSelector() {
        showChatSelector = !showChatSelector;
    }
</script>

<div class="chat-container">

    <div class="top-right circular-button">
        <button id="btn-open" on:click={toggleChatSelector}>=</button>
        <button id="btn-reset" on:click={resetChat}>&#x21bb;</button>
    </div>

    <div class="chat-body" id="chat-body" bind:this={chatBody}>
        <div class="spacer" />
        {#each $messages.values() as message (message.id)}
            <!-- <ChatMessage chatMessage={message} /> -->
        {/each}
    </div>
    <!-- must be authenticated to try to send a message -->
    <ChatInput on:message={handleSendMessage} enableSubmit={true} />
</div>

<style>
    .chat-container {
        position: relative;
        width: 100%;
        max-width: 500px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.286);
        font-family: "Roboto", sans-serif;
        background-color: #2e2f3f54;
        display: flex;
        height: 80vh;
        flex-direction: column;
        overflow: hidden;
    }
    .chat-body {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .top-right {
        display: flex;
        align-items: center;
        position: absolute;
        top: 10px;
        right: 10px;
        gap: 5px;
    }

    .spacer {
        flex-grow: 1;
    }
</style>
