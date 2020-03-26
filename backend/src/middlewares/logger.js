const morgan = require('morgan');
const fs = require('fs');

// create a write stream (in append mode)
const logFileStream = fs.createWriteStream('/var/log/app.log', {
  flags: 'a'
});

const logger = morgan(
  (tokens, req, res) => {
    return [
      tokens['status'](req, res),
      ' [',
      tokens['method'](req, res),
      ']\t',
      tokens['url'](req, res),
      '\tHTTP/',
      tokens['http-version'](req, res),
      '\t| response time: ',
      tokens['response-time'](req, res),
      ' ms\t| FROM: ',
      tokens['user-agent'](req, res),
      ' - ',
      tokens['remote-addr'](req, res),
      '\t| DATE: ',
      tokens['date'](req, res, 'web')
    ].join('');
  },
  { stream: logFileStream }
);

module.exports.logger = logger;
