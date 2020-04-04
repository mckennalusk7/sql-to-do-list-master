-- Database Name =  Weekend-To-Do-App

CREATE TABLE "todo"
(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (120),
    "task completed" BOOLEAN
);