export type Compilation = {
    chunks: Chunk[],
    plugin: (event: string, any) => void
}

export type Chunk = {
    name: string,
    hash: string
}

export type callbackFunction = (err?: any, result?: any) => void;