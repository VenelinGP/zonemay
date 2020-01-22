export interface IMenu {
    _id: string;
    id: number;
    name: string;
    submenu?: [{
        _id: string;
        id: number;
        name: string;
    }];
}
