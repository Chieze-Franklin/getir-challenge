let models = require('./models');

// Handle view contact info
exports.findRecords = function (req, res) {
    let filter = {};

    // specify fields to omit from the response
    let fieldsToOmit = { '_id': 0, 'value': 0 };

    let { startDate, endDate, minCount, maxCount } = req.body;

    if (startDate && endDate) {
        filter.createdAt = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
        filter.createdAt = { $gte: startDate };
    } else if (endDate) {
        filter.createdAt = { $lte: endDate };
    }

    // since totalCount is a computed field and does not exist in the database
    // i'll create this function to manually filter the result from the database
    let filterByTotalCount = record => {
        return record.totalCount >= (minCount || 0) // if minCount is undefined, use 0
            && record.totalCount <= (maxCount || Number.MAX_VALUE); // if maxCount is undefined, use the largest js number
    }

    models.record.find(filter, fieldsToOmit, function (err, records) {
        if (err) {
            return res.json({
                code: 1,
                msg: err.message
            });
        }

        res.json({
            code: 0,
            msg: 'Success',
            records: records.map(record => ({
                key: record.key,
                createdAt: record.createdAt,
                totalCount: record.get('totalCount')
            })).filter(filterByTotalCount)
        });
    });
};
