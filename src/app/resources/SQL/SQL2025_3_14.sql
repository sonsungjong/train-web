CREATE TABLE R (A VARCHAR(10), B VARCHAR(10));
INSERT INTO R VALUES ('a1', 'b1'), ('a1', 'b2'), ('a1', 'b4'), ('a1', 'b5'), ('a2', 'b2');

CREATE TABLE S (B VARCHAR(10));
INSERT INTO S VALUES ('b2'), ('b4');

CREATE TABLE T (B VARCHAR(10));
INSERT INTO T VALUES ('b4'), ('b5');

[관계대수 연산 기호]
1. Selection (σ) : 특정 조건에 맞는 행 검색
SELECT * FROM R WHERE A = 'a1';

2. Projection (π) : 특정 속성(열) 검색
SELECT DISTINCT B FROM R;

3. Union (∪) : 합집합 (S ∪ T)
SELECT B FROM S
UNION
SELECT B FROM T;

4. Intersection (∩) : 교집합 (S ∩ T)
-- (MySQL 8.0 이전 등에서는 지원하지 않을 수 있으며, 이 경우 INNER JOIN 또는 IN 연산자 활용)
SELECT B FROM S
INTERSECT
SELECT B FROM T;

5. Difference (-) : 차집합 (S - T)
-- (Oracle은 MINUS, SQL Server/PostgreSQL은 EXCEPT 사용. MySQL 8.0 이전은 NOT IN 등으로 구현)
SELECT B FROM S
EXCEPT
SELECT B FROM T;

6. Cartesian Product (×) : 교차 곱 (R × S)
SELECT * FROM R CROSS JOIN S;

7. Natural Join (⋈) : 자연 조인 (동일한 이름을 가진 공통 속성 기준으로 조인)
SELECT * FROM R NATURAL JOIN S;

8. Division (÷) : 나누기 연산 (R ÷ S 또는 R % S)
S의 모든 B 값과 연관된 R의 A 속성값들을 찾는다
SELECT DISTINCT A FROM R WHERE NOT EXISTS (
    SELECT B FROM S WHERE NOT EXISTS (
        SELECT * FROM R AS R2 WHERE R2.A = R.A AND R2.B = S.B
    )
);