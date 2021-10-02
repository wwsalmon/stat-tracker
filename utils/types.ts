export type StatTypeOpts = "note" | "number" | "score";

export const StatTypeOptsArr = ["note", "number", "score"];

export interface StatObj {
    id: string,
    name: string,
    type: StatTypeOpts,
    color: string,
}