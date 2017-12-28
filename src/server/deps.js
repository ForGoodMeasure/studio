import AWS from 'aws-sdk';
import util from 'util';

const awscredentials = {
  region: 'us-west-1',
  secretAccessKey: process.env.aws_key,
  accessKeyId: process.env.aws_id
};

const async = require('async');
const lambda = new AWS.Lambda(awscredentials);
const cloudwatchlogs = new AWS.CloudWatchLogs(awscredentials);
const cloudwatch = new AWS.CloudWatch(awscredentials);
const stamp = () => new Date().getTime();
const LOG_GROUP_NAME = '';
const METRICS_NAMESPACE = '';

module.exports = class Deps {
  constructor() {
    this.logs = [];
    this.metrics = [];
    this.invokeLambda = invokeLambda.bind(this);
    this.log = addLog.bind(this);
    this.pushLogs = pushLogs.bind(this);
  }
}

function invokeLambda(params, cb) {
  const requestTime = new Date().getTime();
  lambda.invoke(params, (err, res) => {
    if (err) {
      this.logs.push({
        message: JSON.stringify(err),
        timestamp: stamp()
      });
    } else {
      this.logs.push({
        message: JSON.stringify({
          RequestTime: requestTime,
          ElapsedTime: stamp() - requestTime,
          RequestPayload: params.Payload,
          FunctionName: params.FunctionName,
          StatusCode: res.StatusCode,
          ResponsePayload: JSON.parse(res.Payload)
        }),
        timestamp: stamp()
      });
    }
    cb(err, res);
  });
}

function addLog(log) {
  const safeLog = util.inspect(log, {
    depth: 8
  });
  if (process.env.node_env === 'dev' || process.env.prod_test === 'yes' ) {
    return console.log(safeLog);
  }
  this.logs.push({
    message: safeLog,
    timestamp: stamp()
  });
}

function pushLogs(callback) {
  if (process.env.node_env === 'dev' ) {
    return;
  }
  const logStreamName = new Date().toDateString().replace(/\W+/g, '-');
  const logGroupName = LOG_GROUP_NAME;
  async.auto({
    getExistingStream: cb => cloudwatchlogs.describeLogStreams({
        logGroupName,
        logStreamNamePrefix: logStreamName
      }, (err, res) => {
        if (err || !res) {
          return cb(err);
        }
        const existingStream = res.logStreams.find(el =>
          el.logStreamName === logStreamName
        );
        cb(null, existingStream);
    }),
    getValidStream: ['getExistingStream', (results, cb) => {
      if (results.getExistingStream) {
        return cb(null, results.getExistingStream);
      }
      cloudwatchlogs.createLogStream({
        logGroupName,
        logStreamName
      }, cb)
    }],
    putLogEvents: ['getValidStream', (results, cb) => {
      cloudwatchlogs.putLogEvents({
        logStreamName,
        logGroupName,
        logEvents: this.logs,
        sequenceToken: results.getValidStream.uploadSequenceToken
      }, cb)
    }]
  }, (err, res) => {
    if(err) {
      console.log(err);
    }
    callback && callback(err, res);
  });
}
