type OneNine= '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Digit = '0' | OneNine;
type Lower = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
type Upper = Uppercase<Lower>;
type Letter = Lower | Upper;
type Alphanumeric = Digit | Letter;
type SymbolChar = '!' | '@' | '#' | '$' | '%' | '^' | '&' | '*' | '(' | ')' | '-' | '_' | '=' | '+' | '[' | ']' | '{' | '}' | '|' | ';' | ':' | "'" | '<' | '>' | ',' | '.' | '?' | '/';
type Character = Alphanumeric | SymbolChar;
type Whitespace<T extends string> = T extends `${' '|'\r'|'\n'|'\t'}${infer A extends string}`? Whitespace<A> extends string ? Whitespace<A> : never : T;
type InnerString<T extends string> = T extends `"${infer A}` ? A :T extends `\\${Character | '"' | '\\'}${infer A}`?InnerString<A>:T extends `${Character}${infer A}`?InnerString<A>:never
type JSONString<T extends string> = T extends `"${infer A}`? InnerString<A> extends never ? never : InnerString<A>: never;
type JSONDigits<T extends string> = T extends `${Digit}${infer A}`?JSONDigits<A> extends never?A:JSONDigits<A>:never
type JSONInteger<T extends string> = T extends `${""|"-"}${OneNine}${infer A}`?JSONDigits<A> extends never?T extends `${""|"-"}${Digit}${infer B}`?B:never:JSONDigits<A>:T extends `${""|"-"}${Digit}${infer A}`?A:never
type JSONFraction<T extends string> = T extends `.${infer A}`?JSONDigits<A>:T
type JSONExponent<T extends string> = T extends `${"e"|"E"}${""|"-"|"+"}${infer A}`?JSONDigits<A> extends string?JSONDigits<A>:T:T
type JSONNumber<T extends string> = JSONExponent<JSONFraction<JSONInteger<T>>> extends never ? never : JSONExponent<JSONFraction<JSONInteger<T>>>;
type JSONValue<T extends string> = T extends `${"null"|"true"|"false"}${infer A}`?A:JSONString<T> extends never?JSONNumber<T> extends never?JSONObject<T> extends never?JSONArray<T> extends never?never:JSONArray<T>:JSONObject<T>:JSONNumber<T>:JSONString<T>;
type JSONArray<T extends string> = T extends `[${infer A}`?Whitespace<A> extends `]${infer B}`?B:JSONElements<A> extends never?never:JSONElements<A> extends `]${infer B}`?B:never:never
type JSONElement<T extends string> = Whitespace<JSONValue<Whitespace<T>>>
type JSONElements<T extends string> = JSONElement<T> extends never?never:JSONElement<T> extends `,${infer A}`?JSONElements<A> extends never?never:JSONElements<A>:JSONElement<T>
type JSONObject<T extends string> = T extends `{${infer A}`?Whitespace<A> extends `}${infer B}`?B:JSONMembers<A> extends never?never:JSONMembers<A> extends `}${infer B}`?B:never:never
type JSONMember<T extends string> = Whitespace<JSONString<Whitespace<T>>> extends never?never:Whitespace<JSONString<Whitespace<T>>> extends `:${infer A}`?JSONElement<A>:never
type JSONMembers<T extends string> = JSONMember<T> extends never?never:JSONMember<T> extends `,${infer A}`?JSONMembers<A> extends never?never:JSONMembers<A>:JSONMember<T>

const JSONValidated = `{
        "name": "John",
        "age": 30,
        "type": null,
        "isAlive": true,
        "likesPizza": false,
        "cars": [
            "Ford",
            "BMW",
            "Fiat",
            -4.0E+4
        ]
    }`
const JSONValidator: JSONValue<typeof JSONValidated> = ""