import {ChildProcess} from 'child_process';

type Callback = (error: Error, stdout: string, stderr: string) => void;

declare function opener(
    args: string|string[], options?: Object, callback?: Callback): ChildProcess;

export = opener;
