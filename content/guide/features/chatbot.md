---
title: Twitch chat bot
menu:
  guides:
    parent: features
weight: 10
---

strimertül comes bundles with a chat bot for Twitch. You can access its settings in the side menu under "Twitch".

{{< figure src="../media/chatbot/menu.png" class="guide-pic" alt="The chat bot configuration pages in the side bar" >}}

## Chat commands

Chat commands are messages that can be triggered by chat users (such as viewers) using commands, such as "!lurk".

The Chat message window will show all active and inactive commands, sorted alphabetically. Inactive/disabled commands will not be usable in chat.

{{< figure src="../media/chatbot/page-overview.png" class="guide-pic" alt="Overview of the chat bot configuration page" >}}

To manage chat commands, click the "New command" at the top of the page or the "Edit" command of any of the existing commands, a dialog will appear with info to fill out about it.

{{< figure src="../media/chatbot/messagebox.png" class="guide-pic" alt="The dialog for editing a single chat command" >}}

The fields for a command are:

Command name
: The identifier used to call the command, i.e. A command called "!lurk" will trigger when someone in chat writes "!lurk" as the start of their message. (ok: "!lurk goodbye", not ok: "I'm going to !lurk now")

Description
: Description of the command, has no functional effect and only shows up in the user interface and API. The search box at the top also filters on the description text.

Response
: Message to write to chat, it uses the [Go templating system](https://pkg.go.dev/text/template) with functions described below.

Access level
: Minimum permissions required to use a command. This lets you restrict some commands to moderators or other subset of chat users.

### Chat response functions

These functions operate on Twitch users and messages.

The example message for the examples will be:

> \<AshKeelVT\> !command this is a test

| Function    | Description                                         | Usage                  | Example output     |
| ----------- | --------------------------------------------------- | ---------------------- | ------------------ |
| `user`      | Extract the user name from a message                | `{{ user . }}`         | AshKeelVT          |
| `param`     | Extract specific words from a message               | `{{ param 4 . }}`      | test               |
| `randomInt` | Roll a random number within an interval \[min,max\) | `{{ randomInt 1 6 }}`  | 3                  |
| `game`      | Get the last played game for a user                 | `{{ user . \| game }}` | Sonic Robo Blast 2 |
| `count`     | Increase counter by one and write it                | `{{ count "test" }}`   | 2                  |

In addition to these chat specific functions, the entire sprig function library is available (with string manipulation functions and other utilities), check its [function documentation](http://masterminds.github.io/sprig/) for more info.

## Chat timers

Chat timers are messages that are written on repeating intervals as long as some chat activity conditions are met (so the bot doesn't keep screaming into the void!)

The timer page looks mostly like the chat commands page, with timers being either enabled or disabled, sorted alphabetically by name and with a search box for easy filtering.

{{< figure src="../media/chatbot/timer-overview.png" class="guide-pic" alt="Overview of the chat timers configuration page" >}}

To manage timers, click the "New timer" at the top of the page or the "Edit" command of any of the existing timers, a dialog will appear with info to fill out about it.

{{< figure src="../media/chatbot/timerbox.png" class="guide-pic" alt="The dialog for editing a timer" >}}

The fields for a timer are:

Timer name
: A unique identifier, used only within the user interface and API

Minimum interval
: How long to wait before the timer attempts to write the message again. If the chat activity condition has not been met yet, the timer will fire as soon as it is and then start waiting again.

Minimum chat activity
: Adds a chat activity condition to timers so that they will only fire when there has been at least a certain amount of messages in chat. You can set it to 0 to disable it, but this might end up spamming your chat if it's being quiet.

Messages
: Messages to write to chat, you can make multiple messages and the timer will pick one at random each time.

## Chat alerts

TODO

## External scripts and extensions

TODO
