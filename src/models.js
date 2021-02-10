var mongoose = require('mongoose');

// setup record schema
var recordSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
// add the computed field 'totalCount'
recordSchema.virtual('totalCount').get(function() {
    return this.get('counts').reduce((sum, count) => sum + count, 0);
});

module.exports = {
    record: mongoose.model('record', recordSchema)
}
