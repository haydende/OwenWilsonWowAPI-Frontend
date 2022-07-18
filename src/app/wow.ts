import { Time } from "@angular/common";
import { Video } from "./video";

export class Wow {

    public readonly movie: string = "Movie Title";
    public readonly year: number = 1970;
    public readonly release_date: Date = new Date(1970, 1);
    public readonly director: string = "Director Name";
    public readonly character: string = "Owen Wilson's Character Name";
    public readonly movie_duration: Time = { hours: 1, minutes: 30 };
    public readonly timestamp: Time = { hours: 1, minutes: 30 };
    public readonly full_line: string = "Full version of the line featuring the Wow";
    public readonly current_wow_in_movie: number = 5;
    public readonly total_wows_in_movie: number = 5;
    public readonly poster: string = "Link to image of poster for movie";
    public readonly video: Video = new Video();
    public readonly audio: string = "Link to audio of scene featuring the Wow";

    public constructor(
    ) {

    }

}
