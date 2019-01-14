const mongoose = require('mongoose');
const uuid = require('uuid/v4');

const categories = [
    
    require('./sports/sportsevent')
    
];

const EventSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: uuid
    },
    calendarRaw: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        required: true
    },
    schedule: {
        blocks: { // These are the badges of all blocks during which this event occurrs on that day.
            type: [ String ],
            default: null
        },
        start: {
            type: Date,
            default: null
        },
        end: {
            type: Date,
            default: null
        }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    flags: {
        changed: {
            type: Boolean,
            default: false
        },
        cancelled: {
            type: Boolean,
            default: false
        }
    },
    categories: {
        type: [ String ],
        default: []
    }
}, {
    collection: 'events'
});

for (const category of categories) {
    category.registerMiddleware(EventSchema);
}

const Event = mongoose.model('Event', EventSchema);

for (const category of categories) {
    category.register(Event);
}