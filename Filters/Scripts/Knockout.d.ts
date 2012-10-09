interface ObservableNumber {
        (newValue: number): void;               
        (): number;                             
        subscribe: (callback: (newValue: number) => void) => void;
}
interface ObservableString {
        (newValue: string): void;               
        (): string;                             
        subscribe: (callback: (newValue: string) => void) => void;
}
interface ObservableBool {
    (newValue: bool): void;             
    (): bool;                               
    subscribe: (callback: (newValue: bool) => void) => void;
}

interface ObservableAny {
    (newValue: any): void;              
    (): any;                                
    subscribe: (callback: (newValue: any) => void) => void;
}

interface ObservableStringArray {
    (newValue: string[]): void;
    (): string[];
    remove: (value: String) => void;
    removeAll: () => void;
    push: (value: string) => void;
    indexOf: (value: string) => number;
}

interface ObservableAnyArray {
    (newValue: any[]): void;
    (): any[];
    remove: (value: any) => void;
    removeAll: () => void;
    push: (value: any) => void;
}

interface Computed {
    (): any;
}

interface Knockout {

    applyBindings(viewModel: any, rootNode?: any);

    observableArray(initialValues: any[]);

    observable: {
        (value: number): ObservableNumber;
        (value: string): ObservableString;
        (value: bool): ObservableBool;
        (value: any): ObservableAny;
};
    observableArray: {
        (value: string[]): ObservableStringArray;
        (value: any[]): ObservableAnyArray;
    };
    computed: {
        (func: () => any): Computed;
    };
}
