---
title: 为什么我会选择 IDE 而非 CLI
author: 黄国政
date: '2026-03-26'
slug: ide-is-better-than-cli
categories: []
tags:
  - IDE
  - CLI
draft: true
---

<!--more-->

自从

```Powershell
PS C:\Users\Sonde> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
PS C:\Users\Sonde> irm get.scoop.sh | iex
```

```Bash
Initializing...
Downloading...
Creating shim...
Adding ~\scoop\shims to your path.
Scoop was installed successfully!
Type 'scoop help' for instructions.
```

```Powershell
PS C:\Users\Sonde> scoop install hugo
```

```Bash
Installing 'hugo' (0.159.0) [64bit] from 'main' bucket
hugo_0.159.0_windows-amd64.zip (18.1 MB) [===========================] 100%
Checking hash of hugo_0.159.0_windows-amd64.zip ... ok.
Extracting hugo_0.159.0_windows-amd64.zip ... done.
Linking ~\scoop\apps\hugo\current => ~\scoop\apps\hugo\0.159.0
Creating shim for 'hugo'.
'hugo' (0.159.0) was installed successfully!
```

```Powershell
PS C:\Users\Sonde> hugo version
```

```Bash
hugo v0.159.0-2ed7d193cfdfcf11808fb2a921a9429423b0ebe9 windows/amd64 BuildDate=2026-03-23T18:16:59Z VendorInfo=gohugoio
```