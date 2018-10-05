# 2. Frontend Javascript typing

Date: 2018-10-05

## Status

Accepted

## Context

Javascript is dynamically typed.
Lots of bugs and regressions are due to the lack of control on the objects' structure.
Javascript typing solves this problem.

## Decision

All Theodo projects will start with a basic Flow config in order to type the developed classes and objects.

## Consequences

Developers can choose to type their files if they want to.
Ignored files and folder can be configured in the `.flowconfig` file.
