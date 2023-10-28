<script lang="ts">
    import type { IPendingProcessedApartment } from "$lib/types/types";
    export let pending: IPendingProcessedApartment;
</script>

<div
    class="card prevent-select rounded-lg overflow-hidden shadow-lg bg-green-700 m-4"
>
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-white">
            {pending.name}
        </div>
        <!-- <p class="text-white text-base">{apartment.description}</p> -->
    </div>
</div>

<style>
    .card {
        transition: all 0.2s ease-in-out;
    }

    .card:hover {
        transform: scale(1.03);
        background-color: rgba(240, 248, 255, 0.295);
    }
</style>
