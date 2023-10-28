<script>
    import ApartmentCard from "./ApartmentCard.svelte";
    import { apartmentStore } from "$lib/stores/apartmentStore";
    import { pendingApartentStore } from "$lib/stores/pendingApartmentStore";
    import ApartmentFormModal from "./ApartmentFormModal.svelte";
    import PendingApartmentCard from "./PendingApartmentCard.svelte";
    import { modalOpen } from "$lib/stores/modalStore";
    import { devModeOptions } from "$lib/stores/devModeOptions";
</script>


<div class="w-64 flex flex-col p-4 overflow-auto bg-gray-900">
    <div class="container">
        <div class="dev-options">
            <h3>Dev Options</h3>

            <ul>
                <li>
                    <input type="checkbox" bind:checked={$devModeOptions.fakeLLM} />
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Fake LLM</label>
                </li>

            </ul>
        </div>
        <div class="cards-container">
            {#each $pendingApartentStore as pending (pending.id)}
                <PendingApartmentCard {pending}/>
            {/each}
        </div>
    
        <div class="cards-container">
            {#each $apartmentStore as apartment (apartment.id)}
                <ApartmentCard {apartment} />
            {/each}
        </div>
    
        <div class="flex-grow">
            <div class="absolute inset-x-6 bottom-0 h-16">
                <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    on:click={() => $modalOpen = true}
                    >Add Apartment</button
                >
            </div>
        </div>

    </div>
    <ApartmentFormModal/>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 10px;
    }

    .cards-container {
        background-color: rgba(240, 248, 255, 0.068);
        border-radius: 6px;
    }


    .dev-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .dev-options ul {
        padding: 10px;
        background-color: rgba(66, 165, 79, 0.068);
    }
</style>
