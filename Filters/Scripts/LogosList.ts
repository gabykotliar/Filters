/// <reference path="jquery.d.ts" />
/// <reference path="ServiceClient.ts" />
/// <reference path="knockout-2.1.0.js" />

var ko: any;

class LogoList {

    filtered: Filters.ServiceClients.Logo[];

    constructor () {        

        this.LoadLogos();
        this.filtered = ko.observableArray([]);
    }

    LoadLogos() {
        var client = new Filters.ServiceClients.LogoService('/api/logo',
                                                            data => {
                                                                console.log(Date.now().toString());
                                                                data.forEach((value, index) => { this.filtered.push(value); });
                                                                console.log(Date.now().toString());
                                                            });

        client.getAll();
    }
}



