type Replace<S extends string, From extends string, To extends string> = S extends `${infer Head}${From}${infer Rest}` ? `${Head}${To}${Replace<Rest, From, To>}` : S;
type Split<S extends string, Delimiter extends string> = S extends `${infer Head}${Delimiter}${infer Rest}` ? [Head, ...Split<Rest, Delimiter>] : [S];
type Contains<S extends string, Substring extends string> = S extends `${string}${Substring}${string}` ? true : false;

const ReplaceTest:[
    Replace<'t y p e s c r i p t', ' ', ''>,
    Replace<'t y p e s c r i p t', 't', 'T'>,
    Replace<'abbbabbbba', "bb", "c">,
] = [
    'typescript',
    'T y p e s c r i p T',
    'acbacca',
];

const SplitTest: [
    Split<'t y p e s c r i p t', ' '>,
    Split<'t y p e s c r i p t', 't'>,
    Split<'abbbabbbba', "bb">,
] = [
    ['t', 'y', 'p', 'e', 's', 'c', 'r', 'i', 'p', 't'],
    ['', ' y p e s c r i p ', ''],
    ['a', 'ba', '', 'a'],
];

const ContainsTest: [
    Contains<'t y p e s c r i p t', ' '>,
    Contains<'t y p e s c r i p', 't'>,
    Contains<'t y p e s c r i p', 'p'>,
    Contains<'t y p e s c r i p t', 'o'>,
    Contains<'t y p e s c r i p t', 'y p'>,
    Contains<'abbbabbbba', "bb">,
] = [
    true,
    true,
    true,
    false,
    true,
    true,
];