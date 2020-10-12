import { Type } from '@angular/core';

export interface WizardConfig {
    stepName: string;
    active?: boolean;
    componentType: Type<{}>;
}
