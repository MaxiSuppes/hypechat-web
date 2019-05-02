import {JsonEncoder, MultiPartEncoder} from "./encoders";

export class Api {
    signUpUser(newUserData) {
        throw new Error("You have to implement the method");
    }

    loginUser(loginData) {
        throw new Error("You have to implement the method");
    }

    getOrganizations() {
        throw new Error("You have to implement the method");
    }

    getOrganization(organizationId) {
        throw new Error("You have to implement the method");
    }

    getUsers(organizationId) {
        throw new Error("You have to implement the method");
    }

    getChannels(organizationId) {
        throw new Error("You have to implement the method");
    }

    getForbiddenWords(organizationId) {
        throw new Error("You have to implement the method");
    }
}


export class RemoteApi extends Api {
    constructor(url) {
        super();
        this.url = url;
    }

    signUpUser(newUserData) {
        return this.call('/users', "POST", newUserData);
    }

    loginUser(loginData) {
        return this.call('/users/login', "POST", loginData);
    }

    getOrganizations() {
        return this.call('organizations/');
    }

    getOrganization(organizationId) {
        return this.call('organizations/' + organizationId);
    }

    getUsers(organizationId) {
        return this.call('organizations/' + organizationId + '/users');
    }

    getChannels(organizationId) {
        return this.call('organizations/' + organizationId + '/channels');
    }

    getForbiddenWords(organizationId) {
        return this.call('organizations/' + organizationId + '/forbidden-words');
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
            console.log(response);
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

        this.token = 'AS45234ASF236rehfda24534';
        this.organizations = {
            1:
                {
                    name: 'Eryx Cooperativa',
                    imageName: 'logo-eryx.png',
                    location: 'La calle 123',
                    creator: 'Maximiliano Suppes',
                    description: "Cooperativa de software",
                    welcomeMessage: "Gracias por unirte a Eryx",
                    activeUsers: ['Juan Perez', 'Ricardo Gonzalez', "Pablo Lopez"]
                },
            2:
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

        this.users = [
            {
                id: 'maxisuppes',
                email: 'maxi@suppes.com',
                password: 'asdasd'
            },
            {
                id: 'tomaslubertino',
                email: 'tomas@lubertino.com',
                password: 'asdasd'
            },
            {
                id: 'cristianraña',
                email: 'cris@raña.com',
                password: 'asdasd'
            }
        ];

        this.channels = ['general', 'random', 'otros'];

        this.forbiddenWords = ['Macri', 'Gato'];
    }

    signUpUser(newUserData) {
        this.users.push(newUserData);
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'token': self.token}).successResponse());
            }, 1000);
        });
    }

    loginUser(loginData) {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'token': self.token}).successResponse());
            }, 1000);
        });
    }

    getOrganizations() {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'organizations': self.organizations}).successResponse());
            }, 1000);
        });
    }

    getOrganization(organizationId) {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'organization': self.organizations[organizationId]}).successResponse());
            }, 1000);
        });
    }

    getUsers(organizationId) {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'users': self.users}).successResponse());
            }, 1000);
        });
    }

    getChannels(organizationId) {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'channels': self.channels}).successResponse());
            }, 1000);
        });
    }

    getForbiddenWords(organizationId) {
        let self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve(new FakeResponse({'forbiddenWords': self.forbiddenWords}).successResponse());
            }, 1000);
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
            return response['result'][key] = this._data[key];
        });

        return response;
    }
}