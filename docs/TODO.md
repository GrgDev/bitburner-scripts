# TODO

These are things I need to implement to improve the rate I progress through a run. Listed roughly in order of priority.

1. A proper HWGW/WHG batching system
1. Figure out the Bladebunber system
1. Automate the Bladeburner system
1. Figure out how to do large message relaying
   - Serializing/deserializing JSON via text files?
     - `(method) NS.write(filename: string, data?: string | undefined, mode?: "w" | "a" | undefined): void`
   - The pseudo-networking NescriptPort API?
     - See the NetscriptPort API docs [here](https://github.com/bitburner-official/bitburner-src/blob/stable/markdown/bitburner.netscriptport.md).
     - Docs are a little misleading in that they make it look like you call these methods on a NetscriptPort object. You don't. These calls are in the `NS` top level scope. They all take an integer as the first argument to specify the port number the method will call.
     - Here is an example of the actual `tryWritePort` method signature. `(method) NS.tryWritePort(portNumber: number, data: any): boolean`
     - Outstanding questions that need answering
       - How large is the buffer? What does it take to fill it?
       - Do payloads in the buffer survive agument installation resets?
   - Directly tailing script logs
   - None of the above options incur an in-game RAM usage penalty
1. Probably need to address the following deprecation warning:

- `Accessed deprecated function or property: ns.nFormat This is no longer supported usage and will be removed in a later version. Use ns.formatNumber, formatRam, formatPercent, or js builtins like Intl.NumberFormat instead. This message can also appear for object properties when the object's values are iterated. This message will only be shown once per game session for each deprecated item accessed.`
