/**
 * Created by Mason on 5/7/2017.
 */
const Ticket = require('../models/ticket');

module.exports = {
    showTickets: showTickets,
    showSingle: showSingle,
    seedTickets: seedTickets,
    removeTicket: removeTicket,
    addTicket: addTicket,
    editTickets: editTickets,
    updateTicket: updateTicket
};

function showTickets (req, res) {

    const tickets = Ticket.find({}, 'name link status slug', (err, tickets) => {
        if(err){
            console.log(err);
        }
        else{
            res.render('pages/tickets', { tickets: tickets});
        }
    });
}

function showSingle (req, res) {

    var slug = req.params.slug;
    const ticket = Ticket.findOne({slug : slug},'name link status slug notes' ,function(err, ticket){
        if(err) {
            console.log(err);
        }
        else {
            res.render('pages/single', {ticket: ticket});
        }
    })
}

function addTicket (req, res) {

    var link = "https://statsinc.atlassian.net/browse/"+req.body.link;
    const ticket = {
        name: req.body.name,
        link: link,
        status: req.body.status
    };

    var newTicket = new Ticket(ticket);
    newTicket.save(() => {
        showTickets(req, res);
    });
}

function editTickets (req, res) {

    var slug = req.params.slug;
    const ticket = Ticket.findOne({slug: slug},'name link status', function(err, ticket) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('pages/ticketEdit', {ticket: ticket});
        }
    })
}

function updateTicket (req, res) {

    var slug = req.body.slug;
    const ticket = Ticket.findOne({slug: slug},'name link status slug notes' , function(err, ticket) {
        if(err) {
            console.log(err);
        }
        else {
            ticket.notes = req.body.text;
            ticket.save( () => {
                res.render('pages/single', {ticket: ticket});
            });
        }
    })
}

function removeTicket (req, res) {

    var slug = req.params.slug;
    Ticket.findOne({slug: slug}).remove(() => {
        showTickets(req, res);
    })
}

function seedTickets (req, res) {

    const tickets = [
        {name: 'Build Solution via MSVC', link: 'https://statsinc.atlassian.net/browse/SVS-837', status: "In Development"}
    ];

    Ticket.remove({}, () => {
        for (ticket of tickets) {
            var newTicket = new Ticket(ticket);
            newTicket.save();
        }
    });

    res.send('Database seeded!');
}
