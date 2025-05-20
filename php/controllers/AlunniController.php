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

  public function create(Request $request, Response $response, $args) {
    $body = $request->getParsedBody();
    $name = $body["nome"];
    $surname = $body["cognome"];
    if (!isset($name) || !isset($surname)) {
      return ApiResponse::clientError("Malformed data")->toResponse($response);
    }
    
    $db = DB::getInstance();
    $newId = $db->insert("alunni", [
      "nome" => $name,
      "cognome" => $surname,
    ]);

    return ApiResponse::success("Alunno eliminato correttamente", $newId)->toResponse($response);
  }

  public function destroy(Request $request, Response $response, $args) {
    $body = $request->getParsedBody();
    // if (!isset($body["id"])) {
    //   return ApiResponse::error("ID non fornito")->toResponse($response);
    // }
    
    $db = DB::getInstance();
    $result = $db->delete("alunni", ["id" => $args["id"]]);

    return ApiResponse::success("Alunno eliminato correttamente", $result)->toResponse($response);
  }
}
