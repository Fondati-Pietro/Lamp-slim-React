<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");

//curl -X DELETE http://localhost:8080/alunni/4 
$app->delete('/alunni/{id}', "AlunniController:destroy");

$app->run();
