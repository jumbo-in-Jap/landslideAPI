<?php
$query = array();
if(isset($_GET['timeRange']))$query['timeRange'] = $_GET['timeRange'];
if(isset($_GET['keyword']))$query['keyword'] = $_GET['keyword'];
if(isset($_GET['lat']))$query['lat'] = $_GET['lat'];
if(isset($_GET['lng']))$query['lng'] = $_GET['lng'];

$result = array();
$testResponseTxt = 
'{"results":[
{"country":"Japan",
"place":"Tokyo",
"cause":"rain",
"condition":"likely",
"lat": 35.681382,
"lng": 139.766084
},
{"country":"Brazil",
"place":"PORTO NACIONAL",
"cause":"rain",
"condition":"likely",
"lat": -10.12,
"lng": -48.62
},
{"country":"Japan",
"place":"Tokyo",
"cause":"rain",
"condition":"likely",
"lat": 35.681382,
"lng": 139.766084
},
{"country":"Japan",
"place":"Tokyo",
"cause":"rain",
"condition":"likely",
"lat": 35.681382,
"lng": 139.766084
}
],
"returnCount":3,
"queryKeyword":"tokyo"
}';
//$result = json_decode($testResponseTxt);
echo $testResponseTxt;