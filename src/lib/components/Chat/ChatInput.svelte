<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let enableSubmit = false;
    let text = "";

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        if (text == "") return;
        dispatch("message", text);
        text = "";
    }

</script>

<div class="chat-header">
    <form class="chat-form" on:submit|preventDefault={handleSubmit}>
        <input
            bind:value={text}
            type="text"
            placeholder="Type a message..."
            id="user-input"
            autocomplete="off"
        />
        {#if enableSubmit}
            <button type="submit" id="btn-submit">Send</button>
        {:else}
            <button type="button" id="btn-submit" disabled>
                Send
            </button>
        {/if}
    </form>
</div>

<style>

    .chat-form {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        gap: 10px;
        background-color: #1d1d1d;
        border-top: 1px solid #333;
        width: 100%;
        position: sticky;
        bottom: 0;
    }

    .chat-header {
        width: 100%;
        height: 60px;
        background-color: #ffffff15;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }

    .chat-form input {
        width: 80%;
        height: 40px;
        border-radius: 20px;
        border: none;
        padding: 0 20px;
        font-size: 16px;
        outline: none;
        background-color: #fff;
        color:#1d1d1d;
    }

    .chat-form button {
        width: 15%;
        height: 40px;
        border-radius: 20px;
        border: none;
        background-color: #585eb6;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        transition-duration: 300ms;
    }

    .chat-form button:hover {
        background-color: #333;
    }

    .chat-form button:disabled {
        background-color: #888;
        color: #ccc;
        cursor: not-allowed;
    }
</style>
