export class Video {

    private readonly _1080p: string = "Link to 1080p video of Wow";
    private readonly _720p: string = "Link to 720p video of Wow";
    private readonly _480p: string = "Link to 480p video of Wow";
    private readonly _360p: string = "Link to 360p video of Wow";

    public get "1080p"(): string {
        return this._1080p;
    }

    public get "720p"(): string {
        return this._720p;
    }

    public get "480p"(): string {
        return this._480p;
    }

    public get "360p"(): string {
        return this._360p;
    }

}
