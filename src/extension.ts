'use strict';

import * as vscode from 'vscode';
import * as pugBeautify from 'pug-beautify';

function beautify(text: string, options) {
    let result = '';

    try {
        result = pugBeautify(text, options);
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }

    return result || text;
}

function getOptions(activeTextEditor: vscode.TextEditor) {
    const editorConfig = <any>vscode.workspace.getConfiguration('formatter-pug');
    const options = {
        fill_tab: editorConfig.fillTab || !activeTextEditor.options.insertSpaces,
        omit_div: editorConfig.omitDiv,
        tab_size: editorConfig.tabSize || activeTextEditor.options.tabSize
    };

    return options;
}

function getRange(document: vscode.TextDocument) {
    const lastLine = document.lineAt(document.lineCount - 1);
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
    const range = new vscode.Range(start, end);

    return range;
}

export function activate(context: vscode.ExtensionContext) {

    // 👎 formatter implemented as separate command
    vscode.commands.registerCommand('extension.format-pug', () => {
        const { activeTextEditor } = vscode.window;
        const { document } = activeTextEditor;

        if (!activeTextEditor || activeTextEditor.document.languageId !== 'pug')
            return;

        const text = activeTextEditor.document.getText();
        const options = getOptions(activeTextEditor);
        const result = beautify(text, options);
        const range = getRange(document);
        const edit = new vscode.WorkspaceEdit();

        edit.replace(document.uri, range, result);

        return vscode.workspace.applyEdit(edit)
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: 'pug' }, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const { activeTextEditor } = vscode.window;

            const text = document.getText();
            const options = getOptions(activeTextEditor);
            const result = beautify(text, options);
            const range = getRange(document);

            return [vscode.TextEdit.replace(range, result)];
        }
    });
}


