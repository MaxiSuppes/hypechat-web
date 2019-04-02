import {JsonEncoder, MultiPartEncoder} from "./encoders";

export class Api {
    getOrganizations() {
        throw new Error("You have to implement the method");
    }
}


export class RemoteApi extends Api {
    constructor(url) {
        super();
        this.url = url;
    }

    getOrganizations() {
        return this.call('oficinas/');
    }

    private
    call(resourceUrl, method = 'GET', body = undefined, contentType = 'application/json') {
        let headers = {'Accept': 'application/json'};
        let encoder = this.encoderFor(contentType);
        let requestOptions = {method: method, headers: headers};

        if (method !== 'GET') {
            Object.assign(headers, encoder.headers());
            Object.assign(requestOptions, {body: encoder.encode(body)});
        }

        return fetch(this.url + resourceUrl, requestOptions).then((response) => {
            return response.json();
        });
    }

    private
    encoderFor(contentType) {
        let encoders = [new JsonEncoder(), new MultiPartEncoder()];
        return encoders.find(enc => enc.accepts(contentType));
    }
}


export class FakeApi extends Api {
    constructor(props) {
        super(props);

        this.organizations = {
            'Eryx':
                {
                    name: 'Eryx Cooperativa',
                    imageName: 'logo-eryx.png',
                    location: 'La calle 123',
                    creator: 'Maximiliano Suppes',
                    description: "Cooperativa de software",
                    welcomeMessage: "Gracias por unirte a Eryx",
                    activeUsers: ['Juan Perez', 'Ricardo Gonzalez', "Pablo Lopez"]
                },
            'Fiuba':
                {
                    name: 'Facultad de Ingeniería',
                    imageName: 'logo-fiuba.png',
                    location: 'Av.Paseo Colón 850',
                    creator: 'Maximiliano Suppes',
                    description: "Facultad de Ingeniería de la Universidad de Buenos Aires",
                    welcomeMessage: "Gracias por unirte a FIUBA",
                    activeUsers: ['Cristian Raña', 'Tomás Lubertino', "Maximiliano Suppes"]
                },
        };
    }

    getOrganizations() {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'organizations': self.organizations}).successResponse());
            }, 250);
        });
    }
}

class FakeResponse {
    constructor(data) {
        this._data = data;
    }

    successResponse() {
        let response = {
            errors: {},
            result: {}
        };

        Object.keys(this._data).map((key) => {
            response['result'][key] = this._data[key];
        });

        return response;
    }
}