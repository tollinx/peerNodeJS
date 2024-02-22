class PeerNode {
  constructor(id, ipAddress, portNumber, walletAddress) {
    this.id = id; //unique identifer for the peer
    this.ipAddress = ipAddress; //IP address of peer
    this.portNumber = portNumber; //Port number for peer
    this.walletAddress = walletAddress; //blockchain wallet address for transactions
    this.lastSeen = Date.now(); //timestamp for last known activity
  }
}

export class Node {
  constructor(uri, user) {
    this.uri = uri;
    this.user = user;
  }
}

const servers = [];

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
