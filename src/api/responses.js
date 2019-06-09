
export class ErrorResponse {
    constructor(apiResponse) {
        this.status = apiResponse.status;
        this._message = apiResponse.statusText;
    }

    hasError() {
        return true;
    }

    error() {
        return this._message;
    }
}

class Response {
    constructor(apiResponse) {
        this._result = apiResponse;
    }

    error() {
        return this._result["message"]
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

export class LogOutUserResponse extends Response {
    hasError() {
        return this.status() !== 'LOGGED_OUT';
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


export class GetUsersResponse extends Response {
    hasError() {
        return this.status() === 'WRONG_CREDENTIALS';
    }

    users() {
        return this._result['users'];
    }
}

export class GetUserResponse extends Response {
    hasError() {
        return this.status() !== 'ACTIVE';
    }

    user() {
        return this._result['user'];
    }
}

export class DeleteUserResponse extends Response {
    hasError() {
        return this.status() !== 'REMOVED';
    }
}