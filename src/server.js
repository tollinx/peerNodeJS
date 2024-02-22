const Libp2p = require('libp2p');
const TCP = require('@libp2p/tcp');
const MPLEX = require('@libp2p/mplex');
const { NOISE } = require('@chainsafe/libp2p-noise');
const MDNS = require('@libp2p/mdns');

export class PeerNode {
  constructor(id, ipAddress, portNumber, walletAddress) {
    this.id = id; //unique identifer for the peer
    this.ipAddress = ipAddress; //IP address of peer
    this.portNumber = portNumber; //Port number for peer
    this.walletAddress = walletAddress; //blockchain wallet address for transactions
    this.libp2p = null;
  }

  async start() {
    this.libp2p = await Libp2p.create({
      addresses: {
        listen: [`${this.ipAddress}/tcp/${this.portNumber}`] 
      },
      modules: {
        transport: [TCP],
        streamMuxer: [MPLEX],
        connEncryption: [NOISE],
        peerDiscovery: [MDNS]
      }
    });

    // Event listeners for libp2p
    this.libp2p.on('peer:discovery', (peerId) => {
      console.log(`Discovered: ${peerId.toB58String()}`);
    });

    this.libp2p.connectionManager.on('peer:connect', (connection) => {
      console.log(`Connected to: ${connection.remotePeer.toB58String()}`);
      this.updateLastSeen();
    });

    // Start the libp2p node
    await this.libp2p.start();
    console.log('Libp2p started');
  }
  
  updateLastSeen() {
    this.lastSeen = Date.now();
  }
}

export function getNodes() {
  return [...servers];
}

export function addNode(node) {
  console.log(`registering ${node.user}`);
  const isAlreadyAdded = servers.find(existingNode => existingNode.user === node.user);
  if (isAlreadyAdded) return;
  servers.push(node);
}

export function getNodeByUser(user) {
  return servers.find(server => server.user === user);
}