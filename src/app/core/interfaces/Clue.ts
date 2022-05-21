export interface Clue {
    id: number;
    message: string;
    participant?: number;
    research?: number;
    round: number;
    type: number;
}