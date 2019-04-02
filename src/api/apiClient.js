import {GetOrganizationsResponse} from "./responses";

export class ApiClient {
    constructor(api) {
        this.api = api;
    }

    getOrganizations(onResponse = undefined) {
        return this.api.getOrganizations().then(result => {
            let response = new GetOrganizationsResponse(result);
            if (onResponse) onResponse(response);
        });
    }
}
