// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var data = require('../../data'),
    notifications = require('../../notifications'),
    attachOperators = require('../../query/attachOperators');

module.exports = function (configuration) {
    var dataProvider = data(configuration),
        notificationsClient = notifications(configuration.notifications).getClient();

    return function (req, res, next) {
        req.azureMobile = {
            req: req,
            res: res,
            data: dataProvider,
            push: notificationsClient,
            tables: function (name) {
                return attachOperators(name, dataProvider(configuration.tables[name]));
            }
        };
        next();
    };
};
