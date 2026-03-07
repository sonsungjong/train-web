CREATE TABLE A (colA INT, colB INT);
INSERT INTO A VALUES (2, NULL), (3, 6), (2, 3), (NULL, 3), (4, 5);

colA가 2 묶음(2,3) 혹은 colB가 3 묶음(3,5)인 데이터 중 colB가 NULL이 아닌 건수 조회
SELECT count(colB) FROM A WHERE colA IN (2, 3) OR colB IN (3, 5);
