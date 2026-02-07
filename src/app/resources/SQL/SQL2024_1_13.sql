CREATE TABLE Table1 (A VARCHAR(10), B VARCHAR(10), C INT);
INSERT INTO Table1 VALUES ('가', 'a', 11), ('나', 'b', 11), ('다', 'd', 22), ('라', 'c', 22);
CREATE TABLE Table2 (C INT, D VARCHAR(10), E INT);
INSERT INTO Table2 VALUES (11, 'K', 3), (33, 'K', 3), (44, 'S', 2);

Table2에서 D가 'K'인 C 값들을 찾아서, 그 C 값들과 일치하는 Table1의 B 컬럼을 조회 (서브쿼리 IN 사용)
SELECT B FROM Table1 WHERE C IN (SELECT C FROM Table2 WHERE D='K');