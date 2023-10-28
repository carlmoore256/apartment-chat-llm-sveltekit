<script lang="ts">
    import type { LLMEvent } from "$lib/llm/LLMStreamHandler";
    import { hashStringToColor } from "$lib/utils/colors";
    import { camelToTitle } from "$lib/utils/text";

    export let content: LLMEvent[];

    // console.log(`FULL CONTENT! ${JSON.stringify(content, null, 2)}`);

    // for(const c of content) {
    //     console.log(`CONTENT: ${JSON.stringify(c, null, 2)}`);
    // }
    let referenceEvent = content.find((c) => c.content && c.name);
    let toolName = referenceEvent?.name || "Unnamed Tool";

    let toolId = referenceEvent?.runId;

    let input =
        content.find((c) => c.type === "toolStart")?.content.input || null;
    let output =
        content.find((c) => c.type === "toolEnd")?.content.output || null;


    $: {
        console.log(`TOOL ID: ${toolId} | INPUT: ${input} | OUTPUT: ${output}`)
    }
</script>

<!-- Here we might even want to split out into further components for each tool -->
<!-- p-6 bg-gray-900 rounded-lg -->
<div class="container">
    {#if content.length > 0}
        <div
            class="header"
            style={`background-color: ${hashStringToColor(toolName, 0.7, 0.8)}`}
        >
            <h1>{camelToTitle(toolName)} : {toolId}</h1>
            <div class="type-wrapper">
                <h4>Tool</h4>
            </div>
        </div>

        <div class="io">
            {#if input}
                <h5>Input</h5>
                <p>{input}</p>
            {/if}
            {#if output}
                <h5>Output</h5>
                <p>{output}</p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;

        padding: 8px;
        /* background-color: rgb(39, 85, 85); */
        border-radius: 4px;
        filter: drop-shadow(1px 0px 4px rgb(0, 0, 0));
    }

    .container {
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.808);
        border-radius: 6px;
        align-items: left;
        padding: 10px 20px;
    }

    h1 {
        text-align: left;
    }

    p {
        font-size: 14px;
        font-family: "Roboto Mono", monospace;
        text-align: left;
        margin: 5px 0;
    }

    .io {
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 10px;
    }

    .io p {
        font-family: 'Roboto Mono', monospace;
    }

    .type-wrapper {
        background-color: rgb(31, 31, 31);
        padding: 0px 10px;
        border-radius: 4px;
    }
</style>
