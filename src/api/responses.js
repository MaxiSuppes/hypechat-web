
class Response {
    constructor(apiResponse) {
        this._errors = apiResponse['errors'];
        this._result = apiResponse['result'];
    }

    errors() {
        return this._errors;
    }
}


export class GetOrganizationsResponse extends Response {
    organizations() {
        return this._result['organizations'];
    }
}

