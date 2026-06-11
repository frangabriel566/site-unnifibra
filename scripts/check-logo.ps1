Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot "..\public\logo.png.transparent.png"))
Write-Output "$($img.Width)x$($img.Height) $($img.PixelFormat)"
$bmp = [System.Drawing.Bitmap]$img
$c = $bmp.GetPixel(0, 0)
Write-Output "corner: A=$($c.A) R=$($c.R) G=$($c.G) B=$($c.B)"
$c2 = $bmp.GetPixel(627, 627)
Write-Output "center: A=$($c2.A) R=$($c2.R) G=$($c2.G) B=$($c2.B)"
$c3 = $bmp.GetPixel(627, 50)
Write-Output "top-mid: A=$($c3.A) R=$($c3.R) G=$($c3.G) B=$($c3.B)"
