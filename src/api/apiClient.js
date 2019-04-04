import {GetOrganizationsResponse, GetOrganizationResponse, GetUsersResponse, GetChannelsResponse,
    GetForbiddenWordsResponse
} from "./responses";

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

    getOrganization(organizationId, onResponse = undefined) {
        return this.api.getOrganization(organizationId).then(result => {
            let response = new GetOrganizationResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getUsers(organizationId, onResponse = undefined) {
        return this.api.getUsers(organizationId).then(result => {
            let response = new GetUsersResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getChannels(organizationId, onResponse = undefined) {
        return this.api.getChannels(organizationId).then(result => {
            let response = new GetChannelsResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getForbiddenWords(organizationId, onResponse = undefined) {
        return this.api.getForbiddenWords(organizationId).then(result => {
            let response = new GetForbiddenWordsResponse(result);
            if (onResponse) onResponse(response);
        });
    }
}