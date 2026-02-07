CREATE TABLE 사원 (사번 INT, 나이 INT, 직급 VARCHAR(10));
INSERT INTO 사원 VALUES (1, 42, '과장'), (2, 49, '부장'), (3, 31, '대리');

π직급(사원): 사원 테이블에서 직급 속성만 추출하는 관계대수 프로젝션 연산
SELECT 직급 FROM 사원 GROUP BY 직급;


σ(시그마): 선택(Selection) - 나이가 40 이상인 사원
SELECT * FROM 사원 WHERE 나이 >= 40;

π(파이): 프로젝션(Projection) - 직급만 선택
SELECT DISTINCT 직급 FROM 사원;

⨝(보타이): 조인(Join) - 사원과 부서 테이블 조인 (예시)
SELECT * FROM 사원 A JOIN 부서 B ON A.부서코드 = B.부서코드;

∪(합집합): Union - 두 쿼리 결과 합치기
SELECT 사번 FROM 사원 WHERE 나이 > 40 UNION SELECT 사번 FROM 사원 WHERE 직급 = '부장';

∩(교집합): Intersect - 두 쿼리 결과의 교집합
SELECT 사번 FROM 사원 WHERE 나이 > 40 INTERSECT SELECT 사번 FROM 사원 WHERE 직급 = '부장';

-(차집합): Except/Minus - 첫 번째 결과에서 두 번째 결과 제외
SELECT 사번 FROM 사원 WHERE 나이 > 40 EXCEPT SELECT 사번 FROM 사원 WHERE 직급 = '부장';

×(카르테시안 곱): Cross Join - 모든 조합
SELECT * FROM 사원 CROSS JOIN 부서;

÷(나눗셈): Division - R÷S (앞서 R%S 예시 참조)
SELECT DISTINCT A# FROM R WHERE NOT EXISTS (SELECT B# FROM S WHERE NOT EXISTS (SELECT * FROM R R2 WHERE R2.A# = R.A# AND R2.B# = S.B#));