function clearEvent () {
    
}

function removeEvent () {
    if (currentDateTime > eventDateTime) {
        clearEvent ()
    }
}

