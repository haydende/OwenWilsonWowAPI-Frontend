import { Injectable } from "@angular/core";
import { ColourMode } from "../model/colour-mode.model";

@Injectable()
export class ColourModeToggleService {

    private currentMode: ColourMode = ColourMode.DARK;

}