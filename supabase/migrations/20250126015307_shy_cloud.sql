-- Create the database
CREATE DATABASE IF NOT EXISTS zoodom_maintenance;
USE zoodom_maintenance;

-- Create the requests table
CREATE TABLE IF NOT EXISTS requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('maintenance', 'repair', 'installation') NOT NULL,
    department VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'in-progress', 'completed') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATETIME NULL,
    end_date DATETIME NULL,
    execution_time INT NULL,
    photos JSON NULL,
    technician_notes TEXT NULL,
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;