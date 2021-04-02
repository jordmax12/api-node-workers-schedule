# FightCamp API Trial

Welcome to the FightCamp's Backend Trial. Today is meant to test your skills with Node.js, Javascript, Express.js, relational databases, and developing an elegant, sophisticated API. It's an opportunity for us to know you in your working environment and how you manage your time. Above all, it's also a good opportunity for you to see the backstage of FightCamp and how awesome we are 😎

## Description

The goal of this project will be to help our Content Team manage their Daily schedule for filming `Workouts` in the FightCamp Studio. You will focus on building the API that will enable this tool.

Producers create schedules for `workout` shoots and assign `trainers` to them. They also set the status of the `workouts` as they move through plannning to completion. They need a robust searching capability so they can easily find the workouts through the different phases. The trainers need a easy way to see all the workouts they are assinged.

## Requirements

### For this project, you need to use

- Node 12 or higher
- Express.js
- Sqlite3
- Jest

### API Output

`Workouts` should have at least the following

- `Name` - Free form name for the workout
- `Filming Date/Time` - In ISO 8601 format
- `Filming Duration` - Integer representing duration in minutes
- `Status` - Current workout status like `planning`, `ready`, `completed` and `canceled`
- `Trainer` - Person who will be doing this specific workout
- `Level` - Difficulty like `beginner`, `intermediate` or `advanced`

`Trainers` should have at least the following

- `Name`
- `Picture`

The completed API should be able to do the following:

- Add a new workout
- Get a specific workout
- Update workout
- Get all workouts filterable by name, filming date/time, duration, status, trainer or level
- Get a specific trainer with their name and picture and a list of the workouts that they are assinged to in their filming time order

* Your endpoints that return lists should ideally be built in a way that supports pagination.

### Additional Requirements

For the purposes of having a fully functioning prototype, we would like to see
Middleware built into your server for `Auth` (we prefer you avoid using plugins like Passport)
and `Error handling`.

### Bonus

Add caching

## Demo at the end of the day, you will:

- Using Postman or any alternatives, test each endpoint
- Present the architecture of the database
- Present your code and how it is structured
- Finally, we will ask some technical question about the project

## What will be evaluated

- Good habits in project's structure
- Clean code
- Scalable architecture/solution
- Proper use of Express middlewares

## Quick tips

Don't be afraid to ask questions if you are not sure with certains aspects of the trial.
Make sure to breakdown the projects into smaller parts. It's okay if the project is not completed at the end of the trial, we don't expect it to be with the short timeframe, but being able to demo working features will help during the evaluation.

## Project submission

Use Git to commit your code during your trial and push your solution to a repository which you can share with the team
