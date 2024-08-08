# Hacking Notes

Let's not lose these notes this time.

## Base Problem

The initial way to make money in the game is via hacking. This involves calling 3 different async functions.

- `(method) NS.hack(host: string, opts?: BasicHGWOptions | undefined): Promise<number>`
  - RAM cost: 0.1 GB
  - Steals some percentage of money from a server account, transferring it to the player's funds.
  - Returns the amount of money stolen. Returns zero if the hack failed or there was no money on the server account.
  - Increases the security by a fixed 0.002.
- `(method) NS.grow(host: string, opts?: BasicHGWOptions | undefined): Promise<number>`
  - RAM cost: 0.15 GB
  - Adds $1 to the server account and then applies a multiplier to the amount of money on the server account where the multiplier grows exponentially with the number of threads.
  - Returns the effective multiplier that was applied.
  - Increaes security by a factor based on the number of threads and requires `growthAnalyzeSecurity()` to find the value of.
- `(method) NS.weaken(host: string, opts?: BasicHGWOptions | undefined): Promise<number>`
  - RAM cost: 0.15 GB
  - Reduces security by a fixed 0.05 amount.
  - Returns the actual security reduction (between 0.00 and 0.05)

Important Points:

- `hack()` and `grow()` work based on percentage, not absolute amounts, and are more effective the more threads they are ran with.
- This means it is very inefficient to be calling `grow()` to max money only to call `hack()` until the money hits zero.
- It is much more efficient to alternating calls in the following order which assumes a server with max money and minimum security:
  - `weaken()`
  - `hack()`
  - `weaken()`
  - `grow()`
- It is possible that if the rate that `grow()` increases security by is low enough, the second `weaken()` call might not be nessecary, but it is a lot safer to have it.
- While the server that the hacking scripts are targeting has to be a hacked server, **the servers running the hacking scripts do not need to be hacked servers!**
- This means from the very beginning of the game, you can use all the network servers to farm money from the n00dle shop.

To return to the base problem, you are looking for an efficient way to run these hacking scripts to optimize the money returned by the in game servers.

## High Effeciency Solution Notes

To efficientlly run these scripts, you need a few smaller problems solved.

- We need a script that can orchestrate the deployment of these hacking scripts.
- (Optional) We would ideally like to leave minimal RAM on network servers unused due to fragmentation.
  - This is both optional and possibly sub-optimal because if the effectiveness of these scripts increase exponentially with thread count, losing some RAM to fragmentation in exchange for running more threads on a single script might be more efficient. Maybe there's an algorithm that can optimize both?
- We need to figure out how to time the landing of these scripts. Launching the scripts in order does not guarantee they land in the same order. Only the time required to finish the script is determined on script launch. The actual effect it has is determined on script finish. All three of the hacking related functions take different amounts of time to finish. We will need some kind of scheduler that can calculate and deploy these scripts in a way to they not only finish in order, but also all land with a time buffer of only 0.2 seconds between each other.

## Important Note Regarding Call Time Length

While the exact length of time of a hacking related call changes depending on player skills, the time ratio between the different kinds of calls is fixed. This means if you can figure out how long a single call will take, you can use it to derive the length of any other hacking related call.

Weaken/Hack Time Ratio: 4 Weaken/Grow Time Ratio: 1.25 Grow/Hack Time Ratio: 3.2

That said, there are method calls that aren't too expensive on RAM for getting accurate timing calls and might be worth it for the deployment script to simply call these to better insure accuracy.

`getGrowTime(host:string)` `getHackTime(host:string)` `getWeakenTime(host:string)`
