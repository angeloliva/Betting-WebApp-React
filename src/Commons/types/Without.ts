export type Without<T, Keys extends keyof T> = Pick<T, Exclude<keyof T, Keys>>
