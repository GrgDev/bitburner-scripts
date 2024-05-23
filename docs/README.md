# Welcome to my Pile of Scripts

This repo is for hosting my version controlled javascript code for a game I like to play called Bitburner. It's both [free on Steam](https://store.steampowered.com/app/1812820/Bitburner/) and [an open source game](https://github.com/bitburner-official/bitburner-src). You have no excuse to not try it. I hated javascript before playing this game, but now I am willing to tolerate it. Thanks Bitburner!

**NOTE:** If you are a potential employer looking at this code as an evaluation of my programming abilities, let me just say that I will bring my silly or humerous commit messages and similar writing into the professional workplace. I would make it more tasteful in such an environment, and not let it get in the way of conveying essential information. Life is too short to not be having any laughs while you work.

Thank you.

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

I currently use this daemon toolset for primarily two things.

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
