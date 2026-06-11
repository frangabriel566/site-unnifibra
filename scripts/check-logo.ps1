Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot "..\public\img\logounnifibrasemfundo.png.png"))
Write-Output "$($img.Width)x$($img.Height) $($img.PixelFormat)"
$bmp = [System.Drawing.Bitmap]$img
foreach ($pt in @(@(0,0), @(2,2), @(250,0), @(499,499))) {
    $c = $bmp.GetPixel($pt[0], $pt[1])
    Write-Output "($($pt[0]),$($pt[1])): A=$($c.A) R=$($c.R) G=$($c.G) B=$($c.B)"
}
