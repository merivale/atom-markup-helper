'use babel'
/* globals atom */
import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markup-helper:strong': () => this.wrap('strong', '*', '*', null),
      'atom-markup-helper:emphasis': () => this.wrap('em', '_', '_', null),
      'atom-markup-helper:bold': () => this.wrap('b', '**', '=', null),
      'atom-markup-helper:italics': () => this.wrap('i', '__', '$', null),
      'atom-markup-helper:underlined': () => this.wrap('u', null, '^', null),
      'atom-markup-helper:aside': () => this.wrap('aside', null, '#', null),
      'atom-markup-helper:deleted': () => this.wrap('del', '~~', '{--', '--}'),
      'atom-markup-helper:inserted': () => this.wrap('ins', null, '{++', '++}')
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  wrap (html, markdown, markitOpen, markitClose) {
    const editor = atom.workspace.getActiveTextEditor()
    switch (editor.getGrammar().name) {
      case 'HTML':
        if (html) {
          editor.insertText(`<${html}>${editor.getSelectedText()}</${html}>`)
        }
        break

      case 'GitHub Markdown':
        if (markdown) {
          editor.insertText(`${markdown}${editor.getSelectedText()}${markdown}`)
        }
        break

      case 'Markit':
        if (markitOpen) {
          markitClose = markitClose || markitOpen
          editor.insertText(`${markitOpen}${editor.getSelectedText()}${markitClose}`)
        }
        break
    }
  }
}
