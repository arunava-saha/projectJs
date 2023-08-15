let alarms = [];
let alarmTimeout;

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    currentTimeElement.textContent = currentTime;
}

// Update current time every second
setInterval(updateCurrentTime, 1000);

class Alarm {
    constructor(time) {
        this.time = time;
        this.timeout = null;
    }

    set(callback) {
        const now = new Date();
        const alarmDate = new Date(now.toDateString() + ' ' + this.time);

        const timeDifference = alarmDate - now;

        if (timeDifference > 0) {
            this.timeout = setTimeout(callback, timeDifference);
            return true;
        }

        return false;
    }

    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}


function addAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    const alarm = new Alarm(alarmTime);

    if (alarm.set(() => {
        alert('Alarm! It\'s ' + alarmTime);
    })) {
        alarms.push(alarm);
        updateAlarmList();
        console.log('Alarm set for ' + alarmTime);
    } else {
        alarms.push(alarm);
        updateAlarmList();
        console.log('Alarm set for ' + alarmTime);
    }
}

function deleteAlarm(index) {
    const alarm = alarms[index];
    alarm.clear();
    alarms.splice(index, 1);
    updateAlarmList();
    console.log('Alarm deleted');
}

function updateAlarmList() {
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = '';

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('li');
        alarmItem.classList.add('alarm-item');
        alarmItem.innerHTML = `
            <span class="alarm-time">${alarm.time}</span>
            <span class="alarm-actions">
                <button class="remove-button" onclick="deleteAlarm(${index})">Remove</button>
            </span>
        `;
        alarmList.appendChild(alarmItem);
    });
}
