CREATE TABLE Table (사원번호 INT, 급여 INT);
INSERT INTO Table VALUES (100, 400), (101, 380), (102, 410), (103, 350);

사원번호가 100보다 크고, 급여가 400이거나 사원번호가 102인 사원의 수를 카운트
SELECT COUNT(*) FROM Table WHERE 사원번호 > 100 AND (급여 = 400 OR 사원번호 = 102);