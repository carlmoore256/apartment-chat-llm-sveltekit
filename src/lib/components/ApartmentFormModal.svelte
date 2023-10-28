<script lang="ts">
    import { modalOpen } from "$lib/stores/modalStore";
    import Modal from "./Modal.svelte";
    import { pendingApartentStore } from "$lib/stores/pendingApartmentStore";

    let name = "";
    let url = "https://www.apartments.com/amli-mark24-seattle-wa/twk16f9";

    async function submit() {
        const response = await fetch("/api/process", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, url }),
        });

        const { id } = await response.json();

        pendingApartentStore.update((currentStore) => {
            return [...currentStore, { id, name, url }];
        });
    }
</script>

<Modal bind:showModal={$modalOpen} onSubmit={submit}>
    <h3 slot="header" id="modal-title">New Apartment</h3>
    <div class="container">
        <div class="main-form">
            <label for="name" class="">Name:</label>
            <input
                type="text"
                id="name"
                class="input-style"
                bind:value={name}
            />

            <label for="url" class="">URL:</label>
            <input 
                type="text" 
                id="url" 
                class="input-style" 
                bind:value={url} 
            />
        </div>
        <!-- Add more input fields as necessary, following the pattern above -->
        <!-- ... -->
    </div>
</Modal>

<style>
    h3 {
        font-size: 1.2rem;
    }

    .container {
        max-width: 1280px;
        padding: 0px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .main-form {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .input-style {
        padding: 5px;
        margin: 5px 0;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
