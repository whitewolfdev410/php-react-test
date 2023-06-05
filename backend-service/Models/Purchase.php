<?php

namespace Models;
use PDO;

class Purchase {
    private $amount;

    public function __construct($amount)
    {
        $this->amount = $amount;
    }

    public function save($product_id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("INSERT INTO purchases (product_id, amount, quantity) VALUES (?, ?, ?)");
        $stmt->execute([$product_id, $this->amount, 1]);

        return $this;
    }

    public static function all()
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM purchases");
        $stmt->execute();

        $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $transactions;
    }

    public static function find(string $id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM purchases WHERE id = ?");
        $stmt->execute([$id]);

        $transaction = $stmt->fetch(PDO::FETCH_ASSOC);

        return $transaction;
    }

    public static function recent()
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM purchases ORDER BY id DESC LIMIT 5");
        $stmt->execute();

        $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $transactions;
    }
}