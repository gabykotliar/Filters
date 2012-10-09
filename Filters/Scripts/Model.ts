module Filters.Model { 

    export interface Logo 
    { 
        Name: string;
        Description?: string;
        Available?: bool;
        ImageUrl?: string;
        Category?: string;
    }
}