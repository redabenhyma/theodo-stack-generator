# 1. Record architecture decisions

Date: 2018-09-07

## Status

Accepted

## Context

This project generates project according to Theodo's current technical and technological
standards. Every time we adopt a new technology or a new way of doing things, people
asks why it has been added. This is the purpose of ADR.
Thus, we need to record the architectural decisions we make.

## Decision

We will use Architecture Decision Records format, as [described by Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).

## Consequences

As of now, we won't merge pull requests adding new technologies nor changing practices
without an ADR for it.
See Michael Nygard's article, linked above, to write ADR.
We will use [adr-tools](https://github.com/npryce/adr-tools) to generate ADR.
