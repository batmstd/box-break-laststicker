import React from 'react';

export const CODE = "code";

export const VALID_CODE = "valid";

export const useLocalStorage = () => {

    const set = (key, value) => localStorage.setItem(key, value);

    const get = (key) => localStorage.getItem(key);

    const remove = (key) => localStorage.removeItem(key);

    return {get, set, remove};
}

export const useTicker = (func, timeout, autoStart= true) => {
    const t = new IntervalTicker(func, timeout, false);
    React.useEffect(() => {
        if (autoStart) {
            t.start();
        }
        return () => t.stop();
    }, [autoStart]);
    return { start: () => t.start(), stop: () => t.stop() };
};

class IntervalTicker {

    func;
    tick;

    starting = false;
    id;

    constructor(func, tick, autoStart = true) {
        this.func = func;
        this.tick = tick;
        if (autoStart) {
            this.start();
        }
    }

    start() {
        if (this.id) {
            return;
        }

        this.starting = true;

        this.func();
        if (this.starting) {
            this.id = setInterval(this.func, this.tick);
        }
    }

    stop() {
        this.starting = false;
        if (!this.id) {
            return;
        }
        clearInterval(this.id);
        this.id = undefined;
    }
}