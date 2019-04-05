/*
video explains the basics yield and next useage with this  
function* bears () {
  var kind = yield 'grizzly'
  yield kind + ' polar'
  console.log('kind: ' + kind)
  return 'done'
}
var bear = bears()
console.log(bear.next().value)
console.log(bear.next('ferocious').value)
console.log(bear.next().value)

we can twist the file input/output module to do async functionality

Kyle refers to this generator function to the run method as an "API"
which has a resume callback to continue on with execution
*/
var fs = require('fs')

run(function* (resume) {
  //normal use of fs 3rd argument being the callback with the contents
  //var contents = yield fs.readFile('big.file', 'utf8', function(err,contents))
  //the resume in place of the function withe yield assurse the return into var
  var contents = yield fs.readFile('big.file', 'utf8', resume)
  //now this whole thing he says is an "API" that can be used in a sync fashion
  var uppercase = contents.toUpperCase()
  //then allow the async call with yield
  yield fs.writeFile('uppercase.file', uppercase, resume)
  console.log('All done!')
})

function run (generator) {
  var data = null, yielded = false
  var iterator = generator(function () {
    data = arguments
    check()
  })
  yielded = !!(iterator.next())
  check()
  function check () {
    while (data && yielded) {
      var err = data[0], item = data[1]
      data = null
      yielded = false
      if (err) return iterator.throw(err)
      yielded = !!(iterator.next(item))
    }
  }
}
