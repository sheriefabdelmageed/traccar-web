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

Ext.define('Traccar.AttributeFormatter', {
    singleton: true,

    coordinateFormatter: function (value) {
        return value.toFixed(Traccar.Style.coordinatePrecision);
    },

    speedFormatter: function (value) {
        return Ext.getStore('SpeedUnits').formatValue(value, Traccar.app.getPreference('speedUnit'));
    },

    courseFormatter: function (value) {
        var courseValues = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return courseValues[Math.floor(value / 45)];
    },

    distanceFormatter: function (value) {
        return Ext.getStore('DistanceUnits').formatValue(value, Traccar.app.getPreference('distanceUnit'));
    },

    hoursFormatter: function (value) {
        var hours = Math.round(value / 3600000);
        return (hours + ' ' + Strings.sharedHourAbbreviation);
    },

    durationFormatter: function (value) {
        var hours, minutes;
        hours = Math.floor(value / 3600000);
        minutes = Math.round((value % 3600000) / 60000);
        return (hours + ' ' + Strings.sharedHourAbbreviation + ' ' + minutes + ' ' + Strings.sharedMinuteAbbreviation);
    },

    defaultFormatter: function (value) {
        if (typeof value === 'number') {
            return Number(value.toFixed(Traccar.Style.numberPrecision));
        } else if (typeof value === 'boolean') {
            return value ? Ext.Msg.buttonText.yes : Ext.Msg.buttonText.no;
        } else if (value instanceof Date) {
            if (Traccar.app.getPreference('twelveHourFormat', false)) {
                return Ext.Date.format(value, Traccar.Style.dateTimeFormat12);
            } else {
                return Ext.Date.format(value, Traccar.Style.dateTimeFormat24);
            }
        }
        return value;
    },

    getFormatter: function (key) {
        if (key === 'latitude' || key === 'longitude') {
            return this.coordinateFormatter;
        } else if (key === 'speed') {
            return this.speedFormatter;
        } else if (key === 'course') {
            return this.courseFormatter;
        } else if (key === 'distance' || key === 'odometer' || key === 'totalDistance') {
            return this.distanceFormatter;
        } else if (key === 'hours') {
            return this.hoursFormatter;
        } else if (key === 'duration') {
            return this.durationFormatter;
        } else {
            return this.defaultFormatter;
        }
    }
});
