import { makeAutoObservable } from 'mobx';

export default class BasketStore {
    constructor() {
        this._devices = [];
        this._status = false;
        makeAutoObservable(this);
    };

    setDevices(devices) {
        this._devices = devices;
    };
    setStatus() {
        this._status = !this._status;
    };

    get devices() {
        return this._devices;
    };
    get status() {
        return this._status;
    };
};
