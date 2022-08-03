//middleware to validate passenger inputs
const inputValidation = (req, res, next) => {
    const { keyWords, lostTimeSince, lostTimeUntil } = req.body;

    // Regex Pattern for Letters and Numbers
    const regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;

    // Regex Pattern to validate date format
    const dateRegex = /^(20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;

    // For comparation of dates to validate that passenger input is not a future date
    let date1 = new Date(lostTimeSince);
    let date2 = new Date(lostTimeUntil)
    let date3 = Date.now();

    if (lostTimeSince.match(dateRegex) === null
        || lostTimeUntil.match(dateRegex) === null
        || date1 > date3
        || date1 > date2
        || date2 > date3) {
        return res.status(400).json({ errorMessage: "Please enter a valid past date and time format yyyy-mm-ddThh:mm (e.g. 2000-01-01T00:00)" })
    }
    if (typeof keyWords !== "string"
        || keyWords.match(regex) === null
        || keyWords.length < 2) {
        return res.status(400).json({ errorMessage: "Please enter a valid keyword(at least 2 letters, only letters and numbers) TIP: brand, color, type of product" })
    }
    return next();
}

module.exports = inputValidation;
