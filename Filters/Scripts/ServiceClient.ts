/// <reference path="jquery.d.ts" />

module Filters.ServiceClients { 

    export interface Logo { 
        Name: string;
        Description: string;
        Available: bool;
        ImageUrl: string;
        Category: string;
    }

    export class LogoService {

        constructor (public serviceUrl: string, public onSuccess: (data: Logo[]) => any) { }

        getAll() {            

            var r = $.ajax(this.serviceUrl, 
                           {
                               type: 'GET',
                               accepts: 'JSON',           
                               context: this,                    
                               success: this.getAllSucces,
                               error: this.handleError
                           });
        }

        private getAllSucces(data: Logo[], textStatus: string, jqXHR: JQueryXHR) {                     
            this.onSuccess(data);
        }

        private handleError(jqXHR: JQueryXHR, textStatus: string, errorThrow: string)
        {
            alert(errorThrow);
        }
    }
}
   