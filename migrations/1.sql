CREATE TABLE Workouts (
	id TEXT PRIMARY KEY,
	filming_datetime TEXT NOT NULL,
	filming_duration INTEGER NOT NULL,
    workout_status TEXT NOT NULL,
    trainer_id TEXT NOT NULL,
    workout_level TEXT NOT NULL,
    created TEXT NOT NULL,
    modified TEXT NOT NULL,
    FOREIGN KEY(trainer_id) REFERENCES Trainers (id)
);