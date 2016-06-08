var megabytes = parseInt(process.argv.pop());

if (typeof megabytes !== 'number') {
  throw 'Pass in one number as an argument';
}

var refs = [];

function createChunk(size) {
  var buf = Buffer.alloc(size);
  return {
    raw: buf,
    str: buf.toString('utf-8')
  };
}

function allocate(size) {
    var totalSize = size * 1024 * 1024;
    var remainingSize = totalSize;
    var chunkSize = 1024;

    while (chunkSize < remainingSize) {
      refs.push(createChunk(chunkSize));
      remainingSize -= chunkSize;
      chunkSize += 1;
    }

    if (remainingSize > 0) {
      refs.push(createChunk(remainingSize));
    }
}

allocate(megabytes);
refs = [];
allocate(megabytes);
console.log('DONE!');
