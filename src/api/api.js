import {JsonEncoder, MultiPartEncoder} from "./encoders";
import {ErrorResponse} from "./responses";

export class Api {
    signUpUser(newUserData) {
        throw new Error("You have to implement the method");
    }

    loginUser(loginData) {
        throw new Error("You have to implement the method");
    }

    logOutUser() {
        throw new Error("You have to implement the method");
    }

    getTeams() {
        throw new Error("You have to implement the method");
    }

    createTeam() {
        throw new Error("You have to implement the method");
    }

    editTeam(teamId, newTeamData) {
        throw new Error("You have to implement the method");
    }

    getUsers(teamId) {
        throw new Error("You have to implement the method");
    }

    inviteUser(teamId, userData) {
        throw new Error("You have to implement the method");
    }

    getUser(userId) {
        throw new Error("You have to implement the method");
    }

    deleteUser(teamId, userId) {
        throw new Error("You have to implement the method");
    }
}


export class RemoteApi extends Api {
    constructor(url) {
        super();
        this.url = url;
    }

    signUpUser(newUserData) {
        return this.call({resourceUrl: '/users', method: "POST", body: newUserData, headersToHandle: ['X-Auth-Token']});
    }

    loginUser(loginData) {
        return this.call({resourceUrl: '/users/login', method: "POST", body:loginData, headersToHandle: ['X-Auth-Token']});
    }

    logOutUser() {
        return this.call({resourceUrl: '/users/logout', method: "POST", withAuthorization: true});
    }

    getTeams() {
        return this.call({resourceUrl: '/users/teams', withAuthorization: true});
    }

    createTeam(newTeamData) {
        return this.call({resourceUrl: '/teams', method: "POST", body: newTeamData, withAuthorization: true})
    }

    editTeam(teamId, newTeamData) {
        return this.call({resourceUrl: '/teams/' + teamId, method: "PATCH", body: newTeamData, withAuthorization: true})
    }

    getUsers(teamId) {
        return this.call({resourceUrl: '/teams/' + teamId + '/users', withAuthorization: true});
    }

    inviteUser(teamId, userData) {
        return this.call({resourceUrl: '/teams/' + teamId + '/invite', method: 'POST', body: userData, withAuthorization: true});
    }

    getUser(teamId, userId) {
        return this.call({resourceUrl: '/teams/' + teamId +  '/users/' + userId + '/profile', withAuthorization: true});
    }

    deleteUser(teamId, userId) {
        return this.call({resourceUrl: '/teams/' + teamId + '/users/' + userId, method: 'DELETE', withAuthorization: true});
    }


    private
    handleHeaders(response, headersToHandle) {
        headersToHandle.forEach(headerName => {
            const headerValue = response.headers.get(headerName);
            sessionStorage.setItem(headerName, headerValue);
        });
    }

    private
    call({resourceUrl, method = 'GET', body = undefined, contentType = 'application/json', withAuthorization = false, headersToHandle = []}) {
        let headers = {'Accept': 'application/json'};
        if (withAuthorization) {
            headers['X-Auth-Token'] = sessionStorage.getItem('X-Auth-Token');
        }
        let requestOptions = {method: method, headers: headers};

        let encoder = this.encoderFor(contentType);
        if (method !== 'GET') {
            if (body !== undefined) {
                Object.assign(headers, encoder.headers());
                Object.assign(requestOptions, {body: encoder.encode(body)});
            }
        }

        return fetch(this.url + resourceUrl, requestOptions).then((response) => {
            if (headersToHandle.length > 0) this.handleHeaders(response, headersToHandle);

            if (response.status === 200) {
                return response.json();
            }

            return new ErrorResponse(response);
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