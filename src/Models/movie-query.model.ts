/**
 * Here we describe what a `MovieQuery` should look like
 */
interface MovieQuery {
    id? : number,
    title?: string,
    year?: string,
    orderDir: string,
    orderBy: string,
    limit : number,
    offset : number
}


export type {
    MovieQuery
}