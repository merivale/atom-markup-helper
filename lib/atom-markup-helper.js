'use babel'
/* globals atom */
import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markup-helper:bold': () => this.bold(),
      'atom-markup-helper:emphasis': () => this.emphasis(),
      'atom-markup-helper:italics': () => this.italics(),
      'atom-markup-helper:underlined': () => this.underlined()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  wrap (tag) {
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText(`<${tag}>${editor.getSelectedText()}</${tag}>`)
  },

  bold () {
    this.wrap('b')
  },

  emphasis () {
    this.wrap('em')
  },

  italics () {
    this.wrap('i')
  },

  underlined () {
    this.wrap('u')
  }

}
