export type WithoutID<T> = Pick<T, Exclude<keyof T, "id">>
