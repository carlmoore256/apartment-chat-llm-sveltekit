import { readFileSync, writeFileSync } from 'fs';

export function loadJSON(filepath: string) {
    return JSON.parse(readFileSync(filepath, 'utf8'));
}

export function saveJSON(filepath: string, data: any) {
    writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}