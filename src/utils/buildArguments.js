import _ from 'lodash'

import handleCommand from './handleCommand'

export default function buildArguments (commandObject, fromEnv, toEnv, options = {}) {
  return function (yargs) {
    commandObject.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', options, handleCommand(commandObject, fromEnv, toEnv, cmd))
    })
    _.forIn(options, function (value, key) {
      yargs.option(key, value)
    })
    return yargs
  }
}
