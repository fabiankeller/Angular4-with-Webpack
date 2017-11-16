import * as console from 'console';
import chalk from 'chalk';
import * as webpack from 'webpack';
import * as ownWebpackTypes from './types/webpack';
import { Chunk, Compilation, callbackFunction } from './types/webpack';
import { Module } from 'webpack';

export default class MyFirstWebpackPlugin implements webpack.Plugin {
    constructor(private stepCount: number = 0) { }

    apply(compiler: webpack.Compiler) {
        compiler.plugin('run', (nestedCompiler: webpack.Compiler, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (run) - Is used to start a '
            + 'compilation. This is not called in watch mode'));
            callback();
        });

        compiler.plugin('watch-run', (watching: webpack.Watching, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (watch-run) - Is used to start a watching compilation. '
            + 'This is not called in normal mode'));
            callback();
        });

        compiler.plugin('compilation', (c: object, params: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (compilation) A compilation is created. '
            + 'To get reference to the compilation object. Params contains useful references as well'));
        });

        compiler.plugin('normal-module-factory', (nmf: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (normal-module-factory) - A NormlaModulFactory is created. '
            + 'Plugin can use this to get reference to this NormalModuleFactory'));
        });

        compiler.plugin('context-module-factory', (cmf: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (context-module-factory) - IA ContextModuleFactory is created. '
            + 'Plugin can use this to get reference to this ContextModuleFactory.'));
        });

        compiler.plugin('compile', (cmf: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (compile) - The Compiler starts compiling. This is used in formal '
            + 'and watch-mode. Plugins can use this point to modify the params object'));
        });

        compiler.plugin('make', (c: object, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (make) - Plugins can use this point to add entries to the '
            + 'compilation or prefetch modules'));
            callback();
        });

        compiler.plugin('after-compile', (c: object, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (after-compile) - The compile process is finished and the '
            + 'modules are sealed. The next step is to emit the gernerated stuff.'));
            callback();
        });

        compiler.plugin('emit', (c: object, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (emit) - The compile process is finished and the modules are '
            + 'sealed. The next step is to emit the gernerated stuff.'));
            callback();
        });

        compiler.plugin('after-emit', (c: object, callback: callbackFunction) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (after-emit) - The compiler has emitted all the assets.'));
            callback();
        });

        compiler.plugin('done', (stats: webpack.Stats) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (done) - All is done.'));
        });

        compiler.plugin('failed', (err: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (failed) - The compiler is in watch mode and the compilation '
            + 'has failed hard.'));
        });

        compiler.plugin('invalid', (err: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (invalid) - The Compiler is in watch mode and a file change is '
            + 'detected. The compilation will be began shortly (options.watchDelay)'));
        });

        compiler.plugin('after-plugins', (err: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (after-plugins) - All plugins extracted from the options '
            + 'object are added to the compiler'));
        });

        compiler.plugin('after-resolvers', (err: object) => {
            console.log(chalk.bgBlue.white('[' + this.stepCount++ + '] : (after-resolvers) - All plugins extracted from the options '
            + 'object are added to the resolvers'));
        });

        // Compilation events
        compiler.plugin('compilation', (compilation: Compilation) => {
            // compilation.plugin('normal-module-loader', () => {
            //     console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (normal-module-loader) - The normal module loader, is '
            //     + 'the function that acutally loads all the modules in the module graph.'));
            // });

            compilation.plugin('seal', () => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (seal) - The sealing of the compilation has started'));
            });

            compilation.plugin('optimize', () => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize) - Optimize the compilation.'));
            });

            compilation.plugin('optimize-tree', (chunks: Chunk[], modules: Module[], callback: callbackFunction) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-tree) - Async optimization of the tree'));
                callback();
            });

            compilation.plugin('optimize-modules', (modules: Module[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-modules) - Optimize the modules'));
            });

            compilation.plugin('after-optimize-modules', (modules: Module[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-modules) - Optimizing the modules has '
                + 'finished'));
            });

            compilation.plugin('optimize-chunks', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-chunks) - Optimize the chunks'));
            });

            compilation.plugin('after-optimize-chunks', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-chunks) - Optimize the chunks has '
                + 'finished'));
            });

            compilation.plugin('revive-modules', (modules: Module[], records: any[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (revive-modules) - Restore module info from records.'));
            });

            compilation.plugin('optimize-module-order', (modules: Module[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-module-order) - Sort the modules in order of '
                + 'importance. The first is the most important module. It will get the smallest id.'));
            });

            compilation.plugin('optimize-module-ids', (modules: Module[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-module-ids) - Optimize the module ids.'));
            });

            compilation.plugin('after-optimize-module-ids', (modules: Module[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-module-ids) - Optimizing the module ids '
                + 'has finished.'));
            });

            compilation.plugin('record-modules', (modules: Module[], records: any[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (record-modules) - Store module info to the records.'));
            });

            compilation.plugin('revive-chunks', (modules: Module[], records: any[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (revive-chunks) - Restore chunk info from records.'));
            });

            compilation.plugin('optimize-chunk-order', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-chunk-order) - Sort the chunks in order of '
                + 'importance. The first is the most important chunk. It will get the smallest id.'));
            });

            compilation.plugin('optimize-chunk-ids', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-chunk-ids) - Optimize the chunk ids.'));
            });

            compilation.plugin('after-optimize-chunk-ids', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-chunk-ids) - Optimizing the chunk ids '
                + 'has finished.'));
            });

            compilation.plugin('record-chunks', (chunks: Chunk[], records: any[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (record-chunks) - Store chunk info to the records.'));
            });

            compilation.plugin('before-hash', () => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (before-hash) - Before the compilation is hashed.'));
            });

            compilation.plugin('after-hash', () => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-hash) - After the compilation is hashed.'));
            });

            compilation.plugin('before-chunk-assets', () => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (before-chunk-assets) - Before creating the chunk '
                + 'assets.'));
            });

            compilation.plugin('additional-chunk-assets', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (additional-chunk-assets) - Create additional '
                + 'assets for the chunks.'));
            });

            compilation.plugin('record', (c: Compilation, records: any[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (record) - Store info about the compilation to '
                + 'the records'));
            });

            compilation.plugin('optimize-chunk-assets', (chunks: Chunk[], callback: callbackFunction) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-chunk-assets) - Optimize the assets '
                + 'for the chunks.'));
                callback();
            });

            compilation.plugin('after-optimize-chunk-assets', (chunks: Chunk[]) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-chunk-assets) - The chunk assets '
                + 'have been optimized.'));
            });

            compilation.plugin('optimize-assets', (assets: any, callback: callbackFunction) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (optimize-assets) - Optimize all assets.'));
                callback();
            });

            compilation.plugin('after-optimize-assets', (assets: any) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (after-optimize-assets) - The assets has been optimized.'));
            });

            // compilation.plugin('build-module', (module: Module) => {
            //     console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (build-module) - Before a module build has started.'));
            // });

            // compilation.plugin('succeed-module', (module: Module) => {
            // console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (succeed-module) - A module has been built successfully.'));
            // });

            // compilation.plugin('failed-module', (module: Module) => {
            //     console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (failed-module) - The module build has failed.'));
            // });

            compilation.plugin('module-asset', (module: Module, filename: string) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (module-asset) - An asset from a module was added '
                + 'to the compilation.'));
            });

            compilation.plugin('chunk-asset', (module: Module, filename: string) => {
                console.log(chalk.bgMagenta.white('[' + this.stepCount++ + '] : (chunk-asset) - An asset from a chunk was added '
                + 'to the compilation.'));
            });
        });
    }
}
