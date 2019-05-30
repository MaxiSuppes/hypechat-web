import {
    CreateTeamResponse,
    EditTeamResponse,
    GetChannelsResponse,
    GetForbiddenWordsResponse,
    GetTeamsResponse,
    GetUsersResponse,
    LoginUserResponse,
    SignUpUserResponse
} from "./responses";

export class ApiClient {
    constructor(api) {
        this.api = api;
    }

    signUpUser(newUserData, onResponse = undefined) {
        return this.api.signUpUser(newUserData).then(result => {
            let response = new SignUpUserResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    loginUser(loginData, onResponse = undefined) {
        return this.api.loginUser(loginData).then(result => {
            let response = new LoginUserResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getTeams(onResponse = undefined) {
        return this.api.getTeams().then(result => {
            let response = new GetTeamsResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    createTeam(newTeamData, onResponse = undefined) {
        const requestData = {
            "team_name": newTeamData['name'],
            "location": newTeamData['location'],
            "description": newTeamData['description'],
            "welcome_message": newTeamData['welcomeMessage']
        };

        return this.api.createTeam(requestData).then(result => {
            let response = new CreateTeamResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    editTeam(teamId, teamData, onResponse = undefined) {
        const mapFields = {
            'name': "team_name",
            'location': "location",
            "description": 'description',
            "welcomeMessage": 'welcome_message'
        };

        let requestData = {};
        Object.keys(teamData).forEach(fieldName => {
            if (teamData[fieldName] !== '' && teamData[fieldName] !== undefined) {
                requestData[mapFields[fieldName]] = teamData[fieldName];
            }
        });

        return this.api.editTeam(teamId, requestData).then(result => {
            let response = new EditTeamResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getOrganization(organizationId, onResponse = undefined) {
        return this.api.getOrganization(organizationId).then(result => {
            let response = new GetTeamsResponse(result);
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
