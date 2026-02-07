CREATE TABLE 직원 (EMP_NO INT, EMP_NAME VARCHAR(20));
INSERT INTO 직원 VALUES (100, '김성모'), (200, '이재후'), (300, '이준형'), (400, '성우람'), (500, '홍찬종');
CREATE TABLE 급여 (EMP_NO INT, EMP_SAL INT);
INSERT INTO 급여 VALUES (100, 2500), (200, 3100), (300, 2900), (400, 2700), (500, 3000);

직원과 급여 테이블을 조인하여 급여가 3000 이상인 직원의 이름과 급여를 조회
SELECT 직원.EMP_NAME, 급여.EMP_SAL FROM 직원, 급여 WHERE 직원.EMP_NO = 급여.EMP_NO AND 급여.EMP_SAL >= 3000;