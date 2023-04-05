---
title: Loyalty system
menu:
  guides:
    parent: features
weight: 100
---

The loyalty system in strimertül allows your viewer to accrue points by just sticking around and chatting to then spend them on rewards and community goal. It's pretty much a third party implementation to Twitch Channel point system, but does not require you to sign into affiliate.

Compared to Twitch channel points:

- ⭕ Does not require Twitch Affiliate or Partner
- ⭕ You can check and edit the balance of every viewer at any time
- ❌ There is no UI for viewers to easily check all rewards and claim them outside of chat
- ❌ Points are accrued not based on watch time but chat activity (for technical reasons)

Some other current limitations that might be fixed in the future include:

- Points are linked to usernames and not user IDs, which means viewers will lose their points when changing their name
- There is only a per-prize cooldown option, eg. no way to limit number of redemptions per stream
- There is no daily cap on contributing to goals
- Points contributed to goals cannot be refunded

If these limits feel acceptable to you, here's how to set the loyalty system up and running in your streams.

To access the loyalty system configuration, locate its section in the side menu.

{{< figure src="../media/loyalty/menu.png" class="guide-pic" alt="The loyalty system configuration pages in the side bar" >}}

## Configuration

The configuration page lets you turn on or off the entire loyalty system, along some settings on how points are awarded to users.

The most important settings are "How often to give wishes" and "Bonus points". The first sets how often and how many points to give to any user currently logged into chat, while the latter is an extra amount of points added to the former (using the same interval) that is awarded specifically to users who have written at least one chat message during said interval.

It is heavily recommended to keep the interval in the minutes range. This alleviates load on strimertül (since every interval there's some awarding logic and Twitch API calls to execute) and makes sure the bonus points are awarded properly. A good setting would be "10 points every 10 minutes, with 10 bonus points".

Viewers are never notified of gaining points, or if they received extra points. It is up to you to make this logic public or not.

## Rewards and goals

### Rewards tab

The rewards page lets you set up rewards that viewers can redeem and goals for them to contribute towards.

These rewards are currently only visible to you, so you have to take care to inform your viewers that they exist and what they are.

{{< figure src="../media/loyalty/reward-overview.png" class="guide-pic" alt="The loyalty system rewards page" >}}

You can create rewards by clicking the "Create reward" button, or toggle/edit/delete them with the buttons in the top right of each reward entry.

{{< figure src="../media/loyalty/redeem-create.png" class="guide-pic" alt="The dialog to create and edit rewards" >}}

Rewards have a multitude of properties but for most people only the ID (used by viewers to redeem them) and name (used by the bot to describe it) are really important, everything else (description/icon) are not exposed to users.

The cooldown property is a per-reward cooldown and not per-user, so claiming a reward will lock it out for that amount of time from anyone.

Rewards can be refunded (see the following section in Points and redeems).

### Goals tab

The goals page works almost exactly to the rewards one, with a few exceptions since goals work a bit differently.

{{< figure src="../media/loyalty/goal-overview.png" class="guide-pic" alt="The loyalty system goals page" >}}

Goals work by setting a target amount of points to reach. Any viewer can contribute any amount of points to goals at any time (provided they have enough).

{{< figure src="../media/loyalty/goal-dialog.png" class="guide-pic" alt="The dialog to create and edit goals" >}}

Like in rewards, only the goal ID and name are user facing by default, so fields like icon and description can be omitted.

The target point goal can be modified while a goal is active (even after it's been reached) but this should only be done very carefully.

Unlike rewards, there is no way to refund contributed points to a goal.;

## Points and redeems

### Redeem queue

In the redeem queue page you can check out all pending redeems from viewers.

{{< figure src="../media/loyalty/redeem-queue.png" class="guide-pic" alt="The redeem queue page" >}}

Redeems can be accepted or refunded. If accepted the redeem simply disappears from the list while a refund will remove the redeem while also giving back the points to the viewer that claimed the reward.

### Manage points

The point management page gives you a full list of everyone who has been assigned loyalty points at any point. You can sort it by name or balance and have full control over anyone's balance!

{{< figure src="../media/loyalty/point-list.png" class="guide-pic" alt="The point management page" >}}

To edit someone's balance, find the entry in the table (you can use the search field to narrow down results) then click the "Edit" in the far right to open up the dialog to modify their balance, set the new balance then click "Save".

{{< figure src="../media/loyalty/edit-balance.png" class="guide-pic" alt="Dialog to modify someone's point balance" >}}

If the viewer you're looking for is not in the list, click the "Give points" button instead, then put in their username and wanted balance. If you use this method on a viewer with an existing balance, those points will be added to their existing balance.

{{< figure src="../media/loyalty/give-points.png" class="guide-pic" alt="Dialog to give someone points" >}}

## Chat commands

When activated, the loyalty system adds a few commands to the chatbot:

#### !redeem

The `!redeem` command lets viewers redeem a reward. The syntax is `!redeem REWARD-ID`.

{{< figure src="../media/loyalty/chat-redeem.png" class="guide-pic" alt="Using the !redeem command" >}}

If the reward requires viewer info, it becomes `!redeem REWARD-ID extra info here`.

#### !balance

The `!balance` command lets viewers check their current balance.

{{< figure src="../media/loyalty/balance.png" class="guide-pic" alt="Using the !balance command" >}}

#### !goals

The `!goals` command lets viewers check what goals are currently active.

{{< figure src="../media/loyalty/goals-list.png" class="guide-pic" alt="Using the !goals command" >}}

#### !contribute

The `!contribute` command lets viewers contribute points to a community goal. This command has one main syntax and several shortcuts.

The main syntax is `!contribute POINTS GOAL-ID`.

{{< figure src="../media/loyalty/contribute-chat.png" class="guide-pic" alt="Using the !contribute command with the full syntax" >}}

There are several shortcuts for this. You can use `!contribute POINTS` to contribute to the first available goal (since most of the time you're going to have only one goal anyway) or `!contribute GOALID` to contribute 100 points to the specified goal id.

You can combine both by just using `!contribute` to contribute 100 points to the first available goal.

{{< figure src="../media/loyalty/contribute-shortcut.png" class="guide-pic" alt="Using the !contribute shortcuts" >}}
