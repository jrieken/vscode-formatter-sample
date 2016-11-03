# Good and Bad Formatter


This is a sample for a simple (and stupid) formatter that integrates into VS Code in two way: Once as a [comm](https://github.com/jrieken/vscode-formatter-sample/blob/master/src/extension.ts#L8)[and](https://github.com/jrieken/vscode-formatter-sample/blob/master/package.json#L31) and once (better) 
via the [formatter](https://github.com/jrieken/vscode-formatter-sample/blob/master/src/extension.ts#L23)-api. The latter as the following advantages:

* is less code
* is invoked from the formatter actions and keybindings
* is invoked from format on save
* is future proof for things like *format all files in folders* etc
