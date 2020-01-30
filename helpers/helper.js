function changeNumberFormat(number){
    number = String(number)
    let res = ""

    let count = 0
    for (let i = number.length - 1; i >= 0; i--){
        if (count == 3){
            count = 1
            res += "," + number[i]
        } else {
            count++
            res += number[i]
        }
    }
    return `Rp. ${res.split("").reverse().join("")},00`
}

function changeDurationFormat(number){
    let res

    if (number < 1){
        res = `${Math.round(number * 24)} Hours`
    } else if(number == 1) {
        res = `${Math.round(number)} Day`
    } else {
        res = `${Math.round(number)} Days`
    }
    
    return res
}

function changePhoneNumberFormat(number){
    this.phone_number = this.phone_number.replace(/\d{4}$/, 'XXXX')
    this.phone_number = this.phone_number.replace(/^0/, '+62')
}

function storeLocation(){
    let loc = `Pondok Indah Mall`
    return `https://www.google.com/maps/search/?api=1&query=` + encodeURIComponent(loc)
}

function searchDirection(loc){
    let origin = encodeURIComponent('Hacktiv8')
    let destination = encodeURIComponent(loc)
    const googledir = `https://www.google.com/maps/dir/?api=1`

    let res = googledir + `&origin=${origin}&destination=${destination}`
    return res
}


module.exports = { changeNumberFormat, changeDurationFormat, changePhoneNumberFormat, storeLocation, searchDirection}