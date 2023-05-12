export function SetUsername(prefix, runningNo) {
    let degit = 6
    let no = runningNo + 1
    let value = prefix + String(no).padStart(degit, '0')

    return value;
}