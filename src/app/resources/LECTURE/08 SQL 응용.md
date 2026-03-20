# [8과목] SQL 응용

## 1. SQL의 분류 ★매우 중요★
SQL(Structured Query Language)은 목적에 따라 크게 3가지(+TCL)로 분류됩니다. 이 분류를 묻는 문제가 단답형으로 단골 출제됩니다.

* **DDL (데이터 정의어):** 테이블, 스키마, 뷰, 인덱스 등을 정의/변경/삭제하는 명령어. (DBA, 설계자 사용)
    * `CREATE` (생성), `ALTER` (변경), `DROP` (삭제), `TRUNCATE` (내용 모두 삭제)
* **DML (데이터 조작어):** 저장된 데이터를 실질적으로 관리하고 조작하는 명령어. (일반 사용자 사용)
    * `SELECT` (검색), `INSERT` (삽입), `UPDATE` (수정), `DELETE` (삭제)
* **DCL (데이터 제어어):** 데이터의 보안, 무결성, 회복, 병행 수행 제어 등을 정의하는 명령어. (DBA 사용)
    * `GRANT` (권한 부여), `REVOKE` (권한 회수)
* **TCL (트랜잭션 제어어):** 논리적인 작업의 단위를 묶어서 제어하는 명령어.
    * `COMMIT` (정상 완료 반영), `ROLLBACK` (취소 및 복구), `SAVEPOINT` (복구 지점 설정)

## 2. DDL (Data Definition Language) 주요 구문
* **테이블 생성:** `CREATE TABLE 테이블명 (속성명 데이터타입 [제약조건], ... );`
* **테이블 변경 (칼럼 추가):** `ALTER TABLE 테이블명 ADD 속성명 데이터타입;`
* **테이블 삭제:** `DROP TABLE 테이블명 [CASCADE | RESTRICT];`
  * `CASCADE`: 참조하는 다른 테이블이나 뷰도 함께 연쇄 삭제
  * `RESTRICT`: 다른 곳에서 참조 중이면 삭제를 취소

## 3. DML (Data Manipulation Language) 주요 구문 ★실무&시험 단골★
* **검색 (SELECT):** `SELECT [DISTINCT] 속성명 FROM 테이블명 [WHERE 조건] [GROUP BY 속성명] [HAVING 그룹조건] [ORDER BY 속성명 [ASC|DESC]];`
  * `DISTINCT`: 중복 제거
  * `ASC`: 오름차순(기본값) / `DESC`: 내림차순
* **삽입 (INSERT):** `INSERT INTO 테이블명(속성1, 속성2...) VALUES (데이터1, 데이터2...);`
* **수정 (UPDATE):** `UPDATE 테이블명 SET 속성명 = 데이터 [WHERE 조건];`
* **삭제 (DELETE):** `DELETE FROM 테이블명 [WHERE 조건];` 
  *(※ WHERE 절이 없으면 테이블의 모든 데이터(튜플)가 삭제되므로 주의!)*

## 4. 조인 (JOIN)
2개 이상의 테이블을 연결하여 하나의 결과를 만들어 내는 연산입니다.
* **내부 조인 (INNER JOIN):** 두 테이블에 공통으로 존재하는 데이터만 추출 (교집합).
* **외부 조인 (OUTER JOIN):** 공통된 데이터뿐만 아니라, 한쪽 테이블에만 있는 데이터도 포함하여 추출. (LEFT, RIGHT, FULL OUTER JOIN)
* **교차 조인 (CROSS JOIN):** 조인 조건이 없는 모든 데이터의 조합을 추출 (Cartesian Product).

## 5. 절차형 SQL (프로시저, 트리거, 사용자 정의 함수)
연속적인 실행이나 분기, 반복 등의 제어가 가능한 SQL입니다. 개념을 묻는 단답형으로 자주 나옵니다.
* **프로시저 (Procedure):** 특정 기능을 수행하는 일종의 트랜잭션 언어. 일련의 쿼리들을 마치 하나의 함수처럼 실행하기 위한 쿼리의 집합. (리턴값이 없거나 여러 개일 수 있음)
* **트리거 (Trigger):** 데이터베이스 시스템에서 데이터의 입력, 갱신, 삭제 등의 **이벤트(Event)가 발생할 때마다 자동으로 실행**되는 절차형 SQL. (수동 실행 불가)
* **사용자 정의 함수 (User-Defined Function):** 프로시저와 유사하지만, 일련의 SQL 처리를 수행한 후 **반드시 단일 값(Return)을 반환**하는 절차형 SQL. (SELECT 문의 일부로 사용 가능)