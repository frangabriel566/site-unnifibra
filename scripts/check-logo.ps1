Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot "..\public\logo.png.transparent.png"))
Write-Output "$($img.Width)x$($img.Height) $($img.PixelFormat)"
$bmp = [System.Drawing.Bitmap]$img
foreach ($pt in @(@(0,0), @(5,5), @(627,0), @(1253,1253), @(627,627), @(627,1100))) {
    $c = $bmp.GetPixel($pt[0], $pt[1])
    Write-Output "($($pt[0]),$($pt[1])): A=$($c.A) R=$($c.R) G=$($c.G) B=$($c.B)"
}
