const os = require('node:os');

const { spawn } = require('child_process');
const { EventEmitter } = require('node:events');


module.exports.TorPort = class extends EventEmitter {
    constructor(port) {
        super();
        console.log(`[Tor]: Activating at localhost:${port}`);

        let superThis = this.addListener('connected', () => console.log(`[Tor]: Activated at localhost:${port}`)); spawn(require('path').resolve('deps/tor-server/tor', os.platform() === 'linux' ? 'tor' : 'tor.exe'), ['--SocksPort', port])
            .addListener('error', console.log).addListener('close', console.log).stdout.addListener('data', e => {
                e = e.toString();

                e.includes('[notice] Bootstrapped') ?
                    e.includes('[notice] Bootstrapped 100%') ? superThis.emit('connected') : null : null; return;
            });
    };
};