---
title: Kilovolt API
menu:
  guides:
    parent: advanced
---

You can use or build third-party tools to interact with strimertül and some of its underlying services like the chat bot through the exposed Kilovolt API. Kilovolt works via websocket text messages and there's two main options for using it:

- Use one of the [existing client libraries](https://github.com/strimertul/kilovolt-clients/blob/master/README.md)
- Read through the [protocol](https://github.com/strimertul/kilovolt/blob/main/PROTOCOL.md) and make your own client

Once you have sorted out a way to connect and talk Kilovolt, connect to the endpoint for your strimertül instance using this format:

```sh
ws://localhost:4337/ws
```

If you're not using the default webserver bind, replace `localhost:4337` with whatever you have set.

## Authentication

You can authenticate in two ways, either using the challenge flow or the interactive flow. The challenge flow requires knowing the password to the kilovolt store (a shared secret key) while the interactive flow doesn't but it requires the user aknowledging and allowing the connection using a dialog in the UI.

You can also disable authentication altogether by putting an empty password. In that case, you don't need to authenticate at all when you connect. However it's very discouraged to do that.

### Why have authentication

The main reason for using websockets as the base protocol is to allow webpages to talk to strimertül, especially the web views in OBS (which most use for overlays). The problem with a fully accessible web server is that rogue webpages could potentially connect to your strimertül instance and leak important info like your Twitch tokens or just mess around and ruin your setup.

### Challenge-based authentication

The challenge-based authentication flow allows your app to connect to strimertül in a non-interactive way. This is great for helper apps or web overlays.

To get the password, go to **Server Settings** and copy the value in **Kilovolt password**. Remember to click the Reveal button or you won't be able to copy its contents.

{{< figure src="../media/kilovolt-password.png" class="guide-pic" alt="The password in the strimertül UI" >}}

### Interactive authentication

The interactive authentication flow allows your app to connect without having to get a password from the user by presenting an explicit prompt in the UI that the user has to acknowledge and accept. You can provide metadata about your application for easy identification and an optional code to prove the connection is legitimate[^1]. Use case for this method is applications that aren't easily configured or one-offs like a web app.

The data attributes you can specify to add metadata are the following:

| Property           | Description                                                 | Example                    |
| ------------------ | ----------------------------------------------------------- | -------------------------- |
| `icon`             | URL to the app's icon, shown at 64x64                       | https://url/to/appicon.png |
| `name`             | Name of the application                                     | My custom app              |
| `author`           | Who made the application, shown below name                  | CustomAppSoft              |
| `url`              | URL to the app's website/source/info                        | https://strimertul.stream  |
| `verificationCode` | A code to display on both app and UI to verify authenticity | 1234ABC                    |

Every attribute is optional but you should at least fill out the name to avoid showing up as "Unknown application". Omitted fields will generally not show up in the dialog.

With all data attributes set to something, the dialog will look like this:

{{< figure src="../media/interactive.png" class="guide-pic" alt="The interactive authentication dialog in the UI" >}}

[^1]: Do note that the security isn't great on this because the connection is not encrypted.

## API reference

You can find what keys are available for your app to access and modify on the [API reference page](/api).
