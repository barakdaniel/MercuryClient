import { Clue } from "./Clue";
import { GameConfiguration } from "./GameConfiguration";
import { Interaction } from "./Interaction";
import { Participant } from "./Participant";

export interface Research {
    id: number;
    researcher: number;
    research_name: string;
    research_description?: string;
    participants: Participant[];
    game_configuration: GameConfiguration;
    interactions: Interaction[];
    clue: Clue[];
}

