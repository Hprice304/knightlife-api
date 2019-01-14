const mongoose = require('mongoose');
const redis = require(`${ __redis }`);

const ical = require('ical-toolkit');
const download = require('download');
const moment = require('moment');

// Implement promises for redis
const redisGet = require('util').promisify(redis.get).bind(redis);

module.exports.name = 'school';

module.exports.remote = true;

module.exports.fetchUpdates = async () => {
    const SchoolEvent = mongoose.model('SchoolEvent');

    const url = 'https://www.bbns.org/calendar/calendar_350.ics';

    const raw = await download(url);
    const ics = await ical.parseToJSON(raw);

    try {
        await handleICS(ics);
    } catch (err) {
        console.log(err);
    }

    console.log('Finished updating school events.');
}

async function handleICS(ics) {
    const Event = mongoose.model('Event');

    if (ics['VCALENDAR'] === undefined || ics['VCALENDAR'][0]['VEVENT'] === undefined) {
        console.log(`Found no events for school calendar.`);
        return;
    }

    ics['VCALENDAR'][0]['VEVENT'].forEach(async event => {
        const raw = JSON.stringify(event);
        const badge = event['UID'];

        const eventDocument = await Event.findOne({ 
            badge: badge
        });

        try {
            // Event already in system
            if (eventDocument) {
                // Raw data is the same, continue
                if (eventDocument.calendarRaw === raw) {
                    return;
                    // Need to update event
                } else {
                    const digested = digestEvent(event);

                    try {
                        for (const key in digested) {
                            eventDocument[key] = digested[key];
                        }

                        await eventDocument.save();

                        console.log(`Updated event ${ badge }`);
                    } catch (err) {
                        console.log(err);
                    }
                }
            } else {
                const digested = digestEvent(event);

                if (digested === undefined) {
                    //                    console.log('Recieved an unparsable event.');
                    return;
                }

                try {
                    await mongoose.model('SchoolEvent').create(digested);

                    console.log(`Created event ${ badge }`);
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    });
}

function digestEvent(event) {
    let output = {
        schedule: {}
    };

    output.badge = event['UID'];

    const dateFormat = 'YYYYMMDD HHmmss';

    // Invalid event if it doesn't have a date.
    if (event['DTSTART'] === undefined && event[''] === undefined) {
        console.log(`Recieved an invalid event.`);
        return;
    }

    output.schedule.start = event['DTSTART'] ? (moment.utc(event['DTSTART'], dateFormat).toDate()) : null;
    output.schedule.end = event['DTEND'] ? (moment.utc(event['DTEND'], dateFormat).toDate()) : null;

    const start = output.schedule.start;

    if (start === null) {
        output.date = moment.utc(event['DTSTART;VALUE=DATE'], 'YYYYMMDD').toDate();
    } else {
        output.date = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    }

    output.calendarRaw = JSON.stringify(event);

    output.title = event['SUMMARY'];
    output.location = event['LOCATION'];

    return output;
}