CREATE TABLE 성적 (학번 INT, 이름 VARCHAR(10), 학과 VARCHAR(20), 학년 INT, 점수 INT);
INSERT INTO 성적 VALUES 
(2022512, '김연진', '컴퓨터공학', 3, 90),
(2120326, '문동은', '전자공학', 3, 80),
(2204534, '차호윤', '컴퓨터공학', 2, 95),
(2309876, '성우람', '전자공학', 1, 85),
(1923094, '홍찬종', '건축학', 4, 95),
(2102934, '이사랑', '건축학', 2, 100);

2학년이상 학생 중 학과별 평균 90 이상인 학과의 최대/최소점수
SELECT 학과, MAX(점수) AS 최대점수, MIN(점수) AS 최소점수
FROM 성적
WHERE 학년 >= 2
GROUP BY 학과
HAVING AVG(점수) >= 90
ORDER BY 최대점수 DESC, 최소점수 DESC;


쿼리 : SELECT _ FROM _ WHERE _ GROUP BY _ HAVING _ ORDER BY _
순서 : FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY