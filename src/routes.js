let router = require('express').Router();

// use the root route to give info on how to use the API
router.get('/', function (req, res) {
    res.json({
        code: 0,
        msg: 'To get a collection of records, send a POST request to "/" endpoint.\n' +
            'The body of the POST request should contain the following fields:\n' +
            '"startDate": This field should contain a date in the “YYYY-MM-DD” format.\n' +
            '   Records created on or after this date will be returned.' +
            '"endDate": This field should contain a date in the “YYYY-MM-DD” format.\n' +
            '   Records created on or before this date will be returned.' +
            '"minCount": Records with “totalCOunt” greater than or equal to this value will be returned.' +
            '"maxCount": Records with “totalCOunt” less than or equal to this value will be returned.'
    });
});

module.exports = router;