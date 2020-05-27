# EventHandler

a class for an unneccecarily large eventhandler
every function has 2 or 4 names

use as you wish

## usage

afaik anything works as an event name but please just use a string

### `.on` `.addEventListener`

parameters: _(event name, function)_
return: number index of event in event list, meant to be used for `.off`
however i just realized i'm stupid and that doesn't work
```
	let a = events.on('bean', function () {})
	events.off('bean', a)
```

### `.off` `.removeEventListener`

parameters: _(event name, id)_
id could be

- the function from .on
- number index of event in event list (return value of .on) (don't use it right now i'm stupid)
- no value, which then it'll delete all events from _event name_

return: depends on id type

function: amount of listeners deleted
number: function that was deleted
none: array of every deleted listener's functions

### `.emit` `.dispatchEvent`

parameters: _(event name, ...function parameters)_

uses context of event listener ()

### `.emitCall` `.dispatchEventCall` `.emitContext` `.dispatchEventContext`

parameters: _(event name, context, ...function parameters)_

runs all event listeners with context and parameters given