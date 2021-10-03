export type StatTypeOpts = "note" | "number" | "score";

export const StatTypeOptsArr = ["note", "number", "score"];

export interface StatObj {
    id: string,
    name: string,
    type: StatTypeOpts,
    color: string,
}

export interface RecordObj {
    id: string,
    createdAt: {seconds: number, nanoseconds: number},
    stats: RecordStatObj[],
}

export interface RecordStatObj {
    statId: string,
    value: string | number,
}