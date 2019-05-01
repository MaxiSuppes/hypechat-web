import {getSetting} from '../settings/settings.js';
import {RemoteApi, FakeApi} from "../api/api.js";
import {ApiClient} from "../api/apiClient.js";

export class AppConfig {
    constructor() {
        this.client = undefined;
    }

    private
    setUpApi() {
        const remoteApiUrl = getSetting('API_URL');
        if (remoteApiUrl) {
            return new RemoteApi(remoteApiUrl);
        } else {
            return new FakeApi();
        }
    }

    private
    setUpApiClient() {
        const api = this.setUpApi();
        this.client = new ApiClient(api);
    }

    apiClient() {
        if (this.client === undefined) {
            this.setUpApiClient();
        }

        return this.client;
    }
}

export let app = new AppConfig();