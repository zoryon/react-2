<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/includes/DB.php';
require __DIR__ . '/includes/ApiResponse.php';

require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->get('/alunni', "AlunniController:index");
$app->delete('/alunni/{id}', "AlunniController:destroy");

$app->run();
