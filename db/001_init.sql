-- 1. 创建临时表
CREATE TABLE temp_points (
    id SERIAL PRIMARY KEY,
    name TEXT,
    geom GEOMETRY(Point, 4326)
);

-- 2. 创建线表 (Lines) - 适合存储路径、河流或道路
CREATE TABLE temp_line (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    geom GEOMETRY(LineString, 4326)
);

-- 3. 创建面表 (Polygons) - 适合存储建筑轮廓、行政区划
CREATE TABLE temp_polygon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    geom GEOMETRY(Polygon, 4326)
);

CREATE INDEX idx_temp_points_geom ON temp_points USING GIST (geom);
CREATE INDEX idx_temp_line_geom ON temp_line USING GIST (geom);
CREATE INDEX idx_temp_polygon_geom ON temp_polygon USING GIST (geom);


-- 2. 插入测试点（以广州中山大学附近为例：113.30, 23.10）
INSERT INTO temp_points (name, geom) 
VALUES ('SYSU_Point', ST_SetSRID(ST_MakePoint(113.30, 23.10), 4326));

-- 插入线 (连接两个点)
INSERT INTO temp_line (name, geom) VALUES ('Path A', ST_GeomFromText('LINESTRING(113.3 23.1, 113.4 23.2)', 4326));

-- 插入面 (首尾坐标闭合的环)
INSERT INTO temp_polygon (name, geom) VALUES ('Area A', ST_GeomFromText('POLYGON((113.3 23.1, 113.4 23.1, 113.4 23.2, 113.3 23.1))', 4326));

-- 3. 查看插入结果
SELECT name, ST_AsText(geom) AS wkt FROM temp_points;h