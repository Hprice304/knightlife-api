const mongoose = require('mongoose');

class Module {

	constructor(id, name, permissions, icon) {
		this.id = id;
		this.name = name;
		this.permissions = permissions;
		this.icon = icon; // Feather icon name: https://feathericons.com
	}

}

// Define all available user modules.
const modules = [
	// Top-level modules
	new Module('schedule', 'Scheduling', [ 'schedule' ], 'clock'),
	new Module('messages', 'Push Messages', [ 'messaging' ], 'message-square'),
	new Module('lunch', 'Lunch Menus', [ 'lunch' ], 'coffee'),
	new Module('events', 'Events', [ 'event' ], 'calendar'),
	new Module('news', 'News', [ 'news' ], 'globe'),
	new Module('accounts', 'Accounts', [ 'accounts' ], 'users'),

	// Secondary modules
	new Module('colorwars', 'Color Wars', [ 'event.category.colorwars' ], 'zap'),
	new Module('snowdays', 'Snow Days', [ 'news.add', 'schedule' ], 'cloud-snow')
];
module.exports.modules = modules;

