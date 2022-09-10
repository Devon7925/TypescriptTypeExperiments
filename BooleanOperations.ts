type Not<T extends boolean> = T extends true ? false : true;
type Or<A extends boolean, B extends boolean> = A extends true ? true : B extends true ? true : false;
type And<A extends boolean, B extends boolean> = Not<Or<Not<A>, Not<B>>>;
type Xor<A extends boolean, B extends boolean> = Or<And<A, Not<B>>, And<Not<A>, B>>;
type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>;
type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>;
type Xnor<A extends boolean, B extends boolean> = Not<Xor<A, B>>;

const NotTest: [Not<true>, Not<false>] = [false, true];
const OrTest: [Or<true, true>, Or<true, false>, Or<false, true>, Or<false, false>] = [true, true, true, false];
const AndTest: [And<true, true>, And<true, false>, And<false, true>, And<false, false>] = [true, false, false, false];
const XorTest: [Xor<true, true>, Xor<true, false>, Xor<false, true>, Xor<false, false>] = [false, true, true, false];
const NorTest: [Nor<true, true>, Nor<true, false>, Nor<false, true>, Nor<false, false>] = [false, false, false, true];
const NandTest: [Nand<true, true>, Nand<true, false>, Nand<false, true>, Nand<false, false>] = [false, true, true, true];
const XnorTest: [Xnor<true, true>, Xnor<true, false>, Xnor<false, true>, Xnor<false, false>] = [true, false, false, true];