---
title: First time setup
menu:
  guides:
    parent: gettingstarted
weight: 20
---

When you open strimertül for the first time it will prompt you to start an onboarding procedure. The setup should be quite self-explanatory but in case you're having trouble with it, this guide will break it down in a more exhaustive way.

## Onboarding prompt

The starting screen for an unconfigured strimertul lets you choose wether to start or skip the onboarding procedure. Here you can also choose the language for the application (if your desired language is available). You can always change language later!

For the purpose of this guide, proceed through the onboarding by clicking "Get started".

{{< figure src="../media/first-time-setup/first-page.png" class="guide-pic" alt="The first page when strimertül is opened for the first time" >}}

## Twitch application credentials

In order for strimertül to communicate with Twitch APIs, you will need to register it as an application on the Twitch Developers portal. This is because as an open source application that you run, there is no central strimertül and each instance requires to be registered by whoever controls it.

Note that to create an application you might be asked to enhance the security of your account, for example by enabling Two-Factor authentication.

To access the portal just click the link in the UI, it will open it in your default browser.

{{< figure src="../media/first-time-setup/twitch-1.png" class="guide-pic" alt="The twitch app configuration page, with the link to create a new app highlighted" >}}

Once in the developer portal, fill out the info as specified in the user interface (i.e. OAuth redirect URL and Category), the name of the application is not important, so choose any that fits your liking.

{{< figure src="../media/first-time-setup/twitch-create.png" class="guide-pic" alt="Creating a new twitch application in the developer portal" >}}

After you created your application, click the "Manage" button in the application list so you can get its credentials.

{{< figure src="../media/first-time-setup/twitch-list.png" class="guide-pic" alt="The application list, with our newly created app" >}}

Scroll down to the bottom and click "New secret". Unlike the Client ID, the generated secret will only be shown **once** so make sure to keep the page open until you are done with the configuration.

{{< figure src="../media/first-time-setup/twitch-new-sec.png" class="guide-pic" alt="The application page, with the New Secret button highlighted" >}}

Once the secret has been generated and shown, copy over both Client ID and Client Secret to their respective text boxes in strimertül.

{{< figure src="../media/first-time-setup/twitch-copy.png" class="guide-pic" alt="The application page, with both client ID and secret highlighted" >}}

After all is copied, click "Test connection" to let strimertül use the provided credentials to check if they are working correctly. If you get an error screen like the following, double check your credentials.

{{< figure src="../media/first-time-setup/twitch-error.png" class="guide-pic" alt="The error dialog that pops up if the credentials are not valid" >}}

If everything is valid, you will be automatically moved to the next step.

## Twitch user authentication

Now that you have registered strimertül as a Twitch application, you need to authenticate your user to it so it can access your stream info and events.

Click the "Authenticate with Twitch" to open the authentication flow in your default browser.

{{< figure src="../media/first-time-setup/event-ui.png" class="guide-pic" alt="The non-authenticated page" >}}

You will be brought on the Twitch authentication flow where you will see all the permissions strimertül asks for. This list is subject to change as Twitch changes APIs over time.

(FLASHBANG WARNING)

{{< figure src="../media/first-time-setup/event-auth.png" class="guide-pic flashbang" alt="The non-authenticated page" >}}

Once accepted, the page should either close down or give you a "All done, close me" message, at which point it's safe to close.

Check that strimertül shows the user like so:

{{< figure src="../media/first-time-setup/event-status.png" class="guide-pic" alt="The user showing up as authenticated" >}}

If not, repeat the authentication, otherwise finish up by clicking the button at the bottom.

{{< figure src="../media/first-time-setup/event-complete.png" class="guide-pic" alt="The authenticated event page, with the Finish button highlighted" >}}

## All done

You are all set! The final page just contains some links to reach out for issues or further clarifications. Click the "Complete onboarding" button to close the first time setup and play around with strimertül.

{{< figure src="../media/first-time-setup/onboarding-end.png" class="guide-pic" alt="The final page with contact info" >}}
