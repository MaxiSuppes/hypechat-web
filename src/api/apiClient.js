import {
    CreateTeamResponse,
    DeleteUserResponse,
    EditTeamResponse,
    GetTeamsResponse,
    GetUserResponse,
    GetUsersResponse,
    LoginUserResponse,
    LogOutUserResponse,
    SignUpUserResponse
} from "./responses";

export class ApiClient {
    constructor(api) {
        this.api = api;
    }

    signUpUser(newUserData, onResponse = undefined) {
        newUserData['role'] = "ADMIN";
        return this.api.signUpUser(newUserData).then(result => {
            let response;
            if (result.status === 400) {
                response = result;
            } else {
                response = new SignUpUserResponse(result);
            }

            if (onResponse) onResponse(response);
        });
    }

    loginUser(loginData, onResponse = undefined) {
        return this.api.loginUser(loginData).then(result => {
            let response;
            if (result.status === 404) {
                response = result;
            } else {
                response = new LoginUserResponse(result);
            }

            if (onResponse) onResponse(response);
        });
    }

    logOutUser(onResponse = undefined) {
        return this.api.logOutUser().then(result => {
            console.log("result", result);
            let response;
            if (result.status !== "LOGGED_OUT") {
                response = result;
            } else {
                sessionStorage.removeItem("X-Auth-Token");
                sessionStorage.removeItem("userName");
                response = new LogOutUserResponse(result);
            }

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

    getUsers(teamId, onResponse = undefined) {
        return this.api.getUsers(teamId).then(result => {
            let response = new GetUsersResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    inviteUser(teamId, email, onResponse = undefined) {
        const requestData = {
            "email": email,
        };

        return this.api.inviteUser(teamId, requestData).then(result => {
            let response = new GetUsersResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    getUser(teamId, userId, onResponse) {
        return this.api.getUser(teamId, userId).then(result => {
            let response = new GetUserResponse(result);
            if (onResponse) onResponse(response);
        });
    }

    deleteUser(teamId, userId, onResponse) {
        return this.api.deleteUser(teamId, userId).then(result => {
            let response = new DeleteUserResponse(result);
            if (onResponse) onResponse(response);
        });
    }
}
