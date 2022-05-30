import { Clue } from "./Clue";
import { GameAppearance } from "./GameAppearance";

export interface Participant {
    id: number;
    email: string;
    character_name: string;
    daily_mission_score: number;
    was_killer: boolean;
    killer_round: number;
    game_appearance: GameAppearance;
    clue: Clue[];
}

