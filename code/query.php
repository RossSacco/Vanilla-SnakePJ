<?php
if (!isset($_SESSION)) session_start();

require_once('config.php');

$connection = new DB();
$pdo = $connection->getPDO();

function executeQuery($pdo, $action, $player = null)
{
    $query = "";

    switch ($action) {
        case 'rankEasy':
        case 'rankMedium':
        case 'rankHard':
            $modalita = lcfirst(substr($action, 4));
            $query = "SELECT g.username, g.score, g.time
                      FROM game g
                      WHERE g.modalita = :modalita
                      ORDER BY g.score DESC, g.time ASC
                      LIMIT 10";
            break;

        case 'statsEasy':
        case 'statsMedium':
        case 'statsHard':
            $modalita = lcfirst(substr($action, 5));
            $query = "SELECT g2.username, g2.bestScore, g1.totalGame, g3.tempo 
                      FROM (
                          SELECT g.username, count(*) AS totalGame
                          FROM game g 
                          WHERE g.modalita = :modalita and g.username = :player
                      ) AS g1
                      INNER JOIN (
                          SELECT g.username, g.score as bestScore, g.time
                          FROM game g
                          WHERE g.modalita = :modalita AND g.score = (
                              SELECT MAX(g3.score)
                              FROM game g3
                              WHERE modalita = :modalita AND g3.username = g.username
                          ) AND g.username = :player
                      ) AS g2
                      ON g1.username = g2.username
                      INNER JOIN (
                          SELECT g.username, sum(g.time) as tempo
                          FROM game g
                          WHERE g.modalita = :modalita and g.username = :player
                      ) AS g3 ON g1.username = g3.username
                      LIMIT 10";
            break;

        default:
            return[];
            break;
    }

    $statement = $pdo->prepare($query);

    if ($action !== 'rankEasy' && $action !== 'rankMedium' && $action !== 'rankHard') {
        $statement->bindParam(':player', $player, PDO::PARAM_STR);
    }

    if ($query !== "") {
        $statement->bindParam(':modalita', $modalita, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } else {
       
        return[];
    }
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    $player = isset($_SESSION['username']) ? $_SESSION['username'] : null;

    $res = executeQuery($pdo, $action, $player);

    echo json_encode($res);
} else {
    
    return[];
}

$connection->close();
$pdo = null;
?>
