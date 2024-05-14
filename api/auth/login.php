<?php
require_once '../db.php';

header('Content-type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo->query('SELECT * FROM users');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    session_start();

    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === $password) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['logged_in'] = true;

            echo json_encode(['message' => 'Login Successful', 'success' => 'true']);
            return;
        }
    }

    echo json_encode(['message' => 'Login Failed', 'success' => 'false']);
} catch (Exception $e) {
    echo json_encode(['message' => 'Something went wrong.', 'error' => $e]);
}
