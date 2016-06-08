var megabytes = parseInt(process.argv.pop());

if (typeof megabytes !== 'number') {
  throw 'Pass in one number as an argument';
}

// if (typeof global.gc !== 'function') {
//   throw 'Run node with --expose-gc flag';
// }

var refs = {};
var i = 0;

function allocate(megabytes) {
  return new Promise(function (resolve, reject) {
    var id = i;
    i++;

    refs[id] = [];

    var totalSize = megabytes * 1024*1024;
    var remainingSize = totalSize;
    var chunkSize = 1024;

    while (chunkSize < remainingSize) {
      var buf = Buffer.alloc(chunkSize);
      remainingSize -= chunkSize;
      chunkSize += 1;
      refs[id].push({ raw: buf, str: buf.toString('utf-8') });
    }

    if (remainingSize > 0) {
      var buf = Buffer.alloc(remainingSize);
      refs[id].push({ str: buf.toString('utf-8')});
    }

    return resolve(id);
  });
}

function deallocate(maxId) {
  console.log('deallocate', maxId);
  // remove every other chunk we have
  var lastChunkLived = true;
  for (var id = 0; id <= maxId; id++) {
    for (var i = 0; i < refs[id].length; i++) {
      if (refs[id][i]) {
        if (lastChunkLived) {
          refs[id][i] = null;
        }
        lastChunkLived = !lastChunkLived;
      }
    }
  }
  console.log('fooo');
  return id;
}



var promise = allocate(megabytes);

for (var iterations = 1; iterations < 16; iterations++) {
  promise = promise.then(deallocate).then(() => allocate(megabytes));
}

promise
  .then(deallocate)
  .then(() => {
    refs = null;
  })
  .then(() => console.log('NO ERROR'));
