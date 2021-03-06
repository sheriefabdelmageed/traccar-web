/*
 * Copyright 2015 Anton Tananaev (anton.tananaev@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.Application', {
    extend: 'Ext.app.Application',
    name: 'Traccar',

    requires: [
        'Traccar.Style',
        'Traccar.AttributeFormatter'
    ],

    models: [
        'Server',
        'User',
        'Group',
        'Device',
        'Position',
        'Attribute',
        'Command',
        'Event',
        'Geofence',
        'Notification',
        'AttributeAlias',
        'ReportSummary',
        'ReportTrip'
    ],

    stores: [
        'Groups',
        'Devices',
        'AllGroups',
        'AllDevices',
        'Positions',
        'LatestPositions',
        'Users',
        'Attributes',
        'MapTypes',
        'DistanceUnits',
        'SpeedUnits',
        'CommandTypes',
        'TimeUnits',
        'Languages',
        'Events',
        'Geofences',
        'AllGeofences',
        'Notifications',
        'AllNotifications',
        'GeofenceTypes',
        'AttributeAliases',
        'ReportRoute',
        'ReportEvents',
        'ReportTrips',
        'ReportSummary',
        'ReportTypes',
        'ReportEventTypes'
    ],

    controllers: [
        'Root'
    ],

    setUser: function (data) {
        var reader = Ext.create('Ext.data.reader.Json', {
            model: 'Traccar.model.User'
        });
        this.user = reader.readRecords(data).getRecords()[0];
    },

    getUser: function () {
        return this.user;
    },

    setServer: function (data) {
        var reader = Ext.create('Ext.data.reader.Json', {
            model: 'Traccar.model.Server'
        });
        this.server = reader.readRecords(data).getRecords()[0];
    },

    getServer: function () {
        return this.server;
    },

    getPreference: function (key, defaultValue) {
        return this.getUser().get(key) || this.getServer().get(key) || defaultValue;
    },

    showError: function (response) {
        var data;
        if (Ext.isString(response)) {
            Ext.Msg.alert(Strings.errorTitle, response);
        } else if (response.responseText) {
            data = Ext.decode(response.responseText);
            if (data.details) {
                Ext.Msg.alert(Strings.errorTitle, data.details);
            } else {
                Ext.Msg.alert(Strings.errorTitle, data.message);
            }
        } else if (response.statusText) {
            Ext.Msg.alert(Strings.errorTitle, response.statusText);
        } else {
            Ext.Msg.alert(Strings.errorTitle, Strings.errorConnection);
        }
    }
});
