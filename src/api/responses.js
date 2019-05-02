
class Response {
    constructor(apiResponse) {
        this._errors = apiResponse['errors'];
        this._result = apiResponse['result'];
    }

    errors() {
        return this._errors;
    }

    hasErrors() {
        return Object.keys(this._errors).length > 0;
    }
}

export class SignUpUserResponse extends Response {
    token() {
        return this._result['auth_token'];
    }
}

export class LoginUserResponse extends Response {
    token() {
        return this._result['auth_token'];
    }
}

export class GetOrganizationsResponse extends Response {
    organizations() {
        return this._result['organizations'];
    }
}

export class GetOrganizationResponse extends Response {
    organization() {
        return this._result['organization'];
    }
}

export class GetUsersResponse extends Response {
    users() {
        return this._result['users'];
    }
}

export class GetChannelsResponse extends Response {
    channels() {
        return this._result['channels'];
    }
}

export class GetForbiddenWordsResponse extends Response {
    forbiddenWords() {
        return this._result['forbiddenWords'];
    }
}