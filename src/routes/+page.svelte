<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import ContentGrid from "$lib/components/ContentGrid.svelte";
    import LlmConsole from "$lib/components/LLMConsole.svelte";
</script>

<div class="h-screen flex flex-col bg-gray-800 text-white">
    <!-- <Navbar /> -->

    <div class="flex flex-row flex-grow overflow-hidden">
        <Sidebar />

        <div class="right-content">
            <LlmConsole />
            <!-- <div class="llm-output" /> -->

            <div class="divider" />
        </div>
    </div>
</div>

<style>

    .right-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
    }

    .divider {
        height: 1px;
        background-color: #ffffff44;
    }
</style>
