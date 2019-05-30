
export class ErrorResponse {
    constructor(apiResponse) {
        this._status = apiResponse.status;
        this._message = apiResponse.statusText;
    }

    message() {
        return this._message;
    }

    status() {
        return this._status;
    }
}

class Response {
    constructor(apiResponse) {
        this._result = apiResponse;
    }

    error() {
        return this._result["meesage"]
    }

    hasError() {
        throw new Error("You have to implement the method");
    }

    status() {
        return this._result['status']
    }

    result() {
        return this._result;
    }
}

export class SignUpUserResponse extends Response {
    hasError() {
        return this.status() === 'ALREADY_REGISTERED';
    }

    user() {
        return this.result()['user'];
    }
}

export class LoginUserResponse extends Response {
    hasError() {
        return this.status() === 'WRONG_CREDENTIALS';
    }

    user() {
        return this.result()['user'];
    }
}

export class GetTeamsResponse extends Response {
    hasError() {
        return this.status() === 'WRONG_CREDENTIALS';
    }

    teams() {
        return this.result()['teams'];
    }
}

export class CreateTeamResponse extends Response {
    hasError() {
        return this.status() === 'WRONG_CREDENTIALS';
    }

    team() {
        return this.result()['team'];
    }
}

export class EditTeamResponse extends Response {
    hasError() {
        return this.status() === 'WRONG_CREDENTIALS';
    }

    team() {
        return this.result()['team'];
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