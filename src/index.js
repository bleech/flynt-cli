#!/usr/bin/env node
import yargs from 'yargs'

import handleCommand from './utils/handleCommand'
import buildArguments from './utils/buildArguments'
import proxyCommand from './utils/proxyCommand'

const commands = [
  'create',
  'setup',
  'install',
  'upgrade',
  'start',
  'build',
  'clone',
  'deploy'
]

const proxyCommandsRoot = [
  'composer',
  'wp'
]

const proxyCommandsTheme = [
  'yarn',
  'gulp'
]

let cli = yargs
.usage('Usage: $0 <command> [<subcommand>] [options]')

commands.forEach(function (command) {
  const cmdObject = require(`./${command}`)
  cli = cli.command(command,
    cmdObject.description,
    buildArguments(cmdObject, cmdObject.srcEnv || 'argv.env', cmdObject.destEnv, cmdObject.options),
    handleCommand(cmdObject, cmdObject.srcEnv || 'argv.env', cmdObject.destEnv)
  )
})
proxyCommandsRoot.forEach(function (command) {
  cli = cli.command(command,
    `Run ${command} in project folder`,
    {},
    proxyCommand(command)
  )
})
proxyCommandsTheme.forEach(function (command) {
  cli = cli.command(command,
    `Run ${command} in theme folder`,
    {},
    proxyCommand(command, 'theme')
  )
})
cli.option('skipReadConfig', {
  global: true,
  describe: 'Do not read config from file',
  type: 'boolean'
})
.option('skipWriteConfig', {
  global: true,
  describe: 'Do not write config to file',
  type: 'boolean'
})
.option('configPath', {
  global: true,
  default: './.flynt.json',
  describe: 'File to read from and save config to.',
  type: 'string'
})
.option('e', {
  alias: ['env', 'environment'],
  global: true,
  default: 'local',
  describe: 'Specify current environment',
  type: 'string'
})
.option('f', {
  alias: 'force',
  global: true,
  describe: 'Force execution in current directory',
  type: 'boolean'
})
.option('v', {
  alias: 'verbose',
  global: true,
  describe: 'Use verbose mode',
  type: 'boolean',
  default: true
})
.version()
.help()
.wrap(null)
.locale('en')
.demandCommand(1, 'You have to specify a command.')
.recommendCommands()
.showHelpOnFail(true)
.argv
