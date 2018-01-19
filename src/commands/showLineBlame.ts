'use strict';
import { TextEditor, Uri, window } from 'vscode';
import { ActiveEditorCommand, Commands } from './common';
import { Container } from '../container';
import { configuration, LineAnnotationType } from '../configuration';
import { Logger } from '../logger';

export interface ShowLineBlameCommandArgs {
    type?: LineAnnotationType;
}

export class ShowLineBlameCommand extends ActiveEditorCommand {

    constructor() {
        super(Commands.ShowLineBlame);
    }

    async execute(editor?: TextEditor, uri?: Uri, args: ShowLineBlameCommandArgs = {}): Promise<any> {
        try {
            if (args.type === undefined) {
                args = { ...args, type: configuration.get<LineAnnotationType>(configuration.name('blame')('line')('annotationType').value) };
            }

            return Container.lineAnnotations.showAnnotations(editor, args.type!);
        }
        catch (ex) {
            Logger.error(ex, 'ShowLineBlameCommand');
            return window.showErrorMessage(`Unable to show line blame annotations. See output channel for more details`);
        }
    }
}