<?php

namespace Models;

use PDO;

class Product
{
    public string $name;
    public $amount;
    public string $description;
    public string $category;
    public $tax;
    public $quantity;

    public function __construct($name, $amount, $description, $category, $tax, $qty)
    {
        $this->name = $name;
        $this->quantity = $qty;
        $this->description = $description;
        $this->category = $category;
        $this->tax = $tax;
        $this->amount = $amount;
    }

    public function save()
    {
        $db = \Util::getDb();

        $category_exists = Category::find($this->category);

        if (!$category_exists) {
            return null;
        }

        $stmt = $db->prepare("INSERT INTO products (name, amount, description, category_id, tax, quantity) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$this->name, $this->amount, $this->description, $this->category, $this->tax, $this->quantity]);

        return $this;
    }

    public static function all()
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM products");
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $products;
    }

    public static function find(string $id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);

        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        // if (!$product) {
        //     return null;
        // }

        return $product;
    }

    public static function findByCategory(string $category_id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM products WHERE category_id = ?");
        $stmt->execute([$category_id]);

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$products) {
            return null;
        }

        return $products;
    }

    public static function listCategories()
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("SELECT * FROM categories");
        $stmt->execute();

        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$categories) {
            return null;
        }

        return $categories;
    }

    public static function delete(string $id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
        $res = $stmt->execute([$id]);

        $stmt = $db->prepare("DELETE FROM purchases WHERE product_id = ?");
        $res = $stmt->execute([$id]);

        return $res;
    }

    public static function update($product, string $id)
    {
        $db = \Util::getDb();

        $stmt = $db->prepare("UPDATE products SET name = ?, amount = ?, description = ?, category_id = ?, tax = ?, quantity = ? WHERE id = ?");
        $res = $stmt->execute([$product['name'], $product['amount'], $product['description'], $product['category'], $product['tax'], $product['quantity'], $id]);

        return $res;
    }

    public static function updateStock($id)
    {
        $db = \Util::getDb();

        $pr = Product::find($id);

        if ($pr['quantity'] == 0 || $pr['quantity'] - 1 <= 0) {
            $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
            $res = $stmt->execute([$id]);

            return $res;
        }

        $stmt = $db->prepare("UPDATE products SET quantity = ? WHERE id = ?");
        $res = $stmt->execute([$pr['quantity'] - 1, $id]);

        return $res;
    }
}
