export interface TabsService {
    label: string;
    active: boolean;
    flush(): void;
}