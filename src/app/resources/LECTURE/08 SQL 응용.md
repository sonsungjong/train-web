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
```sql
CREATE TABLE 학생 (
    학번 CHAR(8) PRIMARY KEY,
    이름 VARCHAR(20) NOT NULL,
    학과 VARCHAR(30),
    학년 INT CHECK(학년 BETWEEN 1 AND 4),
    연락처 VARCHAR(15) UNIQUE,
    학과코드 CHAR(4) REFERENCES 학과(학과코드)
);
```

### 제약조건

| 제약조건 | 설명 |
| :--- | :--- |
| **PRIMARY KEY** | 기본키. 테이블의 각 행을 유일하게 식별. NULL 허용 안 함. 테이블당 하나 |
| **FOREIGN KEY** | 외래키. 다른 테이블의 기본키를 참조. 참조 무결성 보장 |
| **UNIQUE** | 해당 속성의 값이 중복되지 않도록 보장. NULL은 허용 |
| **NOT NULL** | 해당 속성에 NULL 값을 허용하지 않음 |
| **CHECK** | 속성의 값에 대한 조건을 설정 |
| **DEFAULT** | 속성의 기본값을 설정 |

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

```sql
-- 컴퓨터공학과 학생의 학번과 같은 학번을 가진 성적 조회
SELECT * FROM 성적
WHERE 학번 IN (SELECT 학번 FROM 학생 WHERE 학과 = '컴퓨터공학');
```

---

## 5. 조인 (JOIN)
2개 이상의 테이블을 연결하여 하나의 결과를 만들어 내는 연산입니다.

### 내부 조인 (INNER JOIN)
두 테이블에 **공통으로 존재하는 데이터만** 추출 (교집합).
```sql
SELECT A.학번, A.이름, B.과목명
FROM 학생 A INNER JOIN 수강 B ON A.학번 = B.학번;
```

### 외부 조인 (OUTER JOIN)
한쪽 테이블에만 있는 데이터도 포함하여 추출.
```sql
-- LEFT OUTER JOIN: 왼쪽 테이블 기준, 오른쪽에 매칭되지 않으면 NULL
SELECT A.이름, B.과목명
FROM 학생 A LEFT OUTER JOIN 수강 B ON A.학번 = B.학번;

-- RIGHT OUTER JOIN: 오른쪽 테이블 기준
-- FULL OUTER JOIN: 양쪽 모두 기준
```

### 교차 조인 (CROSS JOIN)
조인 조건 없이 모든 데이터의 조합을 추출 (Cartesian Product).

### 자연 조인 (NATURAL JOIN)
두 테이블에서 **같은 이름의 속성**을 기준으로 자동 조인.

---

## 6. 윈도우 함수 (Window Function)

### 순위 함수
| 함수 | 설명 | 예시 (90, 80, 80, 70) |
| :--- | :--- | :--- |
| **RANK()** | 동일 순위 시 다음 순위를 **건너뜀** | 1, 2, 2, **4** |
| **DENSE_RANK()** | 동일 순위 시 다음 순위를 **건너뛰지 않음** | 1, 2, 2, **3** |
| **ROW_NUMBER()** | 동일 값이어도 **고유한 순번** 부여 | 1, 2, 3, 4 |

```sql
SELECT 이름, 점수,
       RANK() OVER (ORDER BY 점수 DESC) AS 순위
FROM 성적;
```

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
```sql
-- 뷰 생성
CREATE VIEW 컴공학생 AS
SELECT 학번, 이름 FROM 학생 WHERE 학과 = '컴퓨터공학';

-- 뷰 삭제
DROP VIEW 컴공학생;
```

---

## 8. DCL (Data Control Language)

### GRANT (권한 부여)
```sql
-- 사용자 홍길동에게 학생 테이블의 SELECT, INSERT 권한 부여
GRANT SELECT, INSERT ON 학생 TO 홍길동;

-- WITH GRANT OPTION: 권한을 받은 사용자가 다른 사용자에게 권한을 부여할 수 있음
GRANT SELECT ON 학생 TO 홍길동 WITH GRANT OPTION;
```

### REVOKE (권한 회수)
```sql
-- 홍길동의 학생 테이블에 대한 SELECT 권한 회수
REVOKE SELECT ON 학생 FROM 홍길동;

-- CASCADE: 홍길동이 다른 사용자에게 부여한 권한도 연쇄 회수
REVOKE SELECT ON 학생 FROM 홍길동 CASCADE;
```

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
