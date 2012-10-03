/// <reference path="jquery.d.ts" />
/// <reference path="ServiceClient.ts" />
/// <reference path="knockout-2.1.0.js" />

class LogoList {

    filtered: Filters.ServiceClients.Logo[];

    constructor () {        

        this.LoadLogos();
        this.filtered = [];        
    }

    LoadLogos() {
        var client = new Filters.ServiceClients.LogoService('/api/logo',
                                                            data => {
                                                                //this.filtered.push(data[0]);
                                                                this.filtered.concat(data);

                                                                var ko: any;

                                                                ko.observableArray(this.filtered);

                                                                ko.applyBindings(this);
                                                            });

        client.getAll();
    }
}



