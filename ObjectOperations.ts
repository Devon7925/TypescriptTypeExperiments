type Keys<T extends object> = TuplifyUnion<keyof T>
type KeysToValues<Keys extends unknown[], T extends object> = {[K in keyof Keys]: T[Keys[K] & keyof T]}
type Values<T extends object> = KeysToValues<Keys<T>, T>
type KeysToEntrys<Keys extends unknown[], T extends object> = {[K in keyof Keys]: [Keys[K], T[Keys[K] & keyof T]]}
type Entrys<T extends object> = KeysToEntrys<Keys<T>, T>

const KeysTest: Keys<{ a: "string", b: 123, c: true }> = ['a', 'b', 'c']
const ValuesTest: Values<{ a: "string", b: 123, c: true }> = ['string', 123, true]
const EntrysTest: Entrys<{ a: "string", b: 123, c: true }> = [['a', 'string'], ['b', 123], ['c', true]]