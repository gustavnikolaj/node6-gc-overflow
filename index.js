var megabytes = parseInt(process.argv.pop());
if (isNaN(megabytes)) {
  throw 'Pass in one number as an argument';
}

var refs = [];

function allocate(size) {
    var totalSize = size * 1024 * 1024;
    var remainingSize = totalSize;
    var chunkSize = 1024;

    while (chunkSize < remainingSize) {
      refs.push(Buffer.alloc(chunkSize).toString('utf-8'));
      Buffer.alloc(chunkSize).toString('utf-8');
      remainingSize -= chunkSize;
      chunkSize += 1;
    }
}

allocate(megabytes);
refs = [];
allocate(megabytes);
console.log('DONE!');
