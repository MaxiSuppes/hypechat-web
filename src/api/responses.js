
export class ErrorResponse {
    constructor(apiResponse) {
        this.status = apiResponse.status;
        this._message = apiResponse.statusText;
    }

    hasError() {
        return true;
    }

    error() {
        return "Ocurrió un error. Por favor intentálo de nuevo más tarde";
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
        return this.status() !== 'ACTIVE';
    }

    error() {
        if (this.status() === 'ALREADY_REGISTERED') {
            return "Ya existe un usuario con ese email o nombre de usuario";
        }

        return "Ocurrió un error al crear el usuario. Por favor intentálo más tarde";
    }

    user() {
        return this.result()['user'];
    }
}

export class LoginUserResponse extends Response {
    hasError() {
        return this.status() !== 'ACTIVE' || this.user()['role'] !== 'ADMIN'
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
        return this.status() !== 'LIST';
    }

    users() {
        return this._result['users'].filter(user => user['role'] !== "ADMIN");
    }

    usersByDate() {
        let usersByDay = [];
        const actualDate = new Date();

        const lastMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0);
        const lastDayInMonth = lastMonth.getDate();
        for (let day = 1; day <= lastDayInMonth; day++) {
            usersByDay.push({
                "users": 0,
                "day": day
            });
        }

        this.users().forEach(user => {
            const userCreationDate = new Date(user['created']);
            if (userCreationDate.getFullYear() === actualDate.getFullYear() && userCreationDate.getMonth() === actualDate.getMonth()) {
                let usersInSameDay = usersByDay[userCreationDate.getDate()]['users'];
                usersByDay[userCreationDate.getDate()]['users'] = usersInSameDay + 1;
            }
        });

        return usersByDay;
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

export class GetChannelsResponse extends Response {
    hasError() {
        return this.status() !== 'LIST';
    }

    channels() {
        return this._result['channels'];
    }
}

export class CreateChannelResponse extends Response {
    hasError() {
        return this.status() !== 'CREATED';
    }

    channel() {
        return this._result['team'];
    }
}

export class EditChannelResponse extends Response {
    hasError() {
        return this.status() !== 'UPDATED';
    }

    channel() {
        return this.result()['team'];
    }
}

export class DeleteChannelResponse extends Response {
    hasError() {
        return this.status() !== 'REMOVED';
    }
}

export class DeleteUserFromChannelResponse extends Response {
    hasError() {
        return this.status() !== 'REMOVED';
    }
}

export class AddUserResponse extends Response {
    hasError() {
        return this.status() !== 'ADDED';
    }

    error() {
        if (this.status() === 'ALREADY_REGISTERED') {
            return "El usuario ya está agregado";
        }

        return "No se pudo agregar al usuario";
    }
}

export class GetForbiddenWordsResponse extends Response {
    hasError() {
        return this.status() !== 'LIST';
    }

    words() {
        return this.result()['forbidden_words'];
    }
}

export class AddForbiddenWordResponse extends Response {
    hasError() {
        return this.status() !== 'ADDED';
    }
}

export class RemoveForbiddenWordResponse extends Response {
    hasError() {
        return this.status() !== 'REMOVED';
    }
}

export class GetMessagesStatsResponse extends Response {
    hasError() {
        return this.status() !== 'STATS';
    }

    messagesByTeam() {
        return this.result()['messages'];
    }

    messagesQuantity() {
        let messagesQuantity = 0;
        this.messagesByTeam().forEach(message => {
            messagesQuantity += message['direct'];
            messagesQuantity += message['channel'];
        });

        return messagesQuantity;
    }
}

export class GetBotsResponse extends Response {
    hasError() {
        return this.status() !== 'LIST';
    }

    bots() {
        return this.result()['bots'];
    }
}

export class CreateBotResponse extends Response {
    hasError() {
        return this.status() !== 'OK';
    }
}