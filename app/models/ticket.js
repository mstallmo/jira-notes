/**
 * Created by Mason on 5/7/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name : String,
    link : String,
    status: String,
    notes: String,
    slug: {
        type: String,
        unique: true
    }
});

ticketSchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = ticketModel;

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}