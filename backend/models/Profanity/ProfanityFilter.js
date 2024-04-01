const mongoose = require('mongoose');

const profanilityFilterSchema = new mongoose.Schema(    {
        bannedWords: [String]
    });

const ProfanityFilter = mongoose.model('ProfanityFilter', profanilityFilterSchema);

module.exports = ProfanityFilter;