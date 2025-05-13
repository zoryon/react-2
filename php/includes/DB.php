<?php
class DB
{
    // attributes
    private static $instance = null;
    private $mysqli;

    private $DB_CONFIG = [
        "host" => "my_mariadb",
        "user" => "root",
        "password" => "ciccio",
        "database" => "scuola",
    ];

    // constructor
    private function __construct()
    {
        $this->connect();
    }

    // Singleton -> ensures only one instance of the class is created
    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // connect to the database
    private function connect(): void
    {
        $this->mysqli = new mysqli(
            $this->DB_CONFIG['host'],
            $this->DB_CONFIG['user'],
            $this->DB_CONFIG['password'],
            $this->DB_CONFIG['database']
        );

        if ($this->mysqli->connect_error) {
            throw new \RuntimeException("Database connection failed: " . $this->mysqli->connect_error);
        }
    }

    // General query executor
    public function execute($sql, $params = [])
    {
        $stmt = $this->mysqli->prepare($sql);
        if (!$stmt) {
            throw new \RuntimeException("Failed to prepare statement: " . $this->mysqli->error);
        }

        if (!empty($params)) {
            $types = str_repeat('s', count($params)); // Assuming all params are strings for simplicity
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        return $stmt;
    }

    // SELECT multiple rows
    public function select($table, $conditions = [])
    {
        $sql = "SELECT * FROM $table";
        $params = [];

        if (!empty($conditions)) {
            $where = [];
            foreach ($conditions as $key => $value) {
                if ($value === null) {
                    $where[] = "$key IS NULL";
                } else {
                    $where[] = "$key = ?";
                    $params[] = $value;
                }
            }
            $sql .= " WHERE " . implode(' AND ', $where);
        }

        $stmt = $this->execute($sql, $params);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // SELECT single row
    public function selectOne($table, $conditions = [])
    {
        $result = $this->select($table, $conditions);
        return $result[0] ?? null;
    }

    // INSERT
    public function insert($table, $data)
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";

        $this->execute($sql, array_values($data));
        return $this->mysqli->insert_id;
    }

    // UPDATE
    public function update($table, $data, $conditions)
    {
        $set = [];
        $params = [];

        foreach ($data as $key => $value) {
            $set[] = "$key = ?";
            $params[] = $value;
        }

        $where = [];
        foreach ($conditions as $key => $value) {
            $where[] = "$key = ?";
            $params[] = $value;
        }

        $sql = "UPDATE $table SET " . implode(', ', $set) . " WHERE " . implode(' AND ', $where);
        $stmt = $this->execute($sql, $params);
        return $stmt->affected_rows;
    }

    // DELETE
    public function delete($table, $conditions)
    {
        $where = [];
        $params = [];

        foreach ($conditions as $key => $value) {
            $where[] = "$key = ?";
            $params[] = $value;
        }

        $sql = "DELETE FROM $table WHERE " . implode(' AND ', $where);
        $stmt = $this->execute($sql, $params);
        return $stmt->affected_rows;
    }

    // Count
    public function count($table, $conditions = [])
    {
        $sql = "SELECT COUNT(*) AS count FROM $table";
        $params = [];

        if (!empty($conditions)) {
            $where = [];
            foreach ($conditions as $key => $value) {
                $where[] = "$key = ?";
                $params[] = $value;
            }
            $sql .= " WHERE " . implode(' AND ', $where);
        }

        $stmt = $this->execute($sql, $params);
        $result = $stmt->get_result()->fetch_assoc();
        return $result['count'] ?? 0;
    }
}