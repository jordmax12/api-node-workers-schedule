CREATE TABLE Workouts (
	workout_id TEXT PRIMARY KEY,
	filming_datetime TEXT NOT NULL,
	filming_duration INTEGER NOT NULL,
    workout_status TEXT NOT NULL,
    trainer_id TEXT NOT NULL,
    workout_level TEXT NOT NULL
);