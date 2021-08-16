export function parseStack(stack: string, sep: string = ') '): Array<string> {
    const parsedStack: Array<string> = [];
    let line: string = '', char: string = '', prevChar: string = '';
    let [prevCharShouldBe, charShouldBe] = sep.split('');
    let i: number = 0;
    while (i < stack.length) {
        char = stack[i];
        if (prevChar === prevCharShouldBe && char === charShouldBe) {
            parsedStack.push(line);
            line = '';
            continue;
        }
        line += char;
        prevChar = char;
        i++;
    }
    parsedStack.push(line);
    return parsedStack;
}

export function formatNumber(num: string) {
    if (num.match(/\D/)) {
        throw new TypeError('The passed string contains non-number characters.')
    }
    num = num
        .split('')
        .reverse()
        .join('')
        .replace(/\d{3}/g, '$&,')
        .split('')
        .reverse()
        .join('');
    if (num.startsWith(',')) {
        return num.slice(1);
    }
    return num;
}