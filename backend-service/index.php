<?php

require 'vendor/autoload.php';

use Models\Product;
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpNotFoundException;

require_once 'Models/Product.php';
require_once 'Models/Category.php';
require_once 'Models/Purchase.php';
require 'util.php';

use Valitron\Validator;

$app = AppFactory::create();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write(json_encode(['message' => 'Welcome to PHP-Store API!']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/product/create', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);

    $v = new Validator($data);
    $v->rule('required', ['name', 'amount', 'description', 'category', 'tax', 'quantity']);
    $v->rule('numeric', ['tax', 'quantity', 'amount']);
    $v->rule('min', 'quantity', 1);
    $v->rule('min', 'amount', 0.01);
    $v->rule('min', 'tax', 0.01);
    $v->rule('max', 'tax', 100);

    
    if (!$v->validate()) {
        $response->getBody()->write(json_encode(['message' => $v->errors()]));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    $data['tax'] = $data['tax'] / 100;

    $product = new Models\Product($data['name'], $data['amount'], $data['description'], $data['category'], $data['tax'], $data['quantity']);

    $new_prd = $product->save();

    if (!$new_prd) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(201);
    $response->getBody()->write(json_encode(['message' => 'Product created successfully!']));

    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/product/all', function (Request $request, Response $response, $args) {
    $products = Models\Product::all();

    $response = $response->withStatus(200);
    if (count($products) == 0) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'No products found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['products' => $products]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/product/{id}', function (Request $request, Response $response, $args) {
    if (!Util::isUUID($args['id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid product id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $product = Models\Product::find($args['id']);

    if (!$product) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Product with id #' . $args['id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['product' => $product]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->delete('/product/{id}', function (Request $request, Response $response, $args) {
    if (!Util::isUUID($args['id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid product id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $product = Models\Product::find($args['id']);

    if (!$product) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Product with id #' . $args['id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $res = Models\Product::delete($args['id']);

    if (!$res) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['message' => 'Product with id #' . $args['id'] . ' deleted successfully!']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->patch('/product/{id}', function (Request $request, Response $response, $args) {
    if (!Util::isUUID($args['id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid product id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $product = Models\Product::find($args['id']);

    if (!$product) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Product with id #' . $args['id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $data = json_decode($request->getBody(), true);

    $v = new Validator($data);
    $v->rule('required', ['name', 'quantity', 'description', 'category', 'tax', 'amount']);
    $v->rule('numeric', ['tax', 'amount', 'quantity']);
    $v->rule('min', 'quantity', 1);
    $v->rule('min', 'amount', 0.01);
    $v->rule('min', 'tax', 0.01);
    $v->rule('max', 'tax', 100);

    if (!$v->validate()) {
        $response->getBody()->write(json_encode(['message' => $v->errors()]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $data['tax'] = $data['tax'] / 100;

    $product['name'] = $data['name'];
    $product['quantity'] = $data['quantity'];
    $product['description'] = $data['description'];
    $product['category'] = $data['category'];
    $product['tax'] = $data['tax'];
    $product['amount'] = $data['amount'];

    $res = Models\Product::update($product, $args['id']);

    if (!$res) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['message' => 'Product with id #' . $args['id'] . ' updated successfully!']));

    return $response->withHeader('Content-Type', 'application/json');
});

// $app->get('/product/search/{query}', function (Request $request, Response $response, $args) {
//     $products = Models\Product::search($args['query']);

//     if (!$products) {
//         $response = $response->withStatus(404);
//         $response->getBody()->write(json_encode(['message' => 'No products found!']));
//         return $response->withHeader('Content-Type', 'application/json');
//     }

//     $response = $response->withStatus(200);
//     $response->getBody()->write(json_encode(['products' => $products]));
//     return $response->withHeader('Content-Type', 'application/json');
// });

$app->get('/product/category/{category_id}', function (Request $request, Response $response, $args) {
    if (!Util::isUUID($args['category_id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid category id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $category = Models\Category::find($args['category_id']);

    if (!$category) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Category with id #' . $args['category_id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $products = Models\Product::findByCategory($args['category_id']);

    if (!$products) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'No products found in category ' . $category['name'] . '!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['products' => $products]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/ut/list-categories', function (Request $request, Response $response, $args) {
    $categories = Models\Product::listCategories();

    if (!$categories) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'No categories found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['categories' => $categories]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/category/create', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);

    $v = new Validator($data);
    $v->rule('required', ['name', 'description']);
    $v->rule('lengthMin', 'name', 3);
    $v->rule('lengthMax', 'name', 50);
    $v->rule('lengthMin', 'description', 3);
    $v->rule('lengthMax', 'description', 255);

    if (!$v->validate()) {
        $response->getBody()->write(json_encode(['message' => $v->errors()]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $category = new Models\Category($data['name'], $data['description']);

    $new_cat = $category->save();

    if (!$new_cat) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(201);
    $response->getBody()->write(json_encode(['message' => 'Category created successfully!']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/product/purchase', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);

    $v = new Validator($data);

    $v->rule('required', ['product_id', 'amount']);
    $v->rule('integer', 'amount');

    if (!$v->validate()) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => $v->errors()]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    if (!Util::isUUID($data['product_id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid product id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $product = Models\Product::find($data['product_id']);

    if (!$product) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Product with id #' . $data['product_id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $purchase = new Models\Purchase($data['amount']);

    $new_purchase = $purchase->save($data['product_id']);

    if (!$new_purchase) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server! here']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $res = Models\Product::updateStock($data['product_id']);

    if (!$res) {
        $response = $response->withStatus(500);
        $response->getBody()->write(json_encode(['message' => 'Some thing went wrong on the server! 2']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(201);

    $response->getBody()->write(json_encode(['message' => 'Purchase created successfully!']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/product/purchase/{id}', function (Request $request, Response $response, $args) {
    if (!Util::isUUID($args['id'])) {
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode(['message' => 'Invalid purchase id!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $purchase = Models\Purchase::find($args['id']);

    if (!$purchase) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'Purchase with id #' . $args['id'] . ' not found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['purchase' => $purchase]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/purchase/list-all', function (Request $request, Response $response, $args) {
    $purchases = Models\Purchase::all();

    if (!$purchases) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'No purchases found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['purchases' => $purchases]));
    return $response->withHeader('Content-Type', 'application/json');
});

#get recently purchased products
$app->get('/purchase/list-recent', function (Request $request, Response $response, $args) {
    $purchases = Models\Purchase::recent();

    if (!$purchases) {
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['message' => 'No purchases found!']));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $response = $response->withStatus(200);
    $response->getBody()->write(json_encode(['purchases' => $purchases]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});

$app->run();
