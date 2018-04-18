import replaceInFiles from '../utils/replaceInFiles'
import * as allPrompts from '../prompts'

export const description = 'replace project specific strings in theme files'

export const runMessage = 'Replacing strings in theme files...'

export const requirements = [
]

export const prompts = [
  allPrompts.themeName,
  allPrompts.wpHome
]

export function run (answers) {
  const replacements = getReplacements(answers)
  return replaceInFiles(replacements)
}

function getReplacements (answers) {
  return {
    [`web/app/themes/${answers.themeName}/gulpfile.js/config.js`]: {
      "const host = 'flynt.test'": `const host = '${answers.wpHome}'`,
      "sourceRoot: '/app/themes/flynt-theme/'": `sourceRoot: 'app/themes/${answers.themeName}'`
    }
  }
}
