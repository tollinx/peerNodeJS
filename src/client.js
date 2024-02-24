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

const client = new fileSharingProto.FileSharingService('localhost:50051', grpc.credentials.createInsecure());

//make calls to the function here