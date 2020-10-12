import { ActivationEnd } from '@angular/router'

export interface StepService {
    active: boolean;
    stepName: string;
    show(): void;
    hide(): void;

}