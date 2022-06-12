export const throttle = (f, t) => {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (
            previousCall === undefined || // function is being called for the first time
            this.lastCall - previousCall > t
        ) {
            // throttle time has elapsed
            f(args);
        }
    };
};

export const debounce = (f, t) => {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && this.lastCall - previousCall <= t) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    };
};

export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(true);
        script.onerror = () => {
            console.error(`Ошибка загрузки скрипта ${src}`);
            reject();
        }

        document.body.append(script);
    });
};

export const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
