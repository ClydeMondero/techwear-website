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
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['logged_in'] = true;
            $_SESSION['account_type'] = $user['account_type'];

            echo json_encode(['message' => 'Login Successful', 'success' => 'true', 'accountType' => $user['account_type'], 'userId' => $user['id'], 'username' => $user['username']]);
            return;
        }
    }

    echo json_encode(['message' => 'Incorrect email or password', 'success' => 'false']);
} catch (Exception $e) {
    echo json_encode(['message' => 'Something went wrong.', 'error' => $e]);
}
