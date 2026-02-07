CREATE TABLE A (colA INT, colB INT);
INSERT INTO A VALUES (2, NULL), (3, 6), (2, 3), (NULL, 3), (4, 5);

SELECT count(colB) FROM A WHERE colA IN (2, 3) OR colB IN (3, 5);