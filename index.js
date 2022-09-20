function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(array){
    const newEmployee = array.map(createEmployeeRecord)
    return newEmployee;
}

function createTimeInEvent(object, dateTime){
    const array = dateTime.split(" ")
    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(array[1]),
        date: array[0]
    })
    return object;
}



function createTimeOutEvent(object, dateTime){
    const array = dateTime.split(" ")
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(array[1]),
        date: array[0]
    })
    return object;
}

function hoursWorkedOnDate(object, dateWeAreLookingFor){
    const foundInTime = object.timeInEvents.find(obj => obj.date === dateWeAreLookingFor )
    const foundOutTime = object.timeOutEvents.find(obj => obj.date === dateWeAreLookingFor)
    const workHours = foundOutTime.hour - foundInTime.hour
    console.log("this is a message",workHours);
    return (workHours / 100);
}

function wagesEarnedOnDate(object, dateWorked){
    //Must use hoursWorkedOnDate's output and multiply it by payPerHour key in employee record object.
    const foundInTime = object.timeInEvents.find(obj => obj.date === dateWorked )
    const foundOutTime = object.timeOutEvents.find(obj => obj.date === dateWorked)
    const workHours = foundOutTime.hour - foundInTime.hour
    
    return (workHours / 100) * object.payPerHour;
}

function allWagesFor(object){
    const dates = object.timeInEvents.map(obj => obj.date);
    //console.log(dates);
    const payDay = dates.reduce(function(total, acc){
        return total + wagesEarnedOnDate(object,acc)
    }, 0)
    console.log(payDay);
    return payDay;
}

function calculatePayroll(array){
    const payChecks = array.reduce(function(total, acc){
        return total += allWagesFor(acc)
    }, 0)
    return payChecks;
}
