import process from 'node:process'
import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'
import { multiaddr } from 'multiaddr'
import { bootstrap } from '@libp2p/bootstrap'
import { kadDHT } from '@libp2p/kad-dht'
import { yamux } from '@chainsafe/libp2p-yamux'
import { ping } from '@libp2p/ping'

async function main() {

    const node = await createLibp2p({
        addresses: {
            // add a listen address (localhost) to accept TCP connections on a random port
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        transports: [
            tcp()
        ],
        streamMuxers: [
            yamux()
        ],
        connectionEncryption: [
            noise()
        ],
        peerDiscovery: [
            // bootstrap({
            //     list: [

            //     ]
            // })
        ],
        services: {
            dht: kadDHT({
                kBucketSize: 20,
            }),
            ping: ping({
                protocolPrefix: 'ipfs',
            }),
        }
    })



    // node.connectionManager.on('peer:connect', (connection) => {
    //     console.info(`Connected to ${connection.remotePeer.toB58String()}!`)
    // })

    await node.start()

    console.log('listening on addresses: ')
    node.getMultiaddrs().forEach((addr) => {
        console.log(addr.toString())
    })

    const targetAddress = multiaddr('/dnsaddr/ny5.bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa')
    try {
        await node.dial(targetAddress)
    } catch (err) {
        console.error(err)
    }
}

main()

// if (process.argv.length >= 3) {
//     const ma = multiaddr(process.argv[2])
//     console.log(`pinging remote peer at ${process.argv[2]}`)
//     const latency = await node.services.ping.ping(ma)
//     console.log(`pinged ${process.argv[2]} in ${latency}ms`)
// } else {
//     console.log('no remote peer address given, skipping ping')
// }

// const stop = async () => {
//     // stop libp2p
//     await node.stop()
//     console.log('libp2p has stopped')
//     process.exit(0)
// }

// process.on('SIGTERM', stop)
// process.on('SIGINT', stop)
