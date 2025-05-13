<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args) {
    $db = DB::getInstance();
    $result = $db->select("alunni");

    return ApiResponse::success("Alunni trovati correttamente", $result)->toResponse($response);
  }
}
