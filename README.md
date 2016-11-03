# Good and Bad Formatter


This is a sample for a simple (and stupid) formatter that integrates into VS Code in two ways. Once as a command and (better) 
via the commands-api. The latter as the following advantages

* is less code
* is invoked from the formatter actions and keybindings
* is invoked from format on save
* is future proof for things like *format all files in folders* etc
