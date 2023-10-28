<script lang="ts">
    // import type { IChatMessage } from "$lib/types/chat-types";

    import type { ChatMessageModel } from "$lib/chat/ChatMessageModel";
    import TextBlock from "$lib/components/Chat/Blocks/TextBlock.svelte";
    import ToolBlock from "$lib/components/Chat/Blocks/ToolBlock.svelte";
    // import ToolBlock from "$lib/components/Chat/Blocks/ToolBlock.svelte";
    
    export let model: ChatMessageModel;
    
    let messageClass = model.role === "human" ? "sent" : "received";

    // console.log(`MODEL: ${JSON.stringify(model, null, 2)}`)

    // $: {
    //     if (model.role === "ai") {
    //         messageClass = "received";
    //     } else {
    //         messageClass = "sent";
    //     }
    // }

    // $: {
    //     console.log(`CHATTTT MODEL: ${JSON.stringify(model, null, 2)}`)
    // }

</script>

<div class="message {messageClass}">
    <!-- render the blocks -->
    
    {#each model.blocks as block}
        {#if block.type === "text"}
            <TextBlock content={block.content}/>
        {:else if block.type === "code"}
            <pre class="code-block">
                <code>{block.content}</code>
            </pre>
        {:else if block.type == "tool"}
            <ToolBlock content={block.content}/>
        {/if}
    {/each}
</div>

<style>
    .message {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 10px;
        margin-bottom: 10px;
        word-wrap: break-word;
        box-sizing: border-box;
    }

    .message code {
        font-size: 14px;
        font-family: "Roboto Mono", monospace;
    }

    .code-block {
        background-color: #000000ad;
        border-radius: 4px;
        max-width: 100%;
        padding: 10px;
        overflow: scroll;
    }

    .sent {
        background-color: #474747;
        border-radius: 4px 4px 0 4px;
        padding: 10px;
        color: #fff;
        font-size: 16px;
    }

    .received {
        /* background-color: #585eb6; */
        background: radial-gradient(circle at 0% 100%, #585eb6, #637b96);

        border-radius: 4px 4px 4px 0;
        padding: 10px;
        color: #fff;
        font-size: 16px;
    }
</style>
