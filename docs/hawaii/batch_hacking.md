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