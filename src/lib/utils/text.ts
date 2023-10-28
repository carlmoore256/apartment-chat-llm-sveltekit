export function camelToTitle(camelStr: string): string {
    let result: string[] = [camelStr[0].toUpperCase()];

    for (let i = 1; i < camelStr.length; i++) {
        let char = camelStr[i];

        if (char === char.toUpperCase()) {
            result.push(' ', char);
        } else {
            result.push(char);
        }
    }

    return result.join('');
}
