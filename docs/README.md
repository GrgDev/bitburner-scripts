# Welcome to my Pile of Scripts

This repo is for hosting my version controlled javascript code for a game I like to play called Bitburner. It's both [free on Steam](https://store.steampowered.com/app/1812820/Bitburner/) and [an open source game](https://github.com/bitburner-official/bitburner-src). You have no excuse to not try it. I hated javascript before playing this game, but now I am willing to tolerate it. Thanks Bitburner!

Thank you.

Don't forget to reference the [game's API documentation.](https://github.com/bitburner-official/bitburner-src/blob/stable/markdown/bitburner.md) There's also in-game documentation but it generally only gives very high level descriptions of mechanics and a couple of code examples with no real API information. The API documentation on github is much better as a coding reference.

One more quick mention. I only run Bitburner on my home Windows machine. Therefore I cannot guarantee that my git config settings on that Windows machine will properly let you clone my git repo with the proper line terminations (LF vs CRLF). Since I expect myself to be the only one using this repo, that's your problem. Not mine.

## What is with the Vitburner Template?

It's pretty awesome, and I am still learning everything that it provides. However, it can't do anything cool until you connect it to the game. Here are the steps to do that.

1. Open the Bitburner game.
1. Go to `Options -> Remote API`
1. Outside of the game, open a terminal window in the root folder for this project. Alternatively, open this project in VS Code and open a new terminal instance.
1. Run `npm i` if you haven't already.
1. Run `npm i -D viteburner@latest` if you haven't already. You should also run this occasionally to get the lasted updates.
1. Run `npm run dev` to start the daemon tools.
1. Go back to your running Bitburner game and hit the `Connect` button.

Your Remote API screen in Bitburner should confirm an `Online` status. Your terminal window should confirm a connection was successful with a `conn connected` message plus a prompt to press `h` for help or `q` to quit. Note that the terminal does not have a cursor. There is no need to press the ENTER key after you type a command letter in. You simply press the command key while the terminal has focus and it will execute the command. I highly recommend pressing `h` to review the commands.

I currently use this daemon toolset for a few things.

1. Sync files between this github repo and the Bitburner game. Note that the daemon tools do **not** do automatic bidirection syncing and that is a feature. Not a bug.
   - Only the files within the [src](../src) folder will be synced.
   - You have to explicitly hit the `d` command key to "download" the files from your Bitburner game into this git repo as a uni-directional sync from the game files to this repo.
   - Similarly, hitting the `u` command key will "upload" all the files from this repo to the game, meaning it is a uni-directional sync from this git repo's working director to your in-game home server files.
   - Only the following file types can be synced (currently)
     - `.txt`
     - `.js`
       - `.ts` files will be converted to `.js` on upload
   - The following file types have been confirmed to be ignored on sync
     - From git repo to game
       - `.json`
       - `.md`
     - From game to git repo
       - `.exe`
       - `.msg`
       - `.lit`
       - `.cct`
1. As briefly mentioned above, this does the work of converting between Typescript and Javascript. I am still figuring out if I can hook in further actions CI/CD related actions as well such as automatic unit test runs before upload. Stay tuned.
1. This setup also makes it so as I am working on game scripts, it will tell me how much in-game RAM the script is going to use. Because RAM usage in the game is calucated in a significantly different way to how code would use RAM in real life, this is very helpful.
