
//middleware to validate the creation of new items
const itemValidation = (req, res, next) => {
    const { typeOfProduct, brand, color, lostDate } = req.body;

    // For comparation of dates to not allow create items with future dates
    let date1 = new Date(lostDate);
    let date2 = Date.now();

    // Regex Pattern for Letters and Numbers
    const regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;

    // Regex Pattern to validate date format
    const dateRegex = /^(20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;

    if (typeof typeOfProduct !== "string"
        || typeOfProduct.match(regex) === null
        || typeOfProduct.length < 3) {
        return res.status(400).json({ errorMessage: "Please enter a valid type of product(at least 3 letters, only letter and numbers)" })
    }
    if (typeof brand !== "string"
        || brand.match(regex) === null
        || brand.length < 2) {
        return res.status(400).json({ errorMessage: "Please enter a valid brand(at least 2 letters, only letters and numbers)" })
    }
    if (typeof color !== "string"
        || color.match(regex) === null
        || color.length < 3) {
        return res.status(400).json({ errorMessage: "Please enter a valid color, only letters and numbers" })
    }
    if (lostDate.match(dateRegex) === null || date1 > date2) {
        return res.status(400).json({ errorMessage: "Please enter a valid past date and time format yyyy-mm-ddThh:mm (e.g. 2000-01-01T00:00)" })
    }
    return next()

}


module.exports = itemValidation;