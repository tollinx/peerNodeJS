const PROTO_PATH = __dirname + './filesharing.proto'; 
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var filesharing_proto = grpc.loadPackageDefinition(packageDefinition).filesharing;

const uploadFile = (call, callback) => {

};

const sendFile = (call) => {

};

const requestFile = (call, callback) => {

};

const verifyFile = (call, callback) => {

}

const listFiles = (call, callback) => {
  
};


const server = new grpc.Server();

server.addService(fileSharingProto.FileSharingService.service, {
  uploadFile,
  sendFile,
  requestFile,
  verifyFile,
  listFiles
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Server running at http://0.0.0.0:50051');
});

class PeerNode {
  constructor(id, ipAddress, portNumber, walletAddress) {
    this.id = id; //unique identifer for the peer
    this.ipAddress = ipAddress; //IP address of peer
    this.portNumber = portNumber; //Port number for peer
    this.walletAddress = walletAddress; //blockchain wallet address for transactions
    this.lastSeen = Date.now(); //timestamp for last known activity
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