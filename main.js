const fs = require("fs");

// ============================================================
function convertToSeconds(timeStr) {
    let [time, period] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;

    return hours * 3600 + minutes * 60 + seconds;
}
// Function 1: getShiftDuration(startTime, endTime)

// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm

// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm

// Returns: string formatted as h:mm:ss

// ============================================================
function getShiftDuration(startTime, endTime) {

    let startSeconds = convertToSeconds(startTime);
    let endSeconds = convertToSeconds(endTime);

    let diff = endSeconds - startSeconds;

    let hours = Math.floor(diff / 3600);
    diff = diff % 3600;

    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function convertToSeconds(timeStr){
    let [time, period] = timeStr.split(" ");
    let [h,m,s] = time.split(":").map(Number);

    if(period === "pm" && h !== 12){
        h += 12;
    }

    if(period === "am" && h === 12){
        h = 0;
    }

    return h*3600 + m*60 + s;
}

function getIdleTime(startTime, endTime){

    let start = convertToSeconds(startTime);
    let end = convertToSeconds(endTime);

    let startWork = convertToSeconds("8:00:00 am");
    let endWork = convertToSeconds("10:00:00 pm");

    let idle = 0;

    // idle before 8am
    if(start < startWork){
        idle += Math.min(end, startWork) - start;
    }

    // idle after 10pm
    if(end > endWork){
        idle += end - Math.max(start, endWork);
    }

    let hours = Math.floor(idle/3600);
    idle %= 3600;

    let minutes = Math.floor(idle/60);
    let seconds = idle % 60;

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    return `${hours}:${minutes}:${seconds}`;
}
// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function durationToSeconds(time){
    let [h,m,s] = time.split(":").map(Number);
    return h*3600 + m*60 + s;
}
function getActiveTime(shiftDuration, idleTime){

    let shift = durationToSeconds(shiftDuration);
    let idle = durationToSeconds(idleTime);

    let active = shift - idle;

    let hours = Math.floor(active/3600);
    active %= 3600;

    let minutes = Math.floor(active/60);
    let seconds = active % 60;

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    return `${hours}:${minutes}:${seconds}`;
}
// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function durationToSeconds(time){
    let [h,m,s] = time.split(":").map(Number);
    return h*3600 + m*60 + s;
}

function metQuota(date, activeTime){

    let active = durationToSeconds(activeTime);

    let normalQuota = durationToSeconds("8:24:00");
    let eidQuota = durationToSeconds("6:00:00");

    let quota = normalQuota;

    // check if date is inside Eid period
    if(date >= "2025-04-10" && date <= "2025-04-30"){
        quota = eidQuota;
    }

    return active >= quota;
}
// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(date, startTime, endTime, breakTime){

    let shiftTime = getShiftTime(startTime, endTime);
    let activeTime = getActiveTime(shiftTime, breakTime);
    let idleTime = getIdleTime(shiftTime, activeTime);
    let quotaMet = metQuota(date, activeTime);

    let newRecord = `${date},${startTime},${endTime},${breakTime},${shiftTime},${activeTime},${idleTime},${quotaMet}`;

    const fs = require("fs");

    let file = fs.readFileSync("shifts.txt", "utf8");
    file += "\n" + newRecord;

    fs.writeFileSync("shifts.txt", file);
}
// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
