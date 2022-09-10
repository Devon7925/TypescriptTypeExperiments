type Join<T extends string[], R extends string = ""> = T extends [infer A extends string, ...infer B extends [string, ...string[]]] ? `${A}${R}${Join<B, R>}` : T[0];

type JoinTest = Join<["a", "b", "c"], "_">;