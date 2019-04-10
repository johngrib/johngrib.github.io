const template = `
    <div>
        <div v-for="item in timers">
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">{{item.name}}</small>
                            <small class="text-muted">{{(item.elapsed) | toTimeFormat}}</small>
                            <div class="btn-group">
                                <button v-if="item.on"
                                    type="button" class="btn btn-danger" v-on:click="toggle(item)">Stop</button>
                                <button v-else
                                    type="button" class="btn btn-success" v-on:click="toggle(item)">Start</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div v-for="(logData, actName) in getHistory()">
                <span>{{ actName }}</span>
                <ul>
                    <li v-for="log in logData">
                        {{ log.dateStr }} {{ log.elapsed | toTimeFormat }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
`;

const TIMER_KEY = 'farm-timer-timers';
const HISTORY_KEY = 'farm-timer-history';
const LOG_KEY = 'farm-timer-log';

Vue.component('timer-list', {
    template,
    props: {
        timers: Array,
    },
    computed: {},
    filters: {
        toTimeFormat
    },
    methods: {
        toggle: function(state) {
            state.on = !state.on;

            if (state.on) {
                this.start(state);
                return;
            }
            this.stop(state);
        },
        reset: function(state) {
            state.save = 0;
            state.started = 0;
            state.elapsed = 0;
            state.on = false;
            setData(TIMER_KEY, timers);
        },
        getElapsed: function(state) {
            return new Date().getTime() - state.started + state.save;
        },
        start: function(state) {
            console.log('start pressed')
            state.date = getToday();
            state.started = new Date().getTime();
            state.elapsed = state.save;
            setData(TIMER_KEY, timers);
            console.log(state)
        },
        stop: function(state) {
            console.log('stop pressed')

            const now = new Date().getTime();

            state.end = now;
            state.save += now - state.started;

            console.log(state.started);

            setData(TIMER_KEY, timers);
            console.log(state)
            saveLog(state);
            updateHistory(state);
        },
        getHistory: function() {
            const showHistory = {};

            for (let actName in history) {
                const record = history[actName];
                const act = [];

                for (let date in record) {
                    act.push(record[date]);
                }
                showHistory[actName] = act.sort((a, b) => a.date < b.date ? 1 : -1);
            }

            return showHistory;
        }
    }
})

let timers;
let history;
let log;

function toTimeFormat(timestamp) {
    const hours = parseInt(timestamp / 36e5, 10);
    const time = new Date(timestamp);
    return hours + ':' + time.getUTCMinutes() + ':' + time.getUTCSeconds();
}

function saveLog(state) {
    let activity = log[state.name];

    if (!activity) {
        activity = [];
    }
    activity.push({
        date: state.date,
        started: state.started,
        end: state.end
    });

    log[state.name] = activity;
    setData(LOG_KEY, log);
}

function getDateLog(state) {
    const today = getToday();

    const data = log[state.name].sort(function(s1, s2) {
        return s1.date - s1.date;
    });

    const activity = data.reduce(function(data, curr) {
        if (!data[curr.date]) {
            data[curr.date] = {
                date: curr.date,
                dateStr: new Date(curr.date).toLocaleDateString(),
                elapsed: 0,
            };
        }
        const h = data[curr.date];
        h.elapsed += curr.end - curr.started;
        return data;
    }, {});

    return activity;
}

function updateHistory(state) {

    const activity = getDateLog(state);
    const historyData = history[state.name] ? history[state.name] : {};
    const dateList = Object.keys(activity);

    dateList.forEach(function(date) {
        historyData[date] = activity[date];
    });

    history[state.name] = historyData;
    setData(HISTORY_KEY, history);

    // window.aa = activity;
    // window.hh = history;
    // window.ll = log;

    // log 일부 삭제
    if (dateList.length < 2) {
        return;
    }

    const minDate = dateList.reduce(function(a, b) {
        return (a < b) ? a : b;
    });

    const reducedLog = log[state.name]
        .filter(function(item) {
            return item.date > minDate;
        });

    log[state.name] = reducedLog;

    console.log('activity');
    console.log(activity.length);
}

(function main() {
    const data = localStorage.getItem(TIMER_KEY);
    console.log(data);
    if (!isValidJSONArrayString(data)) {
        initStorage();
    }
    timers = getData(TIMER_KEY);

    const hist = localStorage.getItem(HISTORY_KEY);
    console.log(HISTORY_KEY, hist);
    if (!isValidJSONString(hist)) {
        initHistory();
    }
    history = getData(HISTORY_KEY);

    const logData = localStorage.getItem(LOG_KEY);
    console.log(LOG_KEY, logData);
    if (!isValidJSONString(logData)) {
        initLog();
    }
    log = getData(LOG_KEY);
})();

function isValidJSONArrayString(str) {
    return (typeof str === 'string') && /^\[\{.*\}\]$/.test(str);
}

function isValidJSONString(str) {
    return (typeof str === 'string') && /^\{.*\}$/.test(str);
}

function initStorage() {
    let timers = [{
        name: '운동',
        on: false,
        save: 0,
        started: 0,
        elapsed: 0,
        date: getToday(),
    }, {
        name: '공부',
        on: false,
        save: 0,
        started: 0,
        elapsed: 0,
        date: getToday(),
    }];
    setData(TIMER_KEY, timers);
}

function initHistory() {
    setData(HISTORY_KEY, {});
}

function initLog() {
    setData(LOG_KEY, {});
}

function getToday() {
    return getDateStarted(new Date());
}

function getDateStarted(dateObj) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return startOfDay.getTime();
}

function setData(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

new Vue({
    el: '#my-timers',
    data: {
        timers
    }
});

const tick = 1000;

setTimeout(function upd() {
    timers = timers.map(function(item) {
        if (item.on) {
            item.elapsed = new Date().getTime() - item.started + item.save;
        }
        return item;
    });
    setTimeout(upd, tick)
}, tick);
