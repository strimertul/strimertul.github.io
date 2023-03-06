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

Chat alerts are messages that get written to chat when certain events happen. These include viewer actions like following, subscribing or incoming raids from other channels.

The alerts page is structured as a tabbed view with each tab referring to a single event.

{{< figure src="../media/chatbot/alert-overview.png" class="guide-pic" alt="Overview of the chat alerts configuration page" >}}

Alerts can be enabled and disabled for every event, and you can specify multiple message for each (one at random will be chosen when the event happens).

Alert messages use the [Go templating system](https://pkg.go.dev/text/template) but with a different scheme than chat messages, see below for more info.

When you're done changing your options, make sure to click "Save" to save and apply any change you have made!

### Variables for alerts

The template for alert messages uses an EventSub payload, you can check the full schema [here](https://github.com/nicklaw5/helix/blob/main/eventsub.go) but it may prove difficult to parse, so here's an easier reference:

| Event             | Description                        | Usage                          | Example output     |
| ----------------- | ---------------------------------- | ------------------------------ | ------------------ |
| Every except raid | Viewer name                        | `{{.UserName}}`                | AshKeelVT          |
| Subscription      | Resub message                      | `{{.Message}}`                 | Hey have a sub     |
| Subscription      | Subscription tier (1000/2000/3000) | `{{.Tier}}`                    | 1000               |
| Subscription      | Subscription months (total)        | `{{.CumulativeMonths}}`        | 69                 |
| Subscription      | Subscription months (streak)       | `{{.StreakMonths}}`            | 7                  |
| Subscription      | Subscription duration              | `{{.DurationMonths}}`          | 3                  |
| Subscription      | Was the subscription donated?      | `{{.IsGift}}`                  | false              |
| Gift Sub          | How many gift sub were just given  | `{{.Total}}`                   | 2                  |
| Gift Sub          | Total gift subs from that viewer   | `{{.CumulativeTotal}}`         | 32                 |
| Gift Sub          | Was the gift sub anonymous?        | `{{.IsAnonymous}}`             | false              |
| Raid              | Name of who raided                 | `{{.FromBroadcasterUserName}}` | EnfieldVT          |
| Raid              | How many viewers in the raid       | `{{.ViewerCount}}`             | 420                |
| Cheer             | Cheer message                      | `{{.Message}}`                 | Hey have some bits |
| Cheer             | How many bits were cheered         | `{{.Bits}}`                    | 1337               |
| Cheer             | Was the cheering anonymous?        | `{{.IsAnonymous}}`             | false              |

## External scripts and extensions

Like the rest of strimertül, all you need to interact with Twitch chat is use Kilovolt keys.

To listen for incoming messages from users/other bots you can subscribe to this key:  
`twitch/ev/chat-message`  
Messages will be in JSON format, check the [API reference](/api/) for the schema.

You can write arbitrary messages to chat as the strimertul bot by writing to this key:  
`twitch/@send-chat-message`  
No format needed, just write the string you want to see in chat!
