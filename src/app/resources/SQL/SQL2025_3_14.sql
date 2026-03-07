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
두 릴레이션(테이블)의 데이터 구조가 같을 때 중복을 제거하여 합친다.
SELECT B FROM S
UNION
SELECT B FROM T;

4. Intersection (∩) : 교집합 (S ∩ T)
두 릴레이션(테이블)에 공통으로 존재하는 튜플만 반환한다.
SELECT B FROM S
INTERSECT
SELECT B FROM T;

5. Difference (-) : 차집합 (S - T)
첫 번째 릴레이션(테이블)에는 존재하지만 두 번째에는 존재하지 않는 튜플 반환.
SELECT B FROM S
MINUS
SELECT B FROM T;

6. Cartesian Product (×) : 교차 곱 (R × S)
두 릴레이션(테이블)의 모든 튜플(행)들을 각각 연결하여 만들어진 새로운 튜플을 반환.
SELECT * FROM R CROSS JOIN S;

7. Natural Join (⋈) : 자연 조인 
동일한 이름을 가진 공통 속성(열) 기준으로 조인
SELECT * FROM R NATURAL JOIN S;

8. Division (÷) : 나누기 연산 (R ÷ S 또는 R % S)
S의 모든 B 값과 연관된 R의 A 속성(열)값들을 찾는다
SELECT DISTINCT A FROM R WHERE NOT EXISTS (
    SELECT B FROM S WHERE NOT EXISTS (
        SELECT * FROM R AS R2 WHERE R2.A = R.A AND R2.B = S.B
    )
);

[관계대수 용어 정리]
릴레이션(Relation) = 테이블(Table) : 전체 표
튜플(Tuple) = 행(Row, Record) : 데이터의 한 줄 (예: 회원의 한 명의 정보 전체)
속성(Attribute) = 열(Column, Field) : 데이터의 특징 (예: 이름, 나이, 전화번호 등)
도메인(Domain) = 한 속성이 가질 수 있는 값의 범위 (예: 성별 열의 도메인은 '남', '여')
