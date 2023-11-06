---
menu: main
title: API reference
weight: 100
---

You can interact with any part of strimertül through its API. In fact the main UI of strimertül is just a single page application that accesses the service through the API itself (with a couple shortcuts to bypass authentication), this means almost anything you can access through the UI you can access through the API!

## Kilovolt

The strimertül's API is a [Kilovolt](https://github.com/strimertul/kilovolt) server, a pub/sub key-value store accessible via websocket. Check [this repository](https://github.com/strimertul/kilovolt-clients) for a list of officially supported kilovolt clients (or submit your own). You should be able to easily build a client yourself by just creating a websocket connection and using the [Kilovolt protocol](https://github.com/strimertul/kilovolt/blob/main/PROTOCOL.md).

## Available keys/RPC/events

To check what keys you can access on strimertül, click on the menu entry with your strimertül version (or the closest one to it). Most keys will be stored as JSON objects, so use the reference as a schema for those objects. Modifying the schema might make strimertül not work correctly (or at all).
