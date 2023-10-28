<script lang="ts">
    // import type { TextBlock } from "$lib/types/chat-types";
    export let content: string;
    // it would be nice to capture Action: ... and Action Input: ... 
</script>

<p>{@html content}</p>


<style>
    p {
        padding: 0 4px;
    }
</style>