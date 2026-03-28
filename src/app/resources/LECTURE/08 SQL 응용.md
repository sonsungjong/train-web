# [8과목] SQL 응용

---

## 1. SQL의 분류

| 분류 | 설명 | 명령어 |
| :--- | :--- | :--- |
| **DDL (데이터 정의어)** | 테이블, 스키마, 뷰, 인덱스 등을 정의/변경/삭제 | CREATE, ALTER, DROP, TRUNCATE |
| **DML (데이터 조작어)** | 저장된 데이터를 관리하고 조작 | SELECT, INSERT, UPDATE, DELETE |
| **DCL (데이터 제어어)** | 데이터 보안, 무결성, 회복, 병행 수행 제어 | GRANT, REVOKE |
| **TCL (트랜잭션 제어어)** | 논리적 작업 단위를 묶어서 제어 | COMMIT, ROLLBACK, SAVEPOINT |

---

## 2. DDL (Data Definition Language)

### 테이블 생성
CREATE TABLE 학생 (
    학번 CHAR(8) PRIMARY KEY,
    이름 VARCHAR(20) NOT NULL,
    학과 VARCHAR(30),
    학년 INT CHECK(학년 BETWEEN 1 AND 4),
    연락처 VARCHAR(15) UNIQUE,
    학과코드 CHAR(4) REFERENCES 학과(학과코드)
        ON DELETE CASCADE
        ON UPDATE SET NULL
);

### 제약조건

| 제약조건 | 설명 |
| :--- | :--- |
| **PRIMARY KEY** | 기본키. 테이블의 각 행을 유일하게 식별. NULL 허용 안 함. 테이블당 하나 |
| **FOREIGN KEY** | 외래키. 다른 테이블의 기본키를 참조. 참조 무결성 보장 |
| **UNIQUE** | 해당 속성의 값이 중복되지 않도록 보장. NULL은 허용 |
| **NOT NULL** | 해당 속성에 NULL 값을 허용하지 않음 |
| **CHECK** | 속성의 값에 대한 조건을 설정 |
| **DEFAULT** | 속성의 기본값을 설정 |

### 외래키 참조 무결성 옵션 (ON DELETE / ON UPDATE)
부모 테이블의 행이 삭제/수정될 때 자식 테이블의 외래키를 어떻게 처리할지 결정합니다.

| 옵션 | 설명 |
| :--- | :--- |
| **CASCADE** | 부모가 삭제/수정되면 참조하는 자식도 **연쇄 삭제/수정** |
| **SET NULL** | 부모가 삭제/수정되면 자식의 외래키 값을 **NULL로 변경** |
| **SET DEFAULT** | 부모가 삭제/수정되면 자식의 외래키 값을 **기본값으로 변경** |
| **RESTRICT** | 자식이 참조하고 있으면 부모의 삭제/수정을 **거부** |
| **NO ACTION** | RESTRICT와 유사. 참조 무결성을 위반하는 조작을 취하지 않음 |

### 테이블 변경 (ALTER)
```sql
-- 칼럼 추가
ALTER TABLE 학생 ADD 주소 VARCHAR(50);

-- 칼럼 수정
ALTER TABLE 학생 MODIFY 이름 VARCHAR(30);

-- 칼럼 삭제
ALTER TABLE 학생 DROP COLUMN 주소;
```

### 테이블 삭제 (DROP)
```sql
DROP TABLE 학생 CASCADE;   -- 참조하는 다른 테이블/뷰도 연쇄 삭제
DROP TABLE 학생 RESTRICT;  -- 다른 곳에서 참조 중이면 삭제 취소
```

### TRUNCATE vs DELETE vs DROP
| 구분 | TRUNCATE | DELETE | DROP |
| :--- | :--- | :--- | :--- |
| **분류** | DDL | DML | DDL |
| **효과** | 테이블 구조 유지, **데이터만 전부 삭제** | 조건에 맞는 데이터(행) 삭제 | 테이블 **구조+데이터 모두 삭제** |
| **복구** | ROLLBACK 불가 | ROLLBACK 가능 | ROLLBACK 불가 |
| **WHERE** | 사용 불가 | 사용 가능 | 사용 불가 |

### 인덱스 (INDEX)
```sql
-- 인덱스 생성
CREATE INDEX idx_학생_이름 ON 학생(이름);

-- 고유 인덱스 생성 (중복값 허용 안 함)
CREATE UNIQUE INDEX idx_학생_연락처 ON 학생(연락처);

-- 인덱스 삭제
DROP INDEX idx_학생_이름;
```

---

## 3. DML (Data Manipulation Language)

### SELECT 구문
```sql
SELECT [DISTINCT] 속성명
FROM 테이블명
[WHERE 조건]
[GROUP BY 속성명]
[HAVING 그룹조건]
[ORDER BY 속성명 [ASC|DESC]];
```

> **실행 순서:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

* `DISTINCT`: 중복 제거
* `ASC`: 오름차순(기본값) / `DESC`: 내림차순

### LIKE 연산자 (패턴 매칭) ★빈출★
| 와일드카드 | 설명 | 예시 |
| :--- | :--- | :--- |
| **%** | 0개 이상의 임의 문자 | `'김%'` → 김, 김철수, 김영희 등 |
| **_** | 정확히 1개의 임의 문자 | `'김_'` → 김수, 김철 (2글자만) |

```sql
-- 이름이 '김'으로 시작하는 학생 조회
SELECT * FROM 학생 WHERE 이름 LIKE '김%';

-- 이름이 정확히 3글자이면서 '김'으로 시작하는 학생
SELECT * FROM 학생 WHERE 이름 LIKE '김__';

-- 학과명에 '컴퓨터'가 포함된 학과
SELECT * FROM 학생 WHERE 학과 LIKE '%컴퓨터%';
```

### NULL 관련 연산 ★빈출★
* NULL과의 **모든 산술 연산** 결과는 NULL → `100 + NULL = NULL`
* NULL과의 **모든 비교 연산** 결과는 UNKNOWN → `NULL = NULL` 은 참이 아님
* NULL 검사는 반드시 **IS NULL / IS NOT NULL** 사용
* 집계 함수에서 NULL은 **제외**하고 계산 (단, COUNT(*)는 NULL 포함)

```sql
-- NULL인 행 조회 (올바른 방법)
SELECT * FROM 학생 WHERE 연락처 IS NULL;

-- ❌ 잘못된 방법 (결과가 나오지 않음)
SELECT * FROM 학생 WHERE 연락처 = NULL;
```

### 집계 함수 (Aggregate Function)

| 함수 | 설명 |
| :--- | :--- |
| **COUNT(속성)** | 튜플(행)의 수를 구함. COUNT(*)는 NULL 포함, COUNT(속성)은 NULL 제외 |
| **SUM(속성)** | 합계를 구함 |
| **AVG(속성)** | 평균을 구함 (NULL은 제외하고 계산) |
| **MAX(속성)** | 최대값을 구함 |
| **MIN(속성)** | 최소값을 구함 |

### GROUP BY + HAVING 활용 예시
```sql
-- 학과별 학생 수가 3명 이상인 학과와 학생 수를 출력
SELECT 학과, COUNT(*) AS 학생수
FROM 학생
GROUP BY 학과
HAVING COUNT(*) >= 3;
```

> **WHERE vs HAVING 차이:**
> * WHERE: 그룹화 **전** 개별 행에 대한 조건 (집계 함수 사용 불가)
> * HAVING: 그룹화 **후** 그룹에 대한 조건 (집계 함수 사용 가능)

### INSERT / UPDATE / DELETE
```sql
-- 삽입
INSERT INTO 학생(학번, 이름, 학과) VALUES ('20240001', '홍길동', '컴퓨터공학');

-- 수정
UPDATE 학생 SET 학과 = '정보통신' WHERE 이름 = '홍길동';

-- 삭제 (WHERE 없으면 모든 행 삭제!)
DELETE FROM 학생 WHERE 학번 = '20240001';
```

---

## 4. 서브쿼리 (Subquery)
SQL 문 안에 포함된 또 다른 SQL 문입니다.

### 서브쿼리 연산자
| 연산자 | 설명 |
| :--- | :--- |
| **IN** | 서브쿼리 결과 중 **하나라도 일치**하면 참 |
| **EXISTS** | 서브쿼리 결과가 **존재하면** 참 (행의 존재 여부만 확인) |
| **ANY / SOME** | 서브쿼리 결과 중 **하나라도 조건을 만족**하면 참 |
| **ALL** | 서브쿼리 결과의 **모든 값이 조건을 만족**해야 참 |

### 서브쿼리 이해를 위한 예시 테이블

**[학생] 테이블**
| 학번 | 이름 | 학과 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 컴퓨터공학 |
| S002 | 김영희 | 전자공학 |
| S003 | 이철수 | 컴퓨터공학 |
| S004 | 박민수 | 경영학 |

**[성적] 테이블**
| 학번 | 과목명 | 점수 |
| :--- | :--- | :--- |
| S001 | 데이터베이스 | 90 |
| S001 | 자료구조 | 85 |
| S002 | 회로이론 | 78 |
| S003 | 데이터베이스 | 95 |

### 예시 1: IN — 컴퓨터공학과 학생의 성적 조회
```sql
SELECT * FROM 성적
WHERE 학번 IN (SELECT 학번 FROM 학생 WHERE 학과 = '컴퓨터공학');
```
**동작 과정:**
1. 안쪽 쿼리 실행 → 컴퓨터공학과 학번 = {S001, S003}
2. 바깥 쿼리에서 학번이 S001 또는 S003인 성적 행을 조회

**결과:**
| 학번 | 과목명 | 점수 |
| :--- | :--- | :--- |
| S001 | 데이터베이스 | 90 |
| S001 | 자료구조 | 85 |
| S003 | 데이터베이스 | 95 |

### 예시 2: EXISTS — 성적이 존재하는 학생만 조회
```sql
SELECT 이름, 학과 FROM 학생 A
WHERE EXISTS (SELECT 1 FROM 성적 B WHERE A.학번 = B.학번);
```
**동작 과정:**
1. 학생 테이블의 각 행마다 성적 테이블에 해당 학번이 있는지 확인
2. 존재하면 참 → 해당 학생을 출력

**결과:** 홍길동, 김영희, 이철수 (박민수는 성적 테이블에 없으므로 제외)

### 예시 3: ALL — 모든 컴퓨터공학과 학생 점수보다 높은 성적
```sql
SELECT * FROM 성적
WHERE 점수 > ALL (SELECT 점수 FROM 성적 
                   WHERE 학번 IN (SELECT 학번 FROM 학생 WHERE 학과 = '컴퓨터공학'));
```
**동작 과정:**
1. 컴퓨터공학과 학생(S001, S003)의 점수 = {90, 85, 95}
2. 점수 > ALL → 95보다 커야 함 (모든 값보다 커야 하므로 최대값 기준)
3. 해당하는 행 없음 → **결과 없음**

### 예시 4: ANY — 컴퓨터공학과 학생 점수 중 하나보다 높은 성적
```sql
SELECT * FROM 성적
WHERE 점수 > ANY (SELECT 점수 FROM 성적 
                   WHERE 학번 IN (SELECT 학번 FROM 학생 WHERE 학과 = '컴퓨터공학'));
```
**동작 과정:**
1. 컴퓨터공학과 학생 점수 = {90, 85, 95}
2. 점수 > ANY → 85보다 크기만 하면 참 (하나라도 만족하면 되므로 최소값 기준)

**결과:**
| 학번 | 과목명 | 점수 |
| :--- | :--- | :--- |
| S001 | 데이터베이스 | 90 |
| S003 | 데이터베이스 | 95 |

---

## 5. 조인 (JOIN)
2개 이상의 테이블을 연결하여 하나의 결과를 만들어 내는 연산입니다.

### 조인 이해를 위한 예시 테이블

**[학생] 테이블**
| 학번 | 이름 | 학과 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 컴퓨터공학 |
| S002 | 김영희 | 전자공학 |
| S003 | 이철수 | 컴퓨터공학 |
| S004 | 박민수 | 경영학 |

**[수강] 테이블**
| 학번 | 과목명 |
| :--- | :--- |
| S001 | 데이터베이스 |
| S001 | 자료구조 |
| S002 | 회로이론 |
| S005 | 경제학원론 |

> S003, S004는 수강 테이블에 없고, S005는 학생 테이블에 없는 상태입니다.

---

### 내부 조인 (INNER JOIN)
두 테이블에 **공통으로 존재하는 데이터만** 추출 (교집합).
```sql
SELECT A.학번, A.이름, B.과목명
FROM 학생 A INNER JOIN 수강 B ON A.학번 = B.학번;
```

**결과:** 양쪽 모두에 존재하는 S001, S002만 출력
| 학번 | 이름 | 과목명 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 데이터베이스 |
| S001 | 홍길동 | 자료구조 |
| S002 | 김영희 | 회로이론 |

> S003, S004는 수강 데이터가 없어서 제외. S005는 학생 데이터가 없어서 제외.

---

### LEFT OUTER JOIN
**왼쪽 테이블(학생) 기준**, 오른쪽에 매칭되지 않으면 NULL로 채움.
```sql
SELECT A.학번, A.이름, B.과목명
FROM 학생 A LEFT OUTER JOIN 수강 B ON A.학번 = B.학번;
```

**결과:** 학생 테이블의 모든 행 + 매칭되는 수강 정보 (없으면 NULL)
| 학번 | 이름 | 과목명 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 데이터베이스 |
| S001 | 홍길동 | 자료구조 |
| S002 | 김영희 | 회로이론 |
| S003 | 이철수 | **NULL** |
| S004 | 박민수 | **NULL** |

> S005는 왼쪽(학생) 테이블에 없으므로 출력되지 않음.

---

### RIGHT OUTER JOIN
**오른쪽 테이블(수강) 기준**, 왼쪽에 매칭되지 않으면 NULL로 채움.
```sql
SELECT A.학번, A.이름, B.과목명
FROM 학생 A RIGHT OUTER JOIN 수강 B ON A.학번 = B.학번;
```

**결과:** 수강 테이블의 모든 행 + 매칭되는 학생 정보 (없으면 NULL)
| 학번 | 이름 | 과목명 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 데이터베이스 |
| S001 | 홍길동 | 자료구조 |
| S002 | 김영희 | 회로이론 |
| S005 | **NULL** | 경제학원론 |

> S003, S004는 오른쪽(수강) 테이블에 없으므로 출력되지 않음.

---

### FULL OUTER JOIN
**양쪽 테이블 모두 기준**, 매칭되지 않는 행도 전부 포함.
```sql
SELECT A.학번, A.이름, B.과목명
FROM 학생 A FULL OUTER JOIN 수강 B ON A.학번 = B.학번;
```

**결과:** 양쪽 모든 행 출력, 매칭 안 되면 NULL
| 학번 | 이름 | 과목명 |
| :--- | :--- | :--- |
| S001 | 홍길동 | 데이터베이스 |
| S001 | 홍길동 | 자료구조 |
| S002 | 김영희 | 회로이론 |
| S003 | 이철수 | **NULL** |
| S004 | 박민수 | **NULL** |
| S005 | **NULL** | 경제학원론 |

---

### 교차 조인 (CROSS JOIN)
조인 조건 없이 모든 데이터의 조합을 추출 (Cartesian Product).
```sql
SELECT A.이름, B.과목명
FROM 학생 A CROSS JOIN 수강 B;
```
> 학생 4행 × 수강 4행 = **16행** 출력 (모든 조합)

---

### 자연 조인 (NATURAL JOIN)
두 테이블에서 **같은 이름의 속성**을 기준으로 자동 조인. 조인 조건을 명시하지 않음.
```sql
SELECT 학번, 이름, 과목명
FROM 학생 NATURAL JOIN 수강;
```
> 두 테이블에 공통으로 있는 '학번' 속성을 자동으로 조인 조건으로 사용. 결과는 INNER JOIN과 동일.

---

## 6. 윈도우 함수 (Window Function)

### 순위 함수
| 함수 | 설명 | 예시 (90, 80, 80, 70) |
| :--- | :--- | :--- |
| **RANK()** | 동일 순위 시 다음 순위를 **건너뜀** | 1, 2, 2, **4** |
| **DENSE_RANK()** | 동일 순위 시 다음 순위를 **건너뛰지 않음** | 1, 2, 2, **3** |
| **ROW_NUMBER()** | 동일 값이어도 **고유한 순번** 부여 | 1, 2, 3, 4 |

SELECT 이름, 점수, RANK() OVER (ORDER BY 점수 DESC) AS 순위 FROM 성적;

### 기타 윈도우 함수
| 함수 | 설명 |
| :--- | :--- |
| **NTILE(n)** | 결과를 n개 그룹으로 나눔 |
| **LAG(속성, n)** | 현재 행 기준 n행 **이전** 값 |
| **LEAD(속성, n)** | 현재 행 기준 n행 **이후** 값 |

---

## 7. 뷰 (VIEW)
하나 이상의 기본 테이블로부터 유도된 **논리적(가상) 테이블**입니다.

### 뷰의 특징
* 논리적 독립성을 제공 (기본 테이블 구조 변경에도 뷰를 사용하는 응용 프로그램은 영향 없음)
* 데이터 접근 제어로 **보안성** 향상 (특정 속성만 노출 가능)
* 뷰 위에 또 다른 뷰 정의 가능
* 삽입, 삭제, 갱신에 **제약**이 있음

### 뷰 생성/삭제
- 뷰 생성
CREATE VIEW 컴공학생 AS
SELECT 학번, 이름 FROM 학생 WHERE 학과 = '컴퓨터공학';

- 뷰 삭제
DROP VIEW 컴공학생;

---

## 8. DCL (Data Control Language)

### GRANT (권한 부여)

- 사용자 홍길동에게 학생 테이블의 SELECT, INSERT 권한 부여
GRANT SELECT, INSERT ON 학생 TO 홍길동;

- WITH GRANT OPTION: 권한을 받은 사용자가 다른 사용자에게 권한을 부여할 수 있음
GRANT SELECT ON 학생 TO 홍길동 WITH GRANT OPTION;

### REVOKE (권한 회수)
- 홍길동의 학생 테이블에 대한 SELECT 권한 회수
REVOKE SELECT ON 학생 FROM 홍길동;

- CASCADE: 홍길동이 다른 사용자에게 부여한 권한도 연쇄 회수
REVOKE SELECT ON 학생 FROM 홍길동 CASCADE;

---

## 9. 절차형 SQL

| 종류 | 설명 | 특징 |
| :--- | :--- | :--- |
| **프로시저 (Procedure)** | 일련의 쿼리를 하나의 함수처럼 실행하는 쿼리 집합 | 리턴값이 없거나 여러 개 가능. CALL로 호출 |
| **트리거 (Trigger)** | 데이터의 입력/갱신/삭제 **이벤트 발생 시 자동 실행** | 수동 실행 불가. COMMIT/ROLLBACK 사용 불가 |
| **사용자 정의 함수 (UDF)** | 프로시저와 유사하지만 **반드시 단일 값 반환(RETURN)** | SELECT 문의 일부로 사용 가능 |

### 프로시저 vs 사용자 정의 함수 비교
| 구분 | 프로시저 | 사용자 정의 함수 |
| :--- | :--- | :--- |
| 반환값 | 없거나 여러 개 (OUT 파라미터) | **반드시 하나** (RETURN) |
| 호출 방법 | CALL/EXECUTE 로 호출 | SELECT 문 안에서 호출 가능 |
| SQL 사용 | DML, DCL 사용 가능 | 주로 SELECT만 가능 |

---

## 10. 트랜잭션 (Transaction) 특성
데이터베이스의 상태를 변화시키기 위해 수행하는 논리적인 작업의 단위입니다.

| 특성 | 설명 |
| :--- | :--- |
| **원자성 (Atomicity)** | 트랜잭션 연산은 모두 반영(Commit)되거나 모두 취소(Rollback)되어야 함 (All or Nothing) |
| **일관성 (Consistency)** | 트랜잭션 수행 전후로 데이터베이스가 일관된 상태를 유지해야 함 |
| **독립성/격리성 (Isolation)** | 둘 이상의 트랜잭션이 동시 실행 시 서로의 연산에 끼어들 수 없음 |
| **영속성/지속성 (Durability)** | 성공적으로 완료된 트랜잭션의 결과는 영구적으로 반영되어야 함 |

> 암기: **ACID** (Atomicity, Consistency, Isolation, Durability)

---

## ★ 핵심 암기 포인트 ★

1. **SQL 분류:** DDL(CREATE/ALTER/DROP/TRUNCATE), DML(SELECT/INSERT/UPDATE/DELETE), DCL(GRANT/REVOKE), TCL(COMMIT/ROLLBACK/SAVEPOINT)
2. **SELECT 실행 순서:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
3. **WHERE vs HAVING:** WHERE=그룹화 전/개별 행, HAVING=그룹화 후/집계 함수 사용
4. **TRUNCATE vs DELETE:** TRUNCATE=DDL/전부삭제/복구불가, DELETE=DML/조건삭제/복구가능
5. **순위 함수:** RANK(건너뜀), DENSE_RANK(안 건너뜀), ROW_NUMBER(고유 순번)
6. **GRANT 구문:** GRANT 권한 ON 테이블 TO 사용자 [WITH GRANT OPTION]
7. **트랜잭션 ACID:** 원자성, 일관성, 독립성(격리성), 영속성(지속성)
8. **JOIN:** INNER(교집합), LEFT/RIGHT/FULL OUTER(한쪽 포함), CROSS(곱집합)
9. **절차형 SQL:** 프로시저(리턴X/여러개), 트리거(자동 실행), 함수(반드시 RETURN)
10. **뷰:** 논리적(가상) 테이블, 독립성 제공, 보안성 향상
11. **외래키 참조 옵션:** CASCADE(연쇄), SET NULL, SET DEFAULT, RESTRICT(거부), NO ACTION 
12. **LIKE 와일드카드:** %(0개 이상 문자), _(1개 문자) 
13. **NULL 연산:** 산술→NULL, 비교→UNKNOWN, 검사는 IS NULL/IS NOT NULL만 사용 
