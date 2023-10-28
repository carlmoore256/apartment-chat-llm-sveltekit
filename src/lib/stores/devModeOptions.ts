import { writable } from 'svelte/store';

interface IDevModeOptions {
    fakeLLM: boolean;
    foo: string;
}


export const devModeOptions = writable<IDevModeOptions>({
    fakeLLM: true,
    foo: "bar"
})