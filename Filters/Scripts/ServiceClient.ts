/// <reference path="jquery.d.ts" />
/// <reference path="Model.ts" />

module Filters.ServiceClients {

    export class LogoService {

        private onSuccess: (data: Model.Logo[]) => any;
        
        constructor (public serviceUrl: string) {
             
        }

        getAll(successCallback: (data: Model.Logo[]) => any) {            

            this.onSuccess = successCallback;

            var r = $.ajax(this.serviceUrl, 
                           {
                               type: 'GET',
                               accepts: 'JSON',           
                               context: this,                    
                               success: this.getAllSucces,
                               error: this.handleError
                           });
        }

        private getAllSucces(data: Model.Logo[], textStatus: string, jqXHR: JQueryXHR) {
            this.onSuccess(data);
        }

        private handleError(jqXHR: JQueryXHR, textStatus: string, errorThrow: string)
        {
            alert(errorThrow);
        }
    }
}
   