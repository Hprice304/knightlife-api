import React, { Component } from 'react';

// Styles
import './dashboard/Dashboard.css';

class Dashboard extends Component {
    
    constructor() {
        super();
        
        this.state = {
            date: ''
        }
    }

	render() {
		return (
			<div className="dashboard">
                <h1>Send updates</h1>
                <form>
                    <input type="date" value={ this.state.date } onchange={ this.updateSelectedDate }/>
                </form>
                <button onclick={ this.sendScheduleUpdate }>Schedule</button>
                <button onclick={ this.sendEventsUpdate }>Events</button>
                <button onclick={ this.sendLunchUpdate }>Lunch</button>
            </div>
		);
	}

    updateSelectedDate(event) {
        console.log("Updating selected date to: " + event.target.value);
        
        this.setState({
            date: event.target.value
        })
    }

    sendScheduleUpdate() {
        console.log("Sending schedule update with date: " + this.state.date);
        
        fetch('https://bbnknightlife.com/api/push/refresh/schedule', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date
            }),
        }); 
    }

    sendEventsUpdate() {
        console.log("Sending events update with date: " + this.state.date);

        fetch('https://bbnknightlife.com/api/push/refresh/events', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date
            }),
        });
    }
    
    sendLunchUpdate() {
        console.log("Sending lunch update with date: " + this.state.date);

        fetch('https://bbnknightlife.com/api/push/refresh/lunch', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date
            }),
        });
    }
}

export default Dashboard;