Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot "..\public\logo.png"))
$bmp = [System.Drawing.Bitmap]$img
$w = $bmp.Width
$h = $bmp.Height
foreach ($pt in @(@(0,0), @(5,5), @(0,627), @(627,0), @(1253,1253), @(1253,0), @(0,1253), @(50,50), @(627,627))) {
    $c = $bmp.GetPixel($pt[0], $pt[1])
    Write-Output "($($pt[0]),$($pt[1])): R=$($c.R) G=$($c.G) B=$($c.B)"
}
