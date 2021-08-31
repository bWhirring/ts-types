/**
 * 实现内置的Exclude <T，U>
 * 从T中排除可分配给U的那些类型
 */
type MyExclude<T, K> = T extends K ? never : T;

// Omit

type MyOmit<T, K> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

/**
 * 实现ReadOnly
 * interface Todo1 {
 *   title: string
 * }
 * */

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
 * `K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。
 * ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```
 */

type MyReadonly2<T, K = keyof T> = {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
} & T

/**
 * 实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。
 * 
 */

type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends undefined ? T[P] : DeepReadonly<T[P]>
}

/**
 * 元组转换为对象
 * const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
 * const result: TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 */

type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P;
};

/**
 * 实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。
 * type arr1 = ['a', 'b', 'c']  expected to be 'a'
 * type arr2 = [3, 2, 1] expected to be 3
 */

type First<T extends any[]> = T extends never[] ? never : T[0];

/**
 * 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。
 *
 * type tesla = ['tesla', 'model 3', 'model X', 'model Y']
 * type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
 * type teslaLength = Length<tesla> // expected 4
 * type spaceXLength = Length<spaceX> // expected 5
 */

type Length<T extends readonly any[]> = T["length"];

/**
 * 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
 * type X = Promise<string>
 * type Y = Promise<{ field: number }>
 */

type Awaited<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R
  : never;

/**
 * 不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 范型。
 * const fn = (v: boolean) => {
 *   if (v) return 1
 *   return 2
 * }
 * type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
 */
type MyReturnType<T> = T extends (...arg: any) => infer P ? P : any;
