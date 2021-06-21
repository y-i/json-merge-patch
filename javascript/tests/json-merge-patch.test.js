import * as JsonMergePatch from '../src/json-merge-patch.js';

test.each([
    [{"a":"b"},{"a":"c"},{"a":"c"}],
    [{"a":"b"},{"b":"c"},{"a":"b","b":"c"}],
    [{"a":"b"},{"a":null},{}],
    [{"a":"b","b":"c"},{"a":null},{"b":"c"}],
    [{"a":["b"]},{"a":"c"},{"a":"c"}],
    [{"a":"c"},{"a":["b"]},{"a":["b"]}],
    [{"a":{"b":"c"}},{"a":{"b":"d","c":null}},{"a":{"b":"d"}}],
    [{"a":{"b":"c"}},{"a":[1]},{"a":[1]}],
    [["a","b"],["c","d"],["c","d"]],
    [{"a":"b"},["c"],["c"]],
    [{"a":"foo"},null,null],
    [{"a":"foo"},"bar","bar"],
    [{"e":null},{"a":1},{"e":null,"a":1}],
    [[1,2],{"a":"b","c":null},{"a":"b"}],
    [{},{"a":{"bb":{"ccc":null}}},{"a":{"bb":{}}}],
])('mergePatch Appendix %#',(target,patch,expectedResult)=>{
    const result = JsonMergePatch.mergePatch(target, patch);

    expect(result).toStrictEqual(expectedResult);
});

test('mergePatch1', () => {
    const target = {
        "a": "b",
        "c": {
            "d": "e",
            "f": "g"
        }
    };

    const patch = {
        "a": "z",
        "c": {
            "f": null
        }
    };

    const expectedResult = { a: 'z', c: { d: 'e' } };

    const result = JsonMergePatch.mergePatch(target, patch);

    expect(result).toStrictEqual(expectedResult);
});

test('mergePatch2', () => {
    const target = {
        "title": "Goodbye!",
        "author": {
            "givenName": "John",
            "familyName": "Doe"
        },
        "tags": ["example", "sample"],
        "content": "This will be unchanged"
    }
        ;

    const patch = {
        "title": "Hello!",
        "phoneNumber": "+01-123-456-7890",
        "author": {
            "familyName": null
        },
        "tags": ["example"]
    };

    const expectedResult = {
        "title": "Hello!",
        "author": {
            "givenName": "John"
        },
        "tags": ["example"],
        "content": "This will be unchanged",
        "phoneNumber": "+01-123-456-7890"
    };

    const result = JsonMergePatch.mergePatch(target, patch);

    expect(result).toStrictEqual(expectedResult);
});

test.each([
    [{ "a": "b" }, { "a": "c" }, { "a": "c" }],
    [{ "a": "b" }, { "b": "c" }, { "a": "b", "b": "c" }],
    [{ "a": "b" }, { "a": null }, {}],
    [{ "a": "b", "b": "c" }, { "a": null }, { "b": "c" }],
    [{ "a": ["b"] }, { "a": "c" }, { "a": "c" }],
    [{ "a": "c" }, { "a": ["b"] }, { "a": ["b"] }],
    [{ "a": { "b": "c" } }, { "a": { "b": "d", "c": null } }, { "a": { "b": "d" } }],
    [{ "a": { "b": "c" } }, { "a": [1] }, { "a": [1] }],
    [["a", "b"], ["c", "d"], ["c", "d"]],
    [{ "a": "b" }, ["c"], ["c"]],
    [{ "a": "foo" }, null, null],
    [{ "a": "foo" }, "bar", "bar"],
    [{ "e": null }, { "a": 1 }, { "e": null, "a": 1 }],
    [[1, 2], { "a": "b", "c": null }, { "a": "b" }],
    [{}, { "a": { "bb": { "ccc": null } } }, { "a": { "bb": {} } }],
])('generatePatch Appendix #%#', (source, _, target) => {
    const patch = JsonMergePatch.generatePatch(source, target);
    const result = JsonMergePatch.mergePatch(source, patch);

    expect(result).toStrictEqual(target);
});

test('generatePatch1', () => {
    const source = {
        "a": "b",
        "c": {
            "d": "e",
            "f": "g"
        }
    };

    const target = { a: 'z', c: { d: 'e' } };

    const patch = JsonMergePatch.generatePatch(source, target);
    const result = JsonMergePatch.mergePatch(target, patch);

    expect(result).toStrictEqual(target);
});

test('mergePatch2', () => {
    const source = {
        "title": "Goodbye!",
        "author": {
            "givenName": "John",
            "familyName": "Doe"
        },
        "tags": ["example", "sample"],
        "content": "This will be unchanged"
    };


    const target = {
        "title": "Hello!",
        "author": {
            "givenName": "John"
        },
        "tags": ["example"],
        "content": "This will be unchanged",
        "phoneNumber": "+01-123-456-7890"
    };

    const patch = JsonMergePatch.generatePatch(source, target);
    const result = JsonMergePatch.mergePatch(target, patch);

    expect(result).toStrictEqual(target);
});
