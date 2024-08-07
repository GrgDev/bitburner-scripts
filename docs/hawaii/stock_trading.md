# Automated Stock Trading
We're going to make our initial trading algorithm based on an old tried and
true probability algorithm. It is based on the problem that if you have a
two sided coin but one side came up 60% of the time while the other one came
up 40% of the time, how much money do you bet each time and on what side?

Which side to bet on should be obvious. Always bet on the 60% side, never the
40% side, no matter how long the current streak might be of the 60% side
coming up. Each coin flip has an independant probability from the previous
coin flip.

As for how much to bet, that is trickier. With an obviously winning side,
we want to utilize our capital as much as possible. However, we can't go
all in on a single coin flip as we risk losing everything if we are unlucky.
It turns out there is an optimal ratio equation here.

    (2 * P) - 1 = B

Where P is a number between 0 and 1 representing the probability chance
of a positive outcome, and B is a number between -1 and 1 representing
what percentage of your capital to bet each time. In the case of our 60%
example, we would plug 0.6 in for P and get the following outcome.

    (2 * 0.6) - 1 = B
    (1.2) - 1 = B
    1.2 - 1 = B
    0.2 = B

The optimal amount of our money that we should be betting each time is 0.2
or 20% of our capital.

Note how with this equation, a bet with either 50% odds or lower results in a
zero or negative value. A zero means we should not make this bet at all. A
negative value means we should be betting on the opposite outcome.

After some quick testing with some stock analysis scripts, it would appear that
there are fairly consistently a handful of stocks that are forecasted at 60% or
higher propability of increasing. This gives us a decent starting point for our
algorithm. We can limit ourselves to buying long on stocks that have a 60%
chance or higher of increasing but limiting our overall stock position to be no
higher than 20% of our overall assets which is measured with:

    net_value_of_stock_portfolio /
    (net_value_of_stock_portfolio + cash_available)

It should be noted that we can take advantage of the inverse as well. A stock
with a 40% forecasted chance to increase implies a 60% chance to decrease. We
can therefore buy short on stocks with a 40% chance or lower of going up.
Since this is a simulated stock market instead of a real one. Keep in mind
that the logic related to shorting stocks needs to have an extra fail safe
implemented. While the worst case of buying long on stocks is to lose 100%
of the capital used to buy the stock, the worst case scenario for shorting
stocks is potentially infinite. We need to have a failsafe in place that says
short positions that are net negative past a certain threshold need to be
automatically closed at a loss, even if the forecast claims the stock should
be going down.

We probably need to have an edge case in place for if we spend a bunch of cash
for a good reason but don't want to cause the algorithm to instantly liquidate
our porfolio. Then again, should we even have that edge case? We might need
that cash at that time more than anything. We should probably let it liquidate
for now and deal with edge cases like this after the initial implementation.

We can't forget to consider the effect of transaction fees. They are $100k per
transaction. That doesn't mean much later on in the game but early on can mean
a lot. Not to mention that even if we have a good amount of capital, running
too many frequent trades at not high enough of a profit will result in overall
losses. Meaning if the profit from each closing position is not worth at least
$200k net gain on average, we're losing money. We can't have that.

For the first version, we can probably avoid making this complicated by only
doing transactions worth more than a certain amount. Given two transactions,
one to open and one to close a position, we need to compensate for $200k. We
can probably accomplish this more often than not if we keep the transaction
cost to 1% or less. Thus a net positive change above 1% on the position would
give us a net positive. This would mean each position would need to have a net
starting value of at least $20m. Remember this needs to be under 20% of our
total cash. If we put all of our stock money into a single stock, then our
total amount of cash would need to be at least $100m. However, we would
probably like to diversify our holdings to multiple stocks. Assuming we spread
our allocations over 5 stocks, this would mean we need $500m. If we wanted to
go long on 5 stocks and short on 5 stocks, we would need at least $1b. In other
words, we really shouldn't be running this algorithm until we have at least $1b
cash saved up.

