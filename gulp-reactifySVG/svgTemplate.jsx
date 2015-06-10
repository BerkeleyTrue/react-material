var React = require('react');

<% _.forEach(icons, function(icon) { %>
exports['<%= icon.name %>'] = (<%= icon.svg %>);<% }) %>
