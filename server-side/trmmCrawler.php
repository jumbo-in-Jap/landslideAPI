<?php
require_once 'simple_html_dom.php';

// データ取得
$html = file_get_html('http://trmm.gsfc.nasa.gov/trmm_rain/Events/latest_1_day_landslide.html');
$ret = $html->find('pre')[0]->plaintext;

// 半角スペースで区切り
$pices = explode(" ", $ret);
// 空配列の削除
$pices = array_filter($pices);
// 配列の再添字
$pices = array_values($pices);

var_dump($pices);

