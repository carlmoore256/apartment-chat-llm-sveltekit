<script lang="ts">
    import type { IApartment } from "$lib/types/types";
    export let apartment: IApartment;
</script>

<!-- <a href={apartment.url} target="_blank" rel="noopener noreferrer"> -->
    <div
        class="card prevent-select rounded-lg overflow-hidden shadow-lg bg-gray-700 m-4"
    >
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-white">
                {apartment.name}
            </div>
            <p class="text-white text-base">{apartment.description}</p>
        </div>
    </div>
<!-- </a> -->

<style>
    .card {
        transition: all 0.2s ease-in-out;
    }

    .card:hover {
        transform: scale(1.03);
        background-color: rgba(240, 248, 255, 0.295);
    }
</style>
