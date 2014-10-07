<?php
	$app->get('/', function() use($app) {
		echo $app->render($app->config('templates.website').'index.html');
	});
?>