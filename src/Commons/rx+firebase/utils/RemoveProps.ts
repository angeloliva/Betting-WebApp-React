export type RemoveProps<P, Q> = object & Pick<P, Exclude<keyof P, keyof Q>>
