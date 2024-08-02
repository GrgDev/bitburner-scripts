# Pipeline Batch Hacking
In order to actually have an efficient hacking script, we need to pipeline the hacking batches. The usual recommended way is via HWGW.  It was noted that you could hypothetically get away with a HGW script to squeeze some extra optimization but apparently the tradeoff between complexity vs gains is generally seen as not worth it. Maybe do that for a later version.

The problem has a couple of steps that are subproblems themselves. Each needs solving, although some could be implemented later instead of being an MVP requirement.

1. Running a batch with correct timings.
1. Deploying that batch remotly.
1. Deploying subsequent batches to the same remote server until the server RAM is maxed out.
1. Deploying the same logic to all hacked servers
1. Knowing how long to wait before repeating the whole system

That should be enough to cover the MVP. There are some features that should probably be added shortly afterwards.

1. Pipeline maxed detection (can cause logic issues if overlapping batches are landing at the same time. Probably not that big of an issue since the weaken calls generally overcompensate.)
1. Most efficient distribution of batch functions to different sized servers to minimize unused memory due to fragmentation
1. Changes in batch time length due to skill changes (this might actually be easy to do in the MVP as long as the deployer is dynamically launching all batches on timing derived from skill)

## Security Modifiers from Actions
* `hack()` -> +0.002
* `grow()` -> +0.004 (unless an edge case is hit, in which case, there is no change)
* `weaken()` -> -0.05

So technically, 1 `weaken()` call can compensate for 25 `hack()` calls or 12.5 `grow()` calls, but only in terms of security modifiers. You would have to do the math to make sure that the 12 `grow()` calls can compensate for the 25 `hack()` calls.

Some quick test code suggests the usually `hack()` seems to decrease money more than `grow()` increases it, so having more `hack()` calls than `grow()` calls makes no sense. We should find similar functions to the hacking formula functions without actually resorting to the hacking formula functions if possible to avoid the heavy RAM cost.

## Action Time Ratios
* Weaken-Grow Ratio: 1.25
* Grow-Weaken Ratio: 0.8
* Grow-Hack Ratio: 3.2
* Hack-Grow Ratio: 0.3125
* Weaken-Hack Ratio: 4
* Hack-Weaken Ratio: 0.25

## Remaining TODOs
1. Update the remote script args to accept the PID of the batcher that spawned them so the batcher can script kill only the scripts that it spawned itself. It currently kills any running remote scripts from other batcher instances. This fixes itself pretty quickly but it's still a problem.
1. Dynamically figure out how many more `grow()` calls are needed compared to `hack()` calls. I only tested with the `phantasy` server so far. There the percentage change in available money from `hack()` was about `-0.0007` but the percentage change for `grow()` was `+0.0004`. Thus a single `grow()` call can't compensate for a single `hack()` call. Based on this test, I simply set it to do 2 `grow()` calls instead of 1. I need to switch this to make it a dynamic ratio and ensure the RAM allocation check matches the logic.
1. Once the dynamic grow/hack ratio logic is implemented, the next step is to implement how many threads to multiply that ratio by while still having them compensated in security modifiers by a single `weaken()` call.
1. Once the optimal one `weaken()` call based HWGW batch is implemented, it would be a good time to convert this to a HGW batcher instead. `hack()` has half of the effect on the security level as `grow()` but more `grow()` calls are usually needed compared to `hack()` calls due to the greater effect on the available money that `hack()` has over `grow()`. This makes the `weaken()` call to compensate for the `hack()` step mostly a waste. It would be more optimal to combine the `hack()` and `grow()` calls to be both compensated by a single `weaken()` call so the `weaken()` modifier isn't going to waste.
1. Split the script into multiple scripts with them calling that function that allows a script to exit while spawning a new script. This will allow the start of the setup to use more RAM expensive functions at first but the long running script will be more RAM lean.
1. Rewrite certain sections to remove extra functions that cause unnessecary RAM waste. Don't do this until after the previous TODOs are done as we might end up needing to re-add a previously removed function.

## Changelist

### v1.0

This is the initial first working version of the hacking batcher.
It uses 8.9 GB of RAM, and there's definitely room to get that lower.
Has some other issues that will be addressed in later versions.