import {
    AddForbiddenWordResponse,
    AddUserToChannelResponse,
    CreateChannelResponse,
    CreateTeamResponse,
    DeleteChannelResponse,
    DeleteUserFromChannelResponse,
    DeleteUserResponse,
    EditChannelResponse,
    EditTeamResponse,
    GetChannelsResponse,
    GetForbiddenWordsResponse,
    GetTeamsResponse,
    GetUserResponse,
    GetUsersResponse,
    LoginUserResponse,
    LogOutUserResponse,
    RemoveForbiddenWordResponse,
    SignUpUserResponse
} from "./responses";

export class ApiClient {
    constructor(api) {
        this.api = api;
    }

    buildResponse({result, successResponseClass, errorStatus = 400}) {
        let response;
        if (result.status === errorStatus) {
            response = result;
        } else {
            response = new successResponseClass(result);
        }

        return response;
    }

    signUpUser(newUserData, onResponse) {
        newUserData['role'] = "ADMIN";
        return this.api.signUpUser(newUserData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: SignUpUserResponse});
            onResponse(response);
        });
    }

    loginUser(loginData, onResponse) {
        return this.api.loginUser(loginData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: LoginUserResponse});
            onResponse(response);
        });
    }

    logOutUser(onResponse) {
        return this.api.logOutUser().then(result => {
            const response = this.buildResponse({result: result, successResponseClass: LogOutUserResponse});
            onResponse(response);
        });
    }

    getTeams(onResponse) {
        return this.api.getTeams().then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetTeamsResponse});
            onResponse(response);
        });
    }

    createTeam(newTeamData, onResponse) {
        const requestData = {
            "team_name": newTeamData['name'],
            "location": newTeamData['location'],
            "description": newTeamData['description'],
            "welcome_message": newTeamData['welcomeMessage']
        };

        return this.api.createTeam(requestData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: CreateTeamResponse});
            onResponse(response);
        });
    }

    editTeam(teamId, teamData, onResponse) {
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
            const response = this.buildResponse({result: result, successResponseClass: EditTeamResponse});
            onResponse(response);
        });
    }

    getUsers(teamId, onResponse) {
        return this.api.getUsers(teamId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetUsersResponse});
            onResponse(response);
        });
    }

    inviteUser(teamId, email, onResponse) {
        const requestData = {
            "email": email,
        };

        return this.api.inviteUser(teamId, requestData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetUsersResponse});
            onResponse(response);
        });
    }

    getUser(teamId, userId, onResponse) {
        return this.api.getUser(teamId, userId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetUserResponse});
            onResponse(response);
        });
    }

    deleteUser(teamId, userId, onResponse) {
        return this.api.deleteUser(teamId, userId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: DeleteUserResponse});
            onResponse(response);
        });
    }

    getForbiddenWords(teamId, onResponse) {
        return this.api.getForbiddenWords(teamId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetForbiddenWordsResponse});
            onResponse(response);
        });
    }

    addForbiddenWord(teamId, word, onResponse) {
        const requestData = {
            team_id: teamId,
            word: word
        };

        return this.api.addForbiddenWord(requestData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: AddForbiddenWordResponse});
            onResponse(response);
        });
    }

    deleteForbiddenWord(teamId, wordId, onResponse) {
        return this.api.deleteForbiddenWord(teamId, wordId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: RemoveForbiddenWordResponse});
            onResponse(response);
        });
    }

    getChannels(teamId, onResponse) {
        return this.api.getChannels(teamId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: GetChannelsResponse});
            onResponse(response);
        });
    }

    createChannel(teamId, newChannelData, onResponse) {
        newChannelData['team_id'] = teamId;

        return this.api.createChannel(newChannelData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: CreateChannelResponse});
            onResponse(response);
        });
    }

    editChannel(teamId, channelId, channelData, onResponse) {
        const mapFields = {
            'name': "name",
            'visibility': "visibility",
            "description": 'description',
            "welcomeMessage": 'welcome_message'
        };

        let requestData = {};
        Object.keys(channelData).forEach(fieldName => {
            if (channelData[fieldName] !== '' && channelData[fieldName] !== undefined) {
                requestData[mapFields[fieldName]] = channelData[fieldName];
            }
        });

        return this.api.editChannel(teamId, channelId, requestData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: EditChannelResponse});
            onResponse(response);
        });
    }

    deleteChannel(teamId, channelId, onResponse) {
        return this.api.deleteChannel(teamId, channelId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: DeleteChannelResponse});
            onResponse(response);
        });
    }

    getChannelInitialData(teamId, channelId, onResponse) {
        const getChannelsRequest = this.api.getChannels(teamId);
        const getChannelUsersRequest = this.api.getChannelUsers(teamId, channelId);
        const getTeamUsersRequest = this.api.getUsers(teamId);

        let data = {};
        Promise.all([getChannelsRequest, getChannelUsersRequest, getTeamUsersRequest]).then(function (results) {
            data["channels"] = new GetChannelsResponse(results[0]);
            data["users"] = new GetUsersResponse(results[1]);
            data["teamUsers"] = new GetUsersResponse(results[2]);
            onResponse(data);
        });
    }

    deleteUserFromChannel(teamId, channelId, userId, onResponse) {
        return this.api.deleteUserFromChannel(teamId, channelId, userId).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: DeleteUserFromChannelResponse});
            onResponse(response);
        });
    }

    addUserToChannel(teamId, channelId, userId, onResponse) {
        const requestData = {
            "team_id": teamId,
            "user_invited_id": userId,
            "channel_id": channelId
        };

        return this.api.addUserToChannel(requestData).then(result => {
            const response = this.buildResponse({result: result, successResponseClass: AddUserToChannelResponse});
            onResponse(response);
        });
    }
}
