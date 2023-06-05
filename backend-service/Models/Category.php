<?php

namespace Models;
use PDO;

class Category
{
    private string $name;
    private string $description;

    public function __construct(string $name, string $description)
    {
        $this->name = $name;
        $this->description = $description;
    }

    public function save()
    {
        $db = \Util::getDb();

        $category = self::findByName($this->name);

        if ($category) {
            return false;
        }

        $stmt = $db->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
        $stmt->execute([$this->name, $this->description]);

        return $this;
    }

    public static function all()
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM categories");
        $stmt->execute();

        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $categories;
    }

    public static function find(string $id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);

        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        return $category;
    }

    public static function findByName(string $name)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM categories WHERE name = ?");
        $stmt->execute([$name]);

        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        return $category;
    }
}
