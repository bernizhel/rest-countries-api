import {parseStack} from "../utils/utils";

describe('Testing parseStack function.', () => {
    let testStack: string;
    let testParsed: Array<string>;
    beforeEach(() => {
        testStack = 'at DetailedCountry (http://localhost:3000/static/js/main.chunk.js:2328:73) at ErrorBoundary (http://localhost:3000/static/js/main.chunk.js:515:5) at Route (http://localhost:3000/static/js/vendors~main.chunk.js:44272:29) at Switch (http://localhost:3000/static/js/vendors~main.chunk.js:44474:29) at div at O (http://localhost:3000/static/js/vendors~main.chunk.js:51599:6) at Router (http://localhost:3000/static/js/vendors~main.chunk.js:43907:30)';
        testParsed = [
            'at DetailedCountry (http://localhost:3000/static/js/main.chunk.js:2328:73)',
            'at ErrorBoundary (http://localhost:3000/static/js/main.chunk.js:515:5)',
            'at Route (http://localhost:3000/static/js/vendors~main.chunk.js:44272:29)',
            'at Switch (http://localhost:3000/static/js/vendors~main.chunk.js:44474:29)',
            'at div at O (http://localhost:3000/static/js/vendors~main.chunk.js:51599:6)',
            'at Router (http://localhost:3000/static/js/vendors~main.chunk.js:43907:30)',
        ];
    });

    test('+++ returns the array on passing down the stack', () => {
        const parsed: Array<string> = parseStack(testStack);
        for (let i = 0; i < parsed.length; i++) {
            expect(parsed[i]).toEqual(testParsed[i]);
        }
    })
})